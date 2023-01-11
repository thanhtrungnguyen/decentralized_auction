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
import { GOERLI_TEST_NETWORK, MORALIS_API_KEY, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../../config/blockchainConfig";
import { parseEther } from "../../../../utils/ethereumUnitConverter";
import ClosedAuction from "../ClosedAuction";
import { ConfirmAuctionResult } from "../../components/ConfirmAuctionResult";
import { getNativeBalanceOfBidder } from "../../nativeBalance";
import ResultForFirstBidder from "./ResultForFirstBidder";
import ResultForSecondBidder from "./ResultForSecondBidder";
import ResultForOtherBidders from "./ResultForOtherBidders";

const SecondWaitForFirst = ({ auction, highestBid, rank, accountBidInformation }) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <ResultForSecondBidder auction={auction} highestBid={highestBid} rank={rank} accountBidInformation={accountBidInformation} />;
        } else {
            return (
                <div>
                    <p className={styles.txtM}>Your place:</p>
                    <p className={styles.txtNormal}>{rank} </p>
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
    return <Countdown date={auction.endAuctionTime + 360000} renderer={renderer} />;
};

export default SecondWaitForFirst;
