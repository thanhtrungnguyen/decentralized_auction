import React from "react";
import Countdown from "react-countdown";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import PlaceBid from "./PlaceBid";
const WaitingForAuctionTime = ({ auction }) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <PlaceBid auction={auction} />;
        } else {
            return (
                <>
                    <h2>WaitingForAuctionTime</h2>
                    Auction start in:
                    <p className={styles.txtNormal}>
                        <span>
                            {days}d {hours}h {minutes}m {seconds}s
                        </span>
                    </p>
                </>
            );
        }
    };
    return <Countdown date={auction.startAuctionTime * 1000} renderer={renderer} />;
};

export default WaitingForAuctionTime;
