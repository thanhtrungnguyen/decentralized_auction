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
const AuctionResult = ({ auction }) => {
    const { account, isWeb3Enabled } = useMoralis();
    const [rank, setRank] = useState();
    const [bidInformation, setBidInformation] = useState();
    const [highestBid, setHighestBid] = useState();

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

    const updateUI = async () => {
        setBidInformation(await getBidInformationByAuctionId());
        console.log(bidInformation);
        const highest = parseFloat(ethers.utils.formatUnits(await getHighestBidOfAuction(), "ether"));
        setHighestBid(highest);
        console.log(highest);
        const bidInformationOfBidder = await getBidInformationOfBidder();
        setRank(await getRankOfBidder());
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled, account, rank]);

    const getBidInformationOfBidder = () => {
        bidInformation?.forEach((element) => {
            if (element.bidder.toUpperCase() === account.toUpperCase()) {
                return {
                    bidder: account,
                    bidAmount: parseFloat(ethers.utils.formatUnits(element.bidAmount, "ether")),
                    bidderState: element.bidderState,
                };
            }
        });
    };

    const getRankOfBidder = () => {
        let bidAmount = 0;
        bidInformation?.forEach((element) => {
            if (element.bidder.toUpperCase() === account.toUpperCase()) {
                bidAmount = parseFloat(ethers.utils.formatUnits(element.bidAmount, "ether"));
            }
        });

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

    const renderTopBidder = () => {
        switch (rank) {
            case 1:
                return <ResultForFirstBidder auction={auction} highestBid={highestBid} />;
            case 2:
                return <ResultForSecondBidder />;
            case 0:
                return <>Retracted Bid</>;
            default:
                return <ResultForOtherBidders />;
        }
    };

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
                        <p className={styles.txtM}>Current bid:</p>
                        <p className={styles.txtNormal}>{highestBid} ETH</p>
                    </div>
                    <div className={styles.detail}>
                        <p className={styles.title}>Result:</p>
                        <p className={styles.txtT}>Your place: {rank}</p>
                        {renderTopBidder()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionResult;
