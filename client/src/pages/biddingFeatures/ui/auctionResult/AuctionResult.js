import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import styles from "../../../../styleCss/stylesComponents/placeABid.module.css";
import BiddingProperty from "../../components/BiddingProperty";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/blockchainConfig";
import { getBidderState } from "../../../../utils/getBidderState";
import { getBidAmountOfBidder, getBidderRank, getHighestBid } from "../../../../utils/getBidderRank";
import Loader from "../../components/Loader";
import ResultForFirstBidder from "./ResultForFirstBidder";
import SecondWaitForFirst from "./SecondWaitForFirst";
import ResultForOtherBidders from "./ResultForOtherBidders";

const AuctionResult = ({ auction, property }) => {
    const { account, isWeb3Enabled } = useMoralis();
    const [bidInformation, setBidInformation] = useState();

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

    const setup = async () => {
        await getBidInformationByAuctionId();
        setBidInformation(bidInformationData);
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            setup();
        }
    }, [isWeb3Enabled, account, bidInformationData?.length]);

    const renderBidderRank = () => {
        const rank = getBidderRank(bidInformation, account);
        switch (rank) {
            case 0:
                return <>0: {rank}</>;
            case 1:
                return <ResultForFirstBidder auction={auction} amount={getBidAmountOfBidder(bidInformation, account)} />;
            case 2:
                return <SecondWaitForFirst auction={auction} amount={getBidAmountOfBidder(bidInformation, account)} />;
            case -2:
                return <>-2: {rank}</>;
            default:
                return <ResultForOtherBidders auction={auction} />;
        }
    };

    const renderBidderState = () => {
        switch (getBidderState(bidInformation, account)) {
            case "NOT_REGISTERED":
                return <>NOT_REGISTERED</>;
            case "BIDDING":
                return <>{renderBidderRank()}</>;
            case "RETRACT":
                return <>RETRACT</>;
            case "CANCEL":
                return <>CANCEL</>;
            case "WITHDRAW":
                return <>WITHDRAW</>;
            case "PAYMENT":
                return <>PAYMENT</>;
            case "NoBidder":
                return <>NoBidder </>;
            default:
                return <Loader />;
        }
    };

    return (
        <div>
            <div>
                <p className={styles.txtBlack}>Auction Result </p>
                <p className={styles.txt}>Your Auction has ended:</p>
                <div className={styles.info}>
                    <BiddingProperty property={property} />
                    <p className={styles.txtM}>Current bid:</p>
                    <p className={styles.txtNormal}>{getHighestBid(bidInformation)} ETH</p>
                    <p className={styles.txtM}>Your bid:</p>
                    <p className={styles.txtNormal}>{getBidAmountOfBidder(bidInformation, account)} ETH</p>
                    <p className={styles.txtM}>Your place:</p>
                    <p className={styles.txtNormal}>{getBidderRank(bidInformation, account)} st nd th</p>
                </div>
            </div>
            <div className={styles.detail}>{renderBidderState()}</div>
        </div>
    );
};

export default AuctionResult;
