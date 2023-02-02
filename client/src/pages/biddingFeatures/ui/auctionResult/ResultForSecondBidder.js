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

const ResultForSecondBidder = ({ auction, amount }) => {
    const dispatch = useNotification();
    const [transactionStatus, setTransactionStatus] = useState();
    const [goPayment, setGoPayment] = useState();
    const [showConfirmation, setShowConfirmation] = useState(true);
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
            setTransactionStatus(tx);
            const result = await tx.wait(1);
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
            message: "Cancel Error",
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            setShowConfirmation(false);
            return <Payment auction={auction} amount={amount} />;
        } else {
            return (
                <div>
                    <div>
                        {showConfirmation ? (
                            <>
                                <p className={styles.title}>Result:</p>
                                <p className={styles.txtT}>Your place: 2</p>
                                <p className={styles.txtT}>Do you agree with this result?</p>
                                <p className={styles.txtNormal}>
                                    <span>
                                        {days}d {hours}h {minutes}m {seconds}s
                                    </span>
                                </p>
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
            );
        }
    };
    return (
        <>
            {goPayment ? (
                <Payment auction={auction} amount={amount} />
            ) : (
                <Countdown date={auction.endAuctionTime * 1000 + 300000 * 2} renderer={renderer} />
                // <Countdown date={auction.endAuctionTime * 1000 + 360000 * 2} renderer={renderer} />
            )}
        </>
    );
};

export default ResultForSecondBidder;
