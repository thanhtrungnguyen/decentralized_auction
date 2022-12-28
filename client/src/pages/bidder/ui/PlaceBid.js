import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
// import { Outlet, Link } from "react-router-dom";
import { useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";
// import HeaderBid from "../components/HeaderBid";
// import auctionAbi from "../../../constants/contractAbi.json";
// import contractAddresses from "../../../constants/contractAddress.json";
// import Moralis from "moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";
// import { useParams } from "react-router-dom";
// import axios from "axios";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import TransactionStatus from "../components/TransactionStatus";
import BiddingProperty from "../components/BiddingProperty";
import TransactionHistory from "../components/TransactionHistory";
import AuctionResult from "./auctionResult/AuctionResult";
import { useFetchBidding } from "../../../hook/useFetch";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/configuration";
import Loader from "../components/Loader";
import Decimal from "decimal.js";
import io from "socket.io-client";
function PlaceBid({ auction }) {
    const baseURLPlacedBid = `http://localhost:8800/api/auctionInformation/${auction.auctionId}/placedBid`;
    const baseURLRegistered = `http://localhost:8800/api/auctionInformation/${auction.auctionId}/registered`;
    const { loading: loadingPlacedBid, data: placedBid, error: errorPlacedBid } = useFetchBidding(baseURLPlacedBid);
    const { loading: loadingRegistered, data: registered, error: errorRegistered } = useFetchBidding(baseURLRegistered);
    const dispatch = useNotification();
    const [highestBid, setHighestBid] = useState(0);
    const [inputBidAmount, setInputBidAmount] = useState("0");
    const [transactionStatus, setTransactionStatus] = useState();
    const { account, isWeb3Enabled } = useMoralis();
    const [isRegisteredBidder, setRegisteredBidder] = useState(false);
    const [minBidAmount, setMinBidAmount] = useState();
    const [status, setStatus] = useState(null);
    const socket = io.connect("http://localhost:8800");
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled, account, transactionStatus, transactionStatus, loadingPlacedBid, loadingRegistered, registered, highestBid]);

    const checkRegisteredBidder = () => {
        let isRegistered = false;
        registered?.forEach((element) => {
            if (element.bidder == account.toLowerCase()) {
                isRegistered = true;
            }
        });
        return isRegistered;
    };
    // const checkRetractedBidder=()=>{
    //     registered?.forEach((element) => {
    //         if (element.bidder == account.toLowerCase()) {
    //             setRegisteredBidder(true);
    //         }
    //     });
    // }
    socket.on("count", (item) => {
        if (item != status) {
            setStatus(item);
            getHighestBid();
            console.log(item);
        }
    });
    const getHighestBid = () => {
        let highest = 0;
        placedBid.map((element) => {
            if (element.bidAmount > highest) {
                highest = element.bidAmount;
            }
        });
        setHighestBid(highest);
    };
    const updateUI = async () => {
        getHighestBid();
        setRegisteredBidder(checkRegisteredBidder);
        setMinBidAmount(() => {
            if (highestBid != 0 && auction.priceStep != null) {
                if (highestBid == 0) return auction.startBid;
                if (highestBid > 0) return new Decimal(highestBid).plus(auction.priceStep).toString();
            }
            return "0";
        });
    };
    const {
        runContractFunction: placeBid,
        data: dataPlaceBid,
        error: errorPlaceBid,
        isFetching: isFetchingPlaceBid,
        isLoading: isLoadingPlaceBid,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS, // your contract address here
        functionName: "placeBid",
        msgValue: "0",
        params: {
            auctionId: auction.auctionId,
            bidAmount: ethers.utils.parseEther(inputBidAmount.toString() || "0").toString(),
        },
    });
    // console.log(dataPlaceBid);

    const {
        runContractFunction: retractBid,
        data: dataRetractBid,
        error: errorRetractBid,
        isFetching: isFetchingRetractBid,
        isLoading: isLoadingRetractBid,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS, // your contract address here
        functionName: "retractBid",
        msgValue: "0",
        params: {
            auctionId: auction.auctionId,
        },
    });

    //============================================================================================
    const placeBidHandleSuccess = async (tx) => {
        try {
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);
            setTransactionStatus({ hash: tx.hash, status: "Completed" });
            dispatch({
                type: "success",
                title: "Place Bid Notification",
                message: "Place Bid Completed!",
                position: "topR",
                icon: <BsCheckLg />,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const placeBidHandleError = async (tx) => {
        console.log(tx);
        const message = tx.code == 4001 ? "User denied transaction signature." : "Failed";
        setTransactionStatus({ status: message });
        dispatch({
            type: "error",
            title: "Place Bid Error",
            message: message,
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    const retractBidHandleSuccess = async (tx) => {
        try {
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);
            setTransactionStatus({ hash: tx.hash, status: "Completed" });

            dispatch({
                type: "success",
                title: "retractBid Notification",
                message: "retractBid Completed!",
                position: "topR",
                icon: <BsCheckLg />,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const retractBidHandleError = async (tx) => {
        console.log(tx);
        const message = tx.code == 4001 ? "User denied transaction signature." : "Failed";
        setTransactionStatus({ status: message });
        dispatch({
            type: "error",
            title: "Place Bid Error",
            message: message,
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };
    //============================================================================================
    const getBidderState = () => {
        // console.log("first");
        if (loadingRegistered || loadingPlacedBid) return "LOADING";
        if (isRegisteredBidder) return "BIDDING";
        if (!isRegisteredBidder) return "NOT_REGISTERED";

        return null;
    };

    const renderCurrentBidderState = () => {
        switch (getBidderState()) {
            case "LOADING":
                return <Loader />;
            case "BIDDING":
                return (
                    <>
                        <p className={styles.title}>Place bid details:</p>
                        <p className={styles.txtT}>Your bid must be at least {minBidAmount} ETH</p>
                        <input
                            className={styles.input}
                            type="number"
                            value={inputBidAmount}
                            validation={{
                                max: "",
                                min: 1,
                            }}
                            onChange={(event) => {
                                setInputBidAmount(event.target.value);
                            }}
                        ></input>
                        <label className={styles.mess}>Error message</label>
                        <br />
                        <button
                            className={styles.btnClose}
                            disabled={isLoadingPlaceBid || isFetchingPlaceBid}
                            onClick={async () => {
                                placeBid({
                                    onError: placeBidHandleError,
                                    onSuccess: placeBidHandleSuccess,
                                });
                            }}
                        >
                            {isLoadingPlaceBid || isFetchingPlaceBid ? "Loading..." : "Place Bid"}
                        </button>
                        <button
                            className={styles.btnClose}
                            disabled={isLoadingRetractBid || isFetchingRetractBid}
                            onClick={async () => {
                                retractBid({
                                    onError: retractBidHandleError,
                                    onSuccess: retractBidHandleSuccess,
                                });
                            }}
                        >
                            {isLoadingRetractBid || isFetchingRetractBid ? "Loading..." : "Retract Bid"}
                        </button>
                        <TransactionStatus transactionStatus={transactionStatus} />
                    </>
                );
            case "RETRACT":
                return (
                    <>
                        <p className={styles.title}>You have retracted bid</p>
                        <TransactionStatus transactionStatus={transactionStatus} />
                    </>
                );
            case "NOT_REGISTERED":
                return <p className={styles.title}>You haven't registered the auction</p>;
            default:
                return <>???</>;
        }
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <AuctionResult auction={auction} />;
        } else {
            return (
                <div>
                    <div>
                        <p className={styles.txtBlack}>Place a Bid </p>
                        <p className={styles.txt}>You have selected:</p>
                        <div>
                            <div className={styles.info}>
                                {/* <BiddingProperty auction={auction} />
                        <BiddingProperty auction={auction} property={property} /> */}
                                <BiddingProperty />
                                {highestBid != 0 ? (
                                    <>
                                        <p className={styles.txtM}>Starting bid:</p>
                                        <p className={styles.txtNormal}>{auction.startBid}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className={styles.txtM}>Current bid:</p>
                                        <p className={styles.txtNormal}>{highestBid} ETH</p>
                                    </>
                                )}
                                <p className={styles.txtM}>Price step:</p>
                                <p className={styles.txtNormal}>{auction.priceStep} ETH</p>
                                <p className={styles.txtM}>Auction ends in:</p>
                                <p className={styles.txtNormal}>
                                    <span>
                                        {days}d {hours}h {minutes}m {seconds}s
                                    </span>
                                </p>
                            </div>
                            <div className={styles.detail}>{renderCurrentBidderState()}</div>
                            <TransactionHistory auction={auction} />
                        </div>
                    </div>
                </div>
            );
        }
    };

    return <Countdown date={auction.endAuctionTime * 1000} renderer={renderer} />;
}

export default PlaceBid;
