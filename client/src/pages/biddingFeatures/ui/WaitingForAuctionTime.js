import React from "react";
import Countdown from "react-countdown";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import PlaceBid from "./PlaceBid";
const WaitingForAuctionTime = ({ auction, property }) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <PlaceBid auction={auction} property={property} />;
        } else {
            return (
                <>
                    <div className={styles.wait}>
                        <h2>Waiting For Auction Time</h2>
                        Auction start in:
                        <p className={styles.title}>
                            <span className={styles.title}>
                                {days}d {hours}h {minutes}m {seconds}s
                            </span>
                        </p>
                    </div>
                </>
            );
        }
    };
    return <Countdown date={auction.startAuctionTime * 1000} renderer={renderer} />;
};

export default WaitingForAuctionTime;
