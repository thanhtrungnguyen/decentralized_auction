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
import ResultForFirstBidder from "./ResultForFirstBidder";
import ResultForSecondBidder from "./ResultForSecondBidder";
import ResultForOtherBidders from "./ResultForOtherBidders";
import SecondWaitForFirst from "./SecondWaitForFirst";

const AuctionResult = ({ auction }) => {
    const { account, isWeb3Enabled } = useMoralis();
    const [rank, setRank] = useState();
    const [bidInformation, setBidInformation] = useState();
    const [highestBid, setHighestBid] = useState();
    const [accountBidInformation, setAccountBidInformation] = useState();
    const { runContractFunction: returnedBidInformation } = useWeb3Contract({
        params: {
            abi: CONTRACT_ABI,
            contractAddress: CONTRACT_ADDRESS,
            functionName: "getBidInformationByAuctionId",
            params: { auctionId: auction.auctionId },
        },
        onError: (error) => console.log(error),
    });
    async function setup() {
        if (returnedBidInformation) {
            setBidInformation(returnedBidInformation);
        }
        returnedBidInformationOfBidder();
        getRankOfBidder();
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            setup();
        }
    }, [isWeb3Enabled, account]);

    const returnedBidInformationOfBidder = () => {
        bidInformation?.map((element) => {
            if (element.bidder.toUpperCase() === account.toUpperCase()) {
                setAccountBidInformation({
                    bidder: account,
                    bidAmount: parseFloat(ethers.utils.formatUnits(element.bidAmount, "ether")),
                    bidderState: element.bidderState,
                });
            }
        });
    };
    const getRankOfBidder = () => {
        let rank = 1;
        if (bidInformation.length == 0) return "NoBidder";
        if (accountBidInformation.bidderState == 0) {
            if (accountBidInformation.bidAmount == 0) rank = -1;
            bidInformation.map((element) => {
                if (element.bidderState == 0 && element.bidAmount > accountBidInformation.bidAmount) {
                    rank++;
                }
            });
        }
        setRank(rank);
    };
    const returnedState = () => {
        if (accountBidInformation) {
            if (accountBidInformation.bidderState == 0) {
                return rank;
            }
            if (accountBidInformation.bidderState == 1) return "RETRACT";
            if (accountBidInformation.bidderState == 2) return "CANCEL";
            if (accountBidInformation.bidderState == 3) return "WITHDRAW";
            if (accountBidInformation.bidderState == 4) return "PAYMENT";
        }
    };

    console.log(accountBidInformation);

    const renderTopBidder = () => {
        console.log("returnedState: ", returnedState);
        switch (returnedState) {
            case "RETRACT":
                return <>RETRACT</>;
            case "CANCEL":
                return <>CANCEL</>;
            case "WITHDRAW":
                return <>WITHDRAW</>;
            case "PAYMENT":
                return <>PAYMENT</>;
            case -1:
                return <>No Rank - Bidder wasn't placed bid</>;
            case 1:
                return <ResultForFirstBidder auction={auction} highestBid={highestBid} rank={rank} />;
            case 2:
                return <SecondWaitForFirst auction={auction} highestBid={highestBid} rank={rank} />;
            case 0:
                return <>Retracted Bid</>;
            case "NoBidder":
                return <>NoBidder </>;
            default:
                return <ResultForOtherBidders auction={auction} highestBid={highestBid} rank={rank} />;
        }
    };

    // const renderer = ({ days, hours, minutes, seconds, completed }) => {
    //     if (completed) {
    //         return <ClosedAuction />;
    //     } else {
    //         return (

    //         );
    //     }
    // };
    return (
        <div>
            <div>
                <p className={styles.txtBlack}>Auction Result </p>
                <p className={styles.txt}>Your Auction has ended:</p>
                <div className={styles.info}>
                    {/* <BiddingProperty auction={auction} />
                        <BiddingProperty auction={auction} property={property} /> */}
                    <BiddingProperty />
                    <p className={styles.txtM}>Current bid:</p>
                    <p className={styles.txtNormal}>{highestBid} ETH</p>
                    <p className={styles.txtM}>Your bid:</p>
                    <p className={styles.txtNormal}>{highestBid} ETH</p>
                </div>
            </div>
            <div className={styles.detail}>{renderTopBidder()}</div>
        </div>
    );
};

export default AuctionResult;
