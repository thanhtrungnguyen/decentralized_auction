import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/blockchainConfig";
import ResultForOtherBidders from "./ResultForOtherBidders";
import ResultForSecondBidder from "./ResultForSecondBidder";

const CheckOpportunity = ({ auction, amount }) => {
    const { account, isWeb3Enabled } = useMoralis();
    //     const [bidInformation, setBidInformation] = useState();
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
    const checkOpportunity = () => {
        let hasCancel = false;
        console.log(bidInformationData);
        bidInformationData?.map((element) => {
            if (element.bidderState === 2) {
                hasCancel = true;
            }
        });
        setHaveOpportunity(hasCancel);
    };

    const setup = async () => {
        await getBidInformationByAuctionId();
        checkOpportunity();
        console.log(isHaveOpportunity);
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            setup();
        }
    }, [isWeb3Enabled, account, bidInformationData?.length]);

    return <div>{isHaveOpportunity ? <ResultForSecondBidder auction={auction} amount={amount} /> : <ResultForOtherBidders auction={auction} />}</div>;
};

export default CheckOpportunity;
