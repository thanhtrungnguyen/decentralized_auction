import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract, useMoralisWeb3Api } from "react-moralis";
import { useFetchBidding } from "../../../../hook/useFetch";
import auctionAbi from "../../../../constants/contractAbi.json";
import contractAddresses from "../../../../constants/contractAddress.json";
import styles from "../../../../styleCss/stylesComponents/placeABid.module.css";
import { Outlet, Link } from "react-router-dom";
import { Button, Input, ConnectButton, useNotification, NativeBalance } from "web3uikit";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import TransactionStatus from "../../components/TransactionStatus";
import BiddingProperty from "../../components/BiddingProperty";
import TransactionHistory from "../../components/TransactionHistory";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import Payment from "../Payment";
import { GOERLI_TEST_NETWORK, MORALIS_API_KEY, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/configuration";
import { parseEther } from "../../../../utils/ethereumUnitConverter";
import ClosedAuction from "../ClosedAuction";
import { ConfirmAuctionResult } from "../../components/ConfirmAuctionResult";
import { getNativeBalanceOfBidder } from "../../nativeBalance";

const ResultForFirstBidder = ({ auction, highestBid }) => {
    const dispatch = useNotification();
    const [transactionStatus, setTransactionStatus] = useState();
    const [goPayment, setGoPayment] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState();
    const {
        runContractFunction: cancelAuctionResult,
        data,
        error,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "cancelAuctionResult",
        msgValue: "0",
        params: { auctionId: auction.auctionId },
    });
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
    const handleError = async (tx) => {
        console.log(tx);
        const message = tx.code == 4001 ? "User denied transaction signature." : "Failed";
        setTransactionStatus({ status: tx.data.message });
        dispatch({
            type: "error",
            title: "Cancel Error",
            message: tx.data.message,
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <ClosedAuction />;
        } else {
            return (
                <div>
                    <div>
                        <p className={styles.txtBlack}>Auction Result </p>
                        <p className={styles.txt}>Your Auction has ended:</p>
                        <div>
                            <div className={styles.info}>
                                {/* <BiddingProperty auction={auction} />
				<BiddingProperty auction={auction} property={property} /> */}
                                <BiddingProperty />
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
                                <p className={styles.title}>Result:</p>
                                <p className={styles.txtT}>Your place: 1</p>
                                {showConfirmation ? (
                                    <>
                                        <p className={styles.txtT}>Do you agree with this result?</p>
                                        <button
                                            className={styles.btn}
                                            onClick={() => {
                                                setGoPayment(true);
                                            }}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            disabled={isLoading || isFetching}
                                            className={styles.btn}
                                            onClick={async () => {
                                                cancelAuctionResult({
                                                    onError: handleError,
                                                    onSuccess: handleSuccess,
                                                });
                                            }}
                                        >
                                            {isLoading || isFetching ? "Loading..." : "Cancel"}
                                        </button>
                                        <TransactionStatus transactionStatus={transactionStatus} />
                                    </>
                                ) : (
                                    <button
                                        className={styles.btn}
                                        onClick={() => {
                                            setGoPayment(true);
                                        }}
                                    >
                                        Go To Payment
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };
    return (
        <>
            {goPayment ? (
                <Payment auction={auction} highestBid={highestBid} />
            ) : (
                <>
                    <Countdown date={auction.duePaymentTime * 1000} renderer={renderer} />
                </>
            )}
        </>
    );
};

export default ResultForFirstBidder;
