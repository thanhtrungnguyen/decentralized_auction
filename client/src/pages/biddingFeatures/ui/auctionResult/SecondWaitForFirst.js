import React, { useState } from "react";
import styles from "../../../../styleCss/stylesComponents/placeABid.module.css";
import Countdown from "react-countdown";
import ResultForSecondBidder from "./ResultForSecondBidder";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/blockchainConfig";
import { useWeb3Contract } from "react-moralis";
import ResultForOtherBidders from "./ResultForOtherBidders";
import CheckOpportunity from "./CheckOpportunity";

const SecondWaitForFirst = ({ auction, amount }) => {
    const [bidInformation, setBidInformation] = useState();
    const [isHaveOpportunity, setHaveOpportunity] = useState();
    const {
        runContractFunction: getBidInformationByAuctionId,
        data: bidInformationData,
        error: bidInformationError,
        isFetching: isBidInformationFetching,
        isLoading: isBidInformationLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getBidInformationByAuctionId",
        params: { auctionId: auction.auctionId },
    });
    const checkOpportunity = async () => {
        await getBidInformationByAuctionId();
        setBidInformation(bidInformationData);
        let hasPayment = false;
        bidInformation?.forEach((element) => {
            if (element.bidderState === 4) {
                hasPayment = false;
            }
        });
        setHaveOpportunity(hasPayment);
    };
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <CheckOpportunity auction={auction} amount={amount} />;
        } else {
            return (
                <div>
                    <p className={styles.txtNormal}>Waiting for the first bidder confirmation in:</p>
                    <p className={styles.txtNormal}>
                        <span>
                            {days}d {hours}h {minutes}m {seconds}s
                        </span>
                    </p>
                </div>
            );
        }
    };
    return <Countdown date={Date.now() + 10000 / 2} renderer={renderer} />;
};

export default SecondWaitForFirst;
