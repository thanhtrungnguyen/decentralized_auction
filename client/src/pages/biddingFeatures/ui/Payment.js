import React, { useEffect, useState } from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Countdown from "react-countdown";
import Decimal from "decimal.js";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import TransactionStatus from "../components/TransactionStatus";
import ClosedAuction from "./ClosedAuction";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/blockchainConfig";
import { parseWei } from "../../../utils/ethereumUnitConverter";
const Payment = ({ auction, amount }) => {
    const dispatch = useNotification();
    const { account, isWeb3Enabled } = useMoralis();
    const [transactionStatus, setTransactionStatus] = useState();
    const [isCompleted, setCompleted] = useState();
    const [isWaiting, setWaiting] = useState();
    const paymentAmount = auction.depositAmount != null && amount != "0" ? new Decimal(amount).minus(auction.depositAmount).toString() : "0";
    console.log(paymentAmount);
    const {
        runContractFunction: payment,
        data,
        error,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS, // your contract address here
        functionName: "payment",
        msgValue: parseWei(paymentAmount),
        params: { auctionId: auction.auctionId },
    });

    if (error) console.log(error);
    console.log();
    async function updateData() {}
    useEffect(() => {
        if (isWeb3Enabled) {
            updateData();
        }
    }, [isWeb3Enabled, account]);

    const handleSuccess = async (tx) => {
        try {
            setWaiting(true);
            setTransactionStatus(tx);
            const result = await tx.wait(1);
            console.log(result);

            if (result?.events) {
                setCompleted(true);
            }
            setTransactionStatus(result);
            handleSuccessNotification(tx);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSuccessNotification = () => {
        dispatch({
            type: "success",
            title: "Payment Notification",
            message: "Payment Completed!",
            position: "topR",
            icon: <BsCheckLg />,
        });
    };
    const handleErrorNotification = () => {
        setTransactionStatus("null");
        dispatch({
            type: "error",
            title: "Payment Error",
            message: "Payment Failed!",
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <ClosedAuction auction={auction} />;
        } else {
            return (
                <>
                    <div className={styles.detail}>
                        {/* <form> */}
                        <p className={styles.title}>Payment:</p>
                        <p className={styles.txtT}>Deposit Paid: {auction.depositAmount} ETH</p>
                        <p className={styles.txtT}>Your Bid: {amount} ETH</p>
                        <p className={styles.txtT}>Total amount you must to pay: {paymentAmount}ETH</p>
                        {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                        {/* <label className={styles.mess}>message</label> */}
                        {isCompleted ? (
                            <p className={styles.txtT}>You have Payment Successfully</p>
                        ) : (
                            <button
                                className={styles.btn}
                                onClick={async () =>
                                    await payment({
                                        onSuccess: handleSuccess,
                                        onError: handleErrorNotification,
                                    })
                                }
                            >
                                {isLoading || isFetching || isWaiting ? <div>Loading...</div> : <div>Send Payment</div>}
                            </button>
                        )}

                        <TransactionStatus transactionStatus={transactionStatus} />
                    </div>
                </>
            );
        }
    };

    return <Countdown date={auction.duePaymentTime * 1000} renderer={renderer} />;
};

export default Payment;
