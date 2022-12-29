import React, { useEffect, useState } from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import Decimal from "decimal.js";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import BiddingProperty from "../components/BiddingProperty";
import TransactionStatus from "../components/TransactionStatus";
import ClosedAuction from "./ClosedAuction";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/configuration";
import { parseWei, parseEther } from "../../../utils/ethereumUnitConverter";
const Payment = ({ auction, highestBid }) => {
    const dispatch = useNotification();
    const { account, isWeb3Enabled } = useMoralis();
    const [transactionStatus, setTransactionStatus] = useState();
    const [bidAmount, setBidAmount] = useState(0);
    const { runContractFunction: getHighestBidOfAuction } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS, // your contract address here
        functionName: "getHighestBidOfAuction",
        params: { auctionId: auction.auctionId },
    });
    const amount = auction.depositAmount != null && bidAmount != "0" ? new Decimal(bidAmount).minus(auction.depositAmount).toString() : "0";
    console.log(amount);
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
        msgValue: parseWei(amount),
        params: { auctionId: auction.auctionId },
    });
    if (error) console.log(error);
    console.log();
    async function updateData() {
        const amount = await getHighestBidOfAuction();
        console.log(parseEther(amount));
        setBidAmount(typeof amount == "object" ? parseEther(amount) : "0");
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateData();
        }
    }, [isWeb3Enabled, account, bidAmount]);

    const handleSuccess = async (tx) => {
        try {
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);

            // updateUIValues();
            setTransactionStatus({ hash: tx.hash, status: "Completed" });
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
        setTransactionStatus({ status: "Failed" });
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
                        <p className={styles.txtT}>Your Bid: {bidAmount} ETH</p>
                        <p className={styles.txtT}>
                            Total amount you must to pay:
                            {amount}
                            ETH
                        </p>
                        {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                        {/* <label className={styles.mess}>message</label> */}
                        <button
                            className={styles.btn}
                            onClick={async () =>
                                await payment({
                                    onSuccess: handleSuccess,
                                    onError: handleErrorNotification,
                                })
                            }
                        >
                            {isLoading || isFetching ? <div>Loading...</div> : <div>Send Payment</div>}
                        </button>
                        <TransactionStatus transactionStatus={transactionStatus} />
                    </div>
                </>
            );
        }
    };

    return <Countdown date={auction.duePaymentTime * 1000} renderer={renderer} />;
};

export default Payment;
