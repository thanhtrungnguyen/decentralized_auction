import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { Outlet, Link } from "react-router-dom";
import { Button, ConnectButton, useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";
import HeaderBid from "../components/HeaderBid";
import auctionAbi from "../../../constants/contractAbi.json";
import contractAddresses from "../../../constants/contractAddress.json";
import Moralis from "moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import Decimal from "decimal.js";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import BiddingProperty from "../components/BiddingProperty";
import { useFetch } from "../../../hook/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import WaitingForAuctionTime from "./WaitingForAuctionTime";
import TransactionStatus from "../components/TransactionStatus";
import ClosedAuction from "./ClosedAuction";
import { SUPPORT_CHAINS, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/configuration";
const Payment = ({ auction, highestBid }) => {
    const dispatch = useNotification();
    const [transactionStatus, setTransactionStatus] = useState();

    const amount = auction.depositAmount != null && highestBid != null ? new Decimal(highestBid).minus(auction.depositAmount).toString() : "0";
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
        msgValue: ethers.utils.parseUnits(amount, "ether").toString(),
        params: { auctionId: auction.auctionId },
    });
    if (error) console.log(error);
    console.log();
    // const { runContractFunction: getAuctionInformationById } = useWeb3Contract({
    //     abi: auctionAbi,
    //     contractAddress: auctionContractAddress,
    //     functionName: "getAuctionInformationById",
    //     params: { auctionId: "12a" },
    // });
    // const updateUIValues = async () => {
    //     const auctionInformation = await getAuctionInformationById();
    // };

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
    const handleComplete = async (hash) => {
        console.log(hash);
        // setTransactionStatus({ hash: hash, status: "waitingForConfirmation" });
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
                <div>
                    <div>
                        <p className={styles.txtBlack}>Payment</p>
                        <p className={styles.txt}>You're paying for:</p>\
                        <div>
                            <div className={styles.info}>
                                {/* <BiddingProperty auction={auction} property={property} /> */}
                                <BiddingProperty />
                                <p className={styles.txtM}>Your bid:</p>
                                <p className={styles.txtNormal}>{highestBid}</p>
                                {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                                <p className={styles.txtM}>Time for payment ends in:</p>
                                <p className={styles.txtNormal}>
                                    <span>
                                        {days}d {hours}h {minutes}m {seconds}s
                                    </span>
                                </p>
                            </div>
                            <div className={styles.detail}>
                                {/* <form> */}
                                <p className={styles.title}>Payment:</p>
                                <p className={styles.txtT}>Deposit Paid: {auction.depositAmount} ETH</p>
                                <p className={styles.txtT}>Your Bid: {highestBid} ETH</p>
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
                                            onComplete: handleComplete,
                                        })
                                    }
                                >
                                    {isLoading || isFetching ? <div>Loading...</div> : <div>Send Payment</div>}
                                </button>
                                <TransactionStatus transactionStatus={transactionStatus} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return <Countdown date={auction.duePaymentTime * 1000} renderer={renderer} />;
};

export default Payment;
