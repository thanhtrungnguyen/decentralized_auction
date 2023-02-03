import React, { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import styles from "../../../../styleCss/stylesComponents/placeABid.module.css";
import { useNotification } from "web3uikit";
import Countdown from "react-countdown";
import TransactionStatus from "../../components/TransactionStatus";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import Payment from "../Payment";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/blockchainConfig";

const ResultForFirstBidder = ({ auction, amount }) => {
    const dispatch = useNotification();
    const [transactionStatus, setTransactionStatus] = useState();
    const [goPayment, setGoPayment] = useState();
    const [showConfirmation, setShowConfirmation] = useState(true);
    const [isCanceled, setCanceled] = useState();
    const [isWaiting, setWaiting] = useState();

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
            setWaiting(true);
            console.log("handleSuccess " + tx.hash);
            setTransactionStatus(tx);
            const result = await tx.wait(1);
            if (result?.events) {
                setCanceled(true);
            } else {
                setWaiting(false);
            }

            setTransactionStatus(result);

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
        setTransactionStatus(tx);
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
            setShowConfirmation(false);
            if (isCanceled) {
                return <>You have Canceled Successfully</>;
            }
            return <Payment auction={auction} amount={amount} />;
        } else {
            return (
                <div>
                    <div>
                        {showConfirmation ? (
                            <>
                                {isCanceled ? (
                                    <>You have Canceled Successfully</>
                                ) : (
                                    <>
                                        <p className={styles.txtT}>Do you agree with this result?</p>
                                        <p className={styles.txtNormal}>
                                            <span>
                                                {days}d {hours}h {minutes}m {seconds}s
                                            </span>
                                        </p>
                                        <button
                                            className={styles.btn}
                                            disabled={isLoading || isFetching || isWaiting}
                                            onClick={() => {
                                                setGoPayment(true);
                                            }}
                                        >
                                            {isLoading || isFetching | isWaiting ? "Loading..." : "Accept"}
                                        </button>
                                        <button
                                            disabled={isLoading || isFetching || isWaiting}
                                            className={styles.btn}
                                            onClick={async () => {
                                                cancelAuctionResult({
                                                    onError: handleError,
                                                    onSuccess: handleSuccess,
                                                });
                                            }}
                                        >
                                            {isLoading || isFetching | isWaiting ? "Loading..." : "Cancel"}
                                        </button>
                                    </>
                                )}

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
            );
        }
    };
    console.log(auction.endAuctionTime + 360000);
    return (
        <>
            {goPayment ? (
                <Payment auction={auction} amount={amount} />
            ) : (
                <Countdown date={auction.endAuctionTime * 1000 + 300000} renderer={renderer} />
            )}
        </>
    );
};

export default ResultForFirstBidder;
