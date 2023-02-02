import React, { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { Navigate } from "react-router-dom";
import { useNotification } from "web3uikit";
import TransactionStatus from "./TransactionStatus";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/blockchainConfig";
export const ConfirmAuctionResult = ({ auction, rank, showConfirmation }) => {
    const dispatch = useNotification();
    const [transactionStatus, setTransactionStatus] = useState();
    const [setGoPayment] = useState(false);

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
    const handleComplete = async (hash) => {
        console.log(hash);
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

    return (
        <div>
            {rank === 1 ? (
                showConfirmation ? (
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
                                    onComplete: handleComplete,
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
                            <Navigate to="/payment" />;
                        }}
                    >
                        Go To Payment
                    </button>
                )
            ) : (
                ""
            )}
        </div>
    );
};
