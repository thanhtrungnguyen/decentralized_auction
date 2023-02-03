/* eslint-disable react-hooks/exhaustive-deps */

import Loader from "../components/Loader";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import WaitingForAuctionTime from "./WaitingForAuctionTime";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/blockchainConfig";
import { useEffect, useState } from "react";
import { getBidderState } from "../../../utils/getBidderState";

const CheckRegistration = ({ auction, property }) => {
    const { account, isWeb3Enabled } = useMoralis();
    const [bidInformation, setBidInformation] = useState();
    const {
        runContractFunction: getBidInformationByAuctionId,
        data,
        error,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getBidInformationByAuctionId",
        params: { auctionId: auction.auctionId },
    });

    const setup = async () => {
        await getBidInformationByAuctionId();
        setBidInformation(data);
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            setup();
        }
    }, [isWeb3Enabled, account, data?.length]);

    const renderBidderState = () => {
        switch (getBidderState(bidInformation, account)) {
            case "NOT_REGISTERED":
                return <div className={styles.notification}>NOT_REGISTERED</div>;
            case "BIDDING":
                return <WaitingForAuctionTime auction={auction} property={property} />;
            case "RETRACT":
                return <div className={styles.notification}>RETRACT</div>;
            case "CANCEL":
                return <div className={styles.notification}>CANCEL</div>;
            case "WITHDRAW":
                return <div className={styles.notification}>WITHDRAW</div>;
            case "PAYMENT":
                return <div className={styles.notification}>PAYMENT</div>;
            case "NoBidder":
                return <div className={styles.notification}>NoBidder </div>;
            default:
                return <Loader />;
        }
    };

    if (isFetching || isLoading) return <Loader />;
    return renderBidderState();
};

export default CheckRegistration;
