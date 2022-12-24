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

function PlaceBid({ auction }) {
    const { auctionId } = useParams() || auction.auctionId;
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}/placedBid`;

    const [highestBid, setHighestBid] = useState();
    const [inputBidAmount, setInputBidAmount] = useState("0");
    const [transactionStatus, setTransactionStatus] = useState();

    const { loading, data: placedBid, error: error2 } = useFetchBidding(baseURL);

    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);
    const dispatch = useNotification();

    const auctionContractAddress = contractAddresses[chainId][0] ?? null;

    const [auctionInformation, setAuctionInformation] = useState(() => {
        return [];
    });

    const getHighestBid = () => {
        const highest = 0;
        placedBid.forEach((element) => {
            if (element.bidAmount > highest) {
                highest = element.bidAmount;
            }
        });
        setHighestBid(highest);
    };
    // getHighestBid();

    const {
        runContractFunction: placeBid,
        data,
        error,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: auctionAbi,
        contractAddress: auctionContractAddress, // your contract address here
        functionName: "placeBid",
        msgValue: "0",
        params: {
            auctionId: auction.auctionId,
            bidAmount: ethers.utils.parseEther(inputBidAmount.toString() || "0").toString(),
        },
    });

    // const { runContractFunction: getAuctionInformationById } = useWeb3Contract({
    //     abi: auctionAbi,
    //     contractAddress: auctionContractAddress,
    //     functionName: "getAuctionInformationById",
    //     params: { auctionId: "12a" },
    // });
    // const updateUIValues = async () => {
    //     const auctionInformation = await getAuctionInformationById();
    // };
    useEffect(() => {
        if (isWeb3Enabled) {
            // updateUIValues();
        }
    }, [isWeb3Enabled]);
    const handleSuccess = async (tx) => {
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
    const handleComplete = async (hash) => {
        console.log(hash);
        // setTransactionStatus({ hash: hash, status: "waitingForConfirmation" });
    };

    // const handleClick = async () => {
    //     await setInputBidAmount(inputRef.current.value);
    //     console.log(inputBidAmount);
    //     await placeBid({
    //         onError: handleErrorNotification,
    //         onSuccess: handleSuccess,
    //         onComplete: handleComplete,
    //     });
    // };

    const handleError = async (tx) => {
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
                            <div className={styles.detail}>
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
                                    disabled={isLoading || isFetching}
                                    className={styles.btn}
                                    onClick={async () => {
                                        placeBid({
                                            onError: handleError,
                                            onSuccess: handleSuccess,
                                            onComplete: handleComplete,
                                        });
                                    }}
                                >
                                    {isLoading || isFetching ? "Loading..." : "Place Bid"}
                                </button>
                                <TransactionStatus transactionStatus={transactionStatus} />
                            </div>
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
