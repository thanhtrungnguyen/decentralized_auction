import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract, useApiContract, useWeb3ExecuteFunction } from "react-moralis";
import { useFetchBidding } from "../../../../hook/useFetch";
import auctionAbi from "../../../../constants/contractAbi.json";
import contractAddresses from "../../../../constants/contractAddress.json";
import styles from "../../../../styleCss/stylesComponents/placeABid.module.css";
import BiddingProperty from "../../components/BiddingProperty";
import { GOERLI_TEST_NETWORK, MORALIS_API_KEY, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/configuration";
import { parseWei, parseEther } from "../../../../utils/ethereumUnitConverter";
import ClosedAuction from "../ClosedAuction";
import { ConfirmAuctionResult } from "../../components/ConfirmAuctionResult";
import { getNativeBalanceOfBidder } from "../../nativeBalance";
import ResultForFirstBidder from "./ResultForFirstBidder";
import ResultForSecondBidder from "./ResultForSecondBidder";
import ResultForOtherBidders from "./ResultForOtherBidders";
import SecondWaitForFirst from "./SecondWaitForFirst";
import axios from "axios";

const AuctionResult = ({ auction }) => {
    const { account, isWeb3Enabled } = useMoralis();
    const [rank, setRank] = useState();
    const [bidInformation, setBidInformation] = useState();
    const [highestBid, setHighestBid] = useState();
    const [accountBidInformation, setAccountBidInformation] = useState();
    const [bidderState, setBidderState] = useState();

    const { runContractFunction: returnedBidInformation } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getBidInformationByAuctionId",
        params: { auctionId: auction.auctionId },
    });

    async function setup() {
        setBidInformation(await returnedBidInformation());
        setAccountBidInformation(getAccountBidInformation());
        setBidderState(returnedState());
        // getRankOfBidder();
    }
    console.log(bidInformation);
    useEffect(() => {
        if (isWeb3Enabled) {
            setup();
        }
    }, [isWeb3Enabled, account, bidderState]);

    const getAccountBidInformation = () => {
        var user = null;
        bidInformation?.forEach((e) => {
            if (e.bidder.toLowerCase() == account.toLowerCase()) {
                user = e;
            }
        });
        return user;
    };
    console.log(accountBidInformation);
    const getRankOfBidder = () => {
        let rank = 1;

        bidInformation.map((element) => {
            if (element.bidderState == 0 && parseEther(element.bidAmount) > parseEther(accountBidInformation.bidAmount)) {
                rank++;
            }
        });
        return rank;
    };
    const returnedState = () => {
        let state = null;
        if (accountBidInformation) {
            bidInformation.forEach((element) => {
                if (element.bidder.toLowerCase() == account.toLowerCase()) {
                    if (accountBidInformation.bidderState == 1) state = "RETRACT";
                    if (accountBidInformation.bidderState == 2) state = "CANCEL";
                    if (accountBidInformation.bidderState == 3) state = "WITHDRAW";
                    if (accountBidInformation.bidderState == 4) state = "PAYMENT";
                    if (accountBidInformation.bidderState == 0) state = getRankOfBidder();
                }
            });
        }
        return state;
    };
    console.log(rank);
    const renderTopBidder = () => {
        console.log("returnedState: ", returnedState());
        switch (returnedState()) {
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
                return <ResultForFirstBidder auction={auction} highestBid={highestBid} rank={rank} accountBidInformation={accountBidInformation} />;
            case 2:
                return <SecondWaitForFirst auction={auction} highestBid={highestBid} rank={rank} accountBidInformation={accountBidInformation} />;
            case 0:
                return <>Retracted Bid</>;
            case "NoBidder":
                return <>NoBidder </>;
            default:
                return <ResultForOtherBidders auction={auction} highestBid={highestBid} rank={rank} accountBidInformation={accountBidInformation} />;
        }
    };

    return (
        <div>
            <div>
                <p className={styles.txtBlack}>Auction Result </p>
                <p className={styles.txt}>Your Auction has ended:</p>
                <div className={styles.info}>
                    {/* <BiddingProperty auction={auction} />
                        <BiddingProperty auction={auction} property={property} /> */}
                    <BiddingProperty />
                    {/* <p className={styles.txtM}>Current bid:</p>
                    <p className={styles.txtNormal}>{highestBid} ETH</p>
                    <p className={styles.txtM}>Your bid:</p>
                    <p className={styles.txtNormal}>{highestBid} ETH</p> */}
                </div>
            </div>
            <div className={styles.detail}>{renderTopBidder()}</div>
        </div>
    );
};

export default AuctionResult;
