import React from "react";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";
import { useFetchBidding } from "../../../hook/useFetch";
import auctionAbi from "../../../constants/contractAbi.json";
import contractAddresses from "../../../constants/contractAddress.json";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { Outlet, Link } from "react-router-dom";
import { Button, Input, ConnectButton, useNotification } from "web3uikit";
import HeaderBid from "../components/HeaderBid";
import Moralis from "moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import TransactionStatus from "../components/TransactionStatus";
import BiddingProperty from "../components/BiddingProperty";
import TransactionHistory from "../components/TransactionHistory";
const AuctionResult = ({ auction }) => {
    const { address } = useMoralis();
    console.log(address);

    // const { runContractFunction: getBidInformationByAuctionId } = useWeb3Contract({ abi: auctionAbi });

    // const renderer = ({ days, hours, minutes, seconds, completed }) => {
    //     if (completed) {
    //         return <AuctionResult auction={auction} />;
    //     } else {
    //         return (
    //             <div>
    //                 <div>
    //                     <p className={styles.txtBlack}>Place a Bid </p>
    //                     <p className={styles.txt}>You have selected:</p>
    //                     <div>
    //                         <div className={styles.info}>
    //                             {/* <BiddingProperty auction={auction} />
    //                     <BiddingProperty auction={auction} property={property} /> */}
    //                             <BiddingProperty />
    //                             <p className={styles.txtM}>Starting bid:</p>
    //                             <p className={styles.txtNormal}>{auction.startBid}</p>
    //                             <p className={styles.txtM}>Current bid:</p>
    //                             <p className={styles.txtNormal}>{highestBid} ETH</p>
    //                             <p className={styles.txtM}>Auction ends in:</p>
    //                             <p className={styles.txtNormal}>
    //                                 <span>
    //                                     {days}d {hours}h {minutes}m {seconds}s
    //                                 </span>
    //                             </p>
    //                         </div>
    //                         <div className={styles.detail}>
    //                             <p className={styles.title}>Place bid details:</p>
    //                             <p className={styles.txtT}>Your bid must be at least 6969 ETH</p>

    //                             <input
    //                                 className={styles.input}
    //                                 type="number"
    //                                 value={inputBidAmount}
    //                                 validation={{
    //                                     max: "",
    //                                     min: 1,
    //                                 }}
    //                                 onChange={(event) => {
    //                                     setInputBidAmount(event.target.value);
    //                                 }}
    //                             ></input>
    //                             <label className={styles.mess}>Error message</label>
    //                             <br />
    //                             <button
    //                                 disabled={isLoading || isFetching}
    //                                 className={styles.btn}
    //                                 onClick={async () => {
    //                                     console.log(inputBidAmount);
    //                                     placeBid({
    //                                         onError: handleErrorNotification,
    //                                         onSuccess: handleSuccess,
    //                                         onComplete: handleComplete,
    //                                     });
    //                                 }}
    //                             >
    //                                 {isLoading || isFetching ? "Loading..." : "Place Bid"}
    //                             </button>
    //                             <TransactionStatus transactionStatus={transactionStatus} />
    //                         </div>
    //                         <TransactionHistory auction={auction} />
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     }
    // };
    return <div>AuctionResult</div>;
};

export default AuctionResult;
