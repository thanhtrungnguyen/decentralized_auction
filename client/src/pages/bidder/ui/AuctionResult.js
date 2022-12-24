import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";
import { useFetchBidding } from "../../../hook/useFetch";
import auctionAbi from "../../../constants/contractAbi.json";
import contractAddresses from "../../../constants/contractAddress.json";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { Outlet, Link } from "react-router-dom";
import { Button, Input, ConnectButton, useNotification } from "web3uikit";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import TransactionStatus from "../components/TransactionStatus";
import BiddingProperty from "../components/BiddingProperty";
import TransactionHistory from "../components/TransactionHistory";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import Payment from "./Payment";
import { SUPPORT_CHAINS, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/configuration";
import { parseEther } from "../../../utils/ethereumUnitConverter";
import ClosedAuction from "./ClosedAuction";
import { ConfirmAuctionResult } from "../components/ConfirmAuctionResult";

const AuctionResult = ({ auction }) => {
    const { account, isWeb3Enabled } = useMoralis();
    const dispatch = useNotification();
    const [rank, setRank] = useState();
    const [bidInformation, setBidInformation] = useState();
    const [highestBid, setHighestBid] = useState();
    const [transactionStatus, setTransactionStatus] = useState();
    const [goPayment, setGoPayment] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(() => {
        // if ((auction.endAuctionTime + 360) * 1000 < Date.now()) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    });
    const { runContractFunction: getBidInformationByAuctionId } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getBidInformationByAuctionId",
        params: { auctionId: auction.auctionId },
    });
    const { runContractFunction: getHighestBidOfAuction } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getHighestBidOfAuction",
        params: { auctionId: auction.auctionId },
    });
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
    const updateUI = async () => {
        setBidInformation(await getBidInformationByAuctionId());
        const highest = parseFloat(ethers.utils.formatUnits(await getHighestBidOfAuction(), "ether"));
        setHighestBid(highest);
        setRank(await getRankOfBidder());
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled, account]);

    const getRankOfBidder = () => {
        let bidAmount;
        bidInformation?.forEach((element) => {
            if (element.bidder.toUpperCase() === account.toUpperCase()) {
                bidAmount = parseFloat(ethers.utils.formatUnits(element.bidAmount, "ether"));
            }
        });

        console.log(bidAmount);
        if (bidAmount == 0) {
            console.log("Rank: 0");
            return 0;
        }
        let rank = 1;
        bidInformation?.forEach((element) => {
            const amount = parseFloat(ethers.utils.formatUnits(element.bidAmount, "ether"));
            if (amount > bidAmount) {
                rank++;
            }
        });
        console.log("Rank: " + rank);
        return rank;
    };
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
            setShowConfirmation(false);
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
                                <p className={styles.title}>Result:</p>
                                <p className={styles.txtT}>Your place: {rank}</p>
                                <ConfirmAuctionResult auction={auction} rank={rank} showConfirmation={showConfirmation} highestBid={highestBid} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    //auction.duePaymentTime * 1000
    return (
        <>
            {goPayment ? (
                <Payment auction={auction} highestBid={highestBid} />
            ) : (
                <>
                    <Countdown date={Date.now() + 8000} renderer={renderer} />
                </>
            )}
        </>
    );
};

export default AuctionResult;
