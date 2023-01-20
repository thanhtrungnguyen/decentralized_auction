import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import styles from "../../../../styleCss/stylesComponents/placeABid.module.css";
import BiddingProperty from "../../components/BiddingProperty";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/blockchainConfig";
import { getBidderState } from "../../../../utils/getBidderState";
import { getBidderRank } from "../../../../utils/getBidderRank";
import Loader from "../../components/Loader";

const AuctionResult = ({ auction, property }) => {
    const { account, isWeb3Enabled } = useMoralis();
    const [rank, setRank] = useState();
    const [bidInformation, setBidInformation] = useState();
    const [bidderState, setBidderState] = useState();

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
        if (bidInformation != null) {
            setBidderState(getBidderState(bidInformation, account));
            // setRank(getBidderRank(bidInformation, account));
        }
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            setup();
        }
    }, [isWeb3Enabled, account, bidInformationData?.length]);

    const renderBidderRank = () => {
        switch (rank) {
            case 0:
                return <>0: {rank}</>;
            case 1:
                return <>1: {rank}</>;
            case 2:
                return <>2: {rank}</>;
            case -2:
                return <>-2: {rank}</>;
            default:
                return <>default: {rank}</>;
        }
    };

    const renderBidderState = () => {
        switch (bidderState) {
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
                    {/* <p className={styles.txtM}>Current bid:</p>
                    <p className={styles.txtNormal}>{highestBid} ETH</p>
                    <p className={styles.txtM}>Your bid:</p>
                    <p className={styles.txtNormal}>{highestBid} ETH</p> */}
                </div>
            </div>
            <div className={styles.detail}>{renderBidderState()}</div>
        </div>
    );
};

export default AuctionResult;
