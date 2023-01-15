import React from "react";
import styles from "../../../../styleCss/stylesComponents/placeABid.module.css";
import Countdown from "react-countdown";
import ResultForSecondBidder from "./ResultForSecondBidder";

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
