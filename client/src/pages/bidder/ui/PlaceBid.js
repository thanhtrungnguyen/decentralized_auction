import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { Outlet, Link } from "react-router-dom";
import { Button, Input, ConnectButton, useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";
import HeaderBid from "../components/HeaderBid";
import auctionAbi from "../../../constants/contractAbi.json";
import contractAddresses from "../../../constants/contractAddress.json";
import Moralis from "moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import TransactionStatus from "../components/TransactionStatus";
import BiddingProperty from "../components/BiddingProperty";
import TransactionHistory from "../components/TransactionHistory";
import AuctionResult from "./AuctionResult";
import { useFetchBidding } from "../../../hook/useFetch";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/configuration";

function PlaceBid({ auction }) {
    const { auctionId } = useParams() || auction.auctionId;
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}/placedBid`;

    const [highestBid, setHighestBid] = useState();
    const [inputBidAmount, setInputBidAmount] = useState("0");
    const [transactionStatus, setTransactionStatus] = useState();
    const { account, isWeb3Enabled } = useMoralis();
    const [bidderState, setBidderState] = useState();
    const [bidInformation, setBidInformation] = useState();
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled, account]);
    const { loading, data: placedBid, error: error2 } = useFetchBidding(baseURL);

    const dispatch = useNotification();

    const getHighestBid = () => {
        const highest = 0;
        placedBid.forEach((element) => {
            if (element.bidAmount > highest) {
                highest = element.bidAmount;
            }
        });
        setHighestBid(highest);
    };
    const { runContractFunction: getBidInformationByAuctionId } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getBidInformationByAuctionId",
        params: { auctionId: auctionId },
    });

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
    console.log(dataPlaceBid);

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
    const updateUI = async () => {
        setBidInformation(await getBidInformationByAuctionId());
        setBidderState(await getBidderState());
    };

    const getBidderState = () => {
        let state = "NO_STATE";
        bidInformation?.forEach((element) => {
            if (element.bidder.toUpperCase() === account.toUpperCase()) {
                switch (element.bidderState) {
                    case 0:
                        state = "BIDING";
                        break;
                    case 1:
                        state = "WAITING";
                        break;
                    case 2:
                        state = "WIN";
                        break;
                    case 3:
                        state = "LOSE";
                        break;
                    case 4:
                        state = "CANCEL";
                        break;
                    case 5:
                        state = "PAIDBACK";
                        break;
                    case 6:
                        state = "PAID";
                        break;
                    default:
                        break;
                }
            }
        });
        return state;
    };

    const placeBidHandleSuccess = async (tx) => {
        try {
            console.log("handleSuccess " + tx.hash);
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
    const placeBidHandleComplete = async (hash) => {
        console.log(hash);
        // setTransactionStatus({ hash: hash, status: "waitingForConfirmation" });
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
            console.log("handleSuccess " + tx.hash);
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
    const retractBidHandleComplete = async (hash) => {
        console.log(hash);
        // setTransactionStatus({ hash: hash, status: "waitingForConfirmation" });
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

    const renderCurrentBidderState = () => {
        switch (getBidderState()) {
            case "BIDDING":
                return (
                    <>
                        <p className={styles.title}>Place bid details:</p>
                        <p className={styles.txtT}>Your bid must be at least 6969 ETH</p>
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
                            disabled={isLoadingPlaceBid || isFetchingPlaceBid}
                            className={styles.btn}
                            onClick={async () => {
                                placeBid({
                                    onError: placeBidHandleError,
                                    onSuccess: placeBidHandleSuccess,
                                    onComplete: placeBidHandleComplete,
                                });
                            }}
                        >
                            {isLoadingPlaceBid || isFetchingPlaceBid ? "Loading..." : "Place Bid"}
                        </button>
                        <button
                            disabled={isLoadingRetractBid || isFetchingRetractBid}
                            className={styles.btn}
                            onClick={async () => {
                                retractBid({
                                    onError: retractBidHandleError,
                                    onSuccess: retractBidHandleSuccess,
                                    onComplete: retractBidHandleComplete,
                                });
                            }}
                        >
                            {isLoadingRetractBid || isFetchingRetractBid ? "Loading..." : "Retract Bid"}
                        </button>
                        <TransactionStatus transactionStatus={transactionStatus} />
                    </>
                );
            case "CANCEL":
                return (
                    <>
                        <p>You have retracted bid</p>
                        <TransactionStatus transactionStatus={transactionStatus} />
                    </>
                );
            case "NO_STATE":
                return <>You haven't registered the auction</>;
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
                                <p className={styles.txtM}>Starting bid:</p>
                                <p className={styles.txtNormal}>{auction.startBid}</p>
                                <p className={styles.txtM}>Current bid:</p>
                                <p className={styles.txtNormal}>{highestBid} ETH</p>
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
