import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract, useMoralisWeb3Api } from "react-moralis";
import { useFetchBidding } from "../../../../hooks/useFetch";
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
import { GOERLI_TEST_NETWORK, MORALIS_API_KEY, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/blockchainConfig";
import { parseEther } from "../../../../utils/ethereumUnitConverter";
import ClosedAuction from "../ClosedAuction";
import { ConfirmAuctionResult } from "../../components/ConfirmAuctionResult";
import { getNativeBalanceOfBidder } from "../../nativeBalance";

const ResultForOtherBidders = ({ auction, rank }) => {
    const [transactionStatus, setTransactionStatus] = useState();
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
            console.log("handleSuccess " + tx.hash);
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);
            setTransactionStatus({ hash: tx.hash, status: "Completed" });

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
        console.log(tx);
        const message = tx.code == 4001 ? "User denied transaction signature." : "Failed";
        setTransactionStatus({ status: tx.data.message });
        dispatch({
            type: "error",
            title: "Cancel Error",
            message: message,
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    return (
        <div>
            <p className={styles.title}>Result:</p>
            <p className={styles.txtT}>Your place: {rank}</p>
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
            <TransactionStatus transactionStatus={transactionStatus} />
        </div>
    );
};

export default ResultForOtherBidders;
