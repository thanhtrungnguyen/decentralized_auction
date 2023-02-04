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
import { parseEther, parseWei } from "../../../utils/ethereumUnitConverter";
import io from "socket.io-client";
import { BASE_URL } from "../../../api/axios";
function PlaceBid({ auction, property }) {
    const dispatch = useNotification();
    const { account, isWeb3Enabled } = useMoralis();
    const [highestBid, setHighestBid] = useState("0");
    const [inputBidAmount, setInputBidAmount] = useState("");
    const [transactionStatus, setTransactionStatus] = useState();
    const [minBidAmount, setMinBidAmount] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const handleInputChange = (e) => {
        const regexNumber = /^[0-9]*\.?[0-9]*$/;
        const { id, value } = e.target;
        if (id === "bidAmount") {
            if (value === "" || regexNumber.test(value)) setInputBidAmount(value);
        }
    };
    const socket = io.connect(BASE_URL);
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
            bidAmount: parseWei(inputBidAmount ? inputBidAmount : "0"),
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
    socket.on("receive_message", (data) => {
        if (auction.auctionId == data.auction) {
            if (data.highest > parseFloat(highestBid)) {
                console.log(data);
                setHighestBid(data.highest + "");
            }
        }

        // setMessageReceived(data.message);
    });

    const updateUI = async () => {
        setTransactionStatus("null");
        await getBidInformationByAuctionId();
        // await getHighestBidOfAuction();
        // setHighestBid(highestBidOfAuctionData != null ? parseEther(highestBidOfAuctionData) : "0");
        socket.emit("send_message", { message: "message", auctionId: auction.auctionId });

        if (highestBid !== "0") {
            setMinBidAmount(
                highestBid != null && auction.priceStep != null ? new Decimal(highestBid).plus(new Decimal(auction.priceStep)).toString() : "0"
            );
        } else {
            setMinBidAmount(auction.startBid);
        }
    };
    useEffect(() => {
        if (inputBidAmount !== "") {
            try {
                if (inputBidAmount !== "0") {
                    if (new Decimal(inputBidAmount).comparedTo(new Decimal(minBidAmount)) === -1) {
                        console.log(new Decimal(inputBidAmount), new Decimal(minBidAmount));
                        setErrorMessage("Invalid bid amount");
                    } else {
                        setErrorMessage("  ");
                    }
                } else {
                    setErrorMessage("Invalid bid amount");
                }
            } catch (error) {
                setErrorMessage("Invalid bid amount");
            }
        }
    }, [inputBidAmount]);
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
            // updateCurrentAuction();
        }
    }, [isWeb3Enabled, account, bidInformationData?.length, highestBid]);

    //============================================================================================
    const placeBidHandleSuccess = async (tx) => {
        try {
            setTransactionStatus(tx);
            const result = await tx.wait(1);

            setTransactionStatus(result);
            socket.emit("send_message", { message: "message", auctionId: auction.auctionId });
            dispatch({
                type: "success",
                title: "Place Bid Notification",
                message: "Place Bid Completed!",
                position: "topR",
                icon: <BsCheckLg />,
            });
        } catch (error) {
            setTransactionStatus("Fail");
            console.log(error);
        }
    };

    const placeBidHandleError = async (tx) => {
        setTransactionStatus(tx);
        dispatch({
            type: "error",
            title: "Place Bid Error",
            message: "Place Bid Error",
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    const retractBidHandleSuccess = async (tx) => {
        try {
            setTransactionStatus(tx);
            const result = await tx.wait(1);

            setTransactionStatus(result);
            // setBidderState("RETRACT");
            updateUI();
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
        setTransactionStatus(tx);
        dispatch({
            type: "error",
            title: "Place Bid Error",
            message: tx.data.message,
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };
    //============================================================================================

    const renderHighestBid = () => {
        switch (highestBid) {
            case "0":
                return (
                    <>
                        <p className={styles.txtM}>Starting bid:</p>
                        <p className={styles.txtNormal}>{auction.startBid}</p>
                    </>
                );
            case 0:
                return (
                    <>
                        <p className={styles.txtM}>Starting bid:</p>
                        <p className={styles.txtNormal}>{auction.startBid}</p>
                    </>
                );
            default:
                return (
                    <>
                        <p className={styles.txtM}>Current bid:</p>
                        <p className={styles.txtNormal}>{highestBid} ETH</p>
                        <p className={styles.txtM}>Price step:</p>
                        <p className={styles.txtNormal}>{auction.priceStep} ETH</p>
                    </>
                );
        }
    };

    const renderCurrentBidderState = () => {
        switch (getBidderState(bidInformationData, account)) {
            case "NOT_REGISTERED":
                return <p className={styles.title}>You haven't registered the auction</p>;
            case "BIDDING":
                return (
                    <>
                        <p className={styles.title}>Place bid details:</p>
                        <p className={styles.txtT}>Your bid must be at least {minBidAmount} ETH</p>
                        <input
                            id="bidAmount"
                            className={styles.input}
                            type="text"
                            value={inputBidAmount}
                            validation={{
                                min: 1,
                            }}
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                        <label className={styles.mess}>{errorMessage}</label>
                        <br />
                        <button
                            className={styles.btnClose2}
                            disabled={isLoadingPlaceBid || isFetchingPlaceBid || errorMessage === "Invalid bid amount"}
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
                            className={styles.btnClose2}
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
                                {renderHighestBid()}
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
