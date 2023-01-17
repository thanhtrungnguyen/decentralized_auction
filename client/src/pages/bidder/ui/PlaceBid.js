import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";

import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import TransactionStatus from "../components/TransactionStatus";
import BiddingProperty from "../components/BiddingProperty";
import TransactionHistory from "../components/TransactionHistory";
import AuctionResult from "./auctionResult/AuctionResult";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/blockchainConfig";
import { getBidderState } from "../../../utils/getBidderState";
import Loader from "../components/Loader";
import Decimal from "decimal.js";
import io from "socket.io-client";
function PlaceBid({ auction, property }) {
    const dispatch = useNotification();
    const [highestBid, setHighestBid] = useState(0);
    const [inputBidAmount, setInputBidAmount] = useState("0");
    const [transactionStatus, setTransactionStatus] = useState();
    const { account, isWeb3Enabled } = useMoralis();
    const [minBidAmount, setMinBidAmount] = useState();
    const [bidderState, setBidderState] = useState(false);
    const [status, setStatus] = useState(false);
    // const socket = io.connect("http://localhost:8800");

    console.log("bidderState", bidderState);

    const updateUI = async () => {
        setTransactionStatus();
        setBidderState();
        await getBidInformationByAuctionId();
        setBidderState(getBidderState(bidInformationData, account));
    };

    const {
        runContractFunction: getBidInformationByAuctionId,
        data: bidInformationData,
        error: bidInformationError,
        isFetching: isBidInformationFetching,
        isLoading: isBidInformationLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getBidInformationByAuctionId",
        params: { auctionId: auction.auctionId },
    });

    const {
        runContractFunction: placeBid,
        data: dataPlaceBid,
        error: errorPlaceBid,
        isFetching: isFetchingPlaceBid,
        isLoading: isLoadingPlaceBid,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "placeBid",
        msgValue: "0",
        params: {
            auctionId: auction.auctionId,
            bidAmount: ethers.utils.parseEther(inputBidAmount.toString() || "0").toString(),
        },
    });

    const {
        runContractFunction: retractBid,
        data: dataRetractBid,
        error: errorRetractBid,
        isFetching: isFetchingRetractBid,
        isLoading: isLoadingRetractBid,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "retractBid",
        msgValue: "0",
        params: {
            auctionId: auction.auctionId,
        },
    });
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled, account, bidInformationData?.length]);

    //============================================================================================
    const placeBidHandleSuccess = async (tx) => {
        try {
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);
            setTransactionStatus({ hash: tx.hash, status: "Completed" });
            // socket.emit("join_room", auction.auctionId);
            // socket.emit("send_message", { message: "message", auctionId: auction.auctionId });
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
        const message = tx.data.message;
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
                title: "Retract Bid Notification",
                message: "Retract Bid Completed!",
                position: "topR",
                icon: <BsCheckLg />,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const retractBidHandleError = async (tx) => {
        const message = tx.data.message;
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

    const renderCurrentBidderState = () => {
        switch (bidderState) {
            case "NOT_REGISTERED":
                return <p className={styles.title}>You haven't registered the auction</p>;
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
                        {/* <label className={styles.mess}>Error message</label> */}
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
            default:
                return <Loader />;
        }
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <AuctionResult auction={auction} property={property} />;
        } else {
            return (
                <div>
                    <div>
                        <p className={styles.txtBlack}>Place a Bid </p>
                        <p className={styles.txt}>You have selected:</p>
                        <div>
                            <div className={styles.info}>
                                <BiddingProperty property={property} />
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
                            {/* <TransactionHistory auction={auction} /> */}
                        </div>
                    </div>
                </div>
            );
        }
    };

    return <Countdown date={auction.endAuctionTime * 1000} renderer={renderer} />;
}

export default PlaceBid;
