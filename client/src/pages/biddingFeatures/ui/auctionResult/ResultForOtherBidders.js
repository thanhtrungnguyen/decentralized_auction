import React, { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import styles from "../../../../styleCss/stylesComponents/placeABid.module.css";
import { useNotification } from "web3uikit";
import TransactionStatus from "../../components/TransactionStatus";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/blockchainConfig";

const ResultForOtherBidders = ({ auction }) => {
    const [transactionStatus, setTransactionStatus] = useState();
    const [showButton, setShowButton] = useState(true);
    const dispatch = useNotification();
    const {
        runContractFunction: withdrawDeposit,
        data,
        error,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "withdrawDeposit",
        msgValue: "0",
        params: { auctionId: auction.auctionId },
    });

    const handleSuccess = async (tx) => {
        try {
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);
            setTransactionStatus({ hash: tx.hash, status: "Completed" });
            setShowButton(false);
            dispatch({
                type: "success",
                title: "With D Notification",
                message: "Place Bid Completed!",
                position: "topR",
                icon: <BsCheckLg />,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleError = async (tx) => {
        const message = tx?.code === 4001 ? "User denied transaction signature." : "Failed";
        setTransactionStatus({ status: message });
        dispatch({
            type: "error",
            title: "Withdraw Error",
            message: message,
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    return (
        <div>
            <p className={styles.title}>Withdraw Deposit:</p>
            {showButton ? (
                <button
                    disabled={isLoading || isFetching}
                    className={styles.btn}
                    onClick={async () => {
                        withdrawDeposit({
                            onError: handleError,
                            onSuccess: handleSuccess,
                        });
                    }}
                >
                    {isLoading || isFetching ? "Loading..." : "Withdraw Deposit"}
                </button>
            ) : (
                <p>Withdraw Completed</p>
            )}

            <TransactionStatus transactionStatus={transactionStatus} />
        </div>
    );
};

export default ResultForOtherBidders;
