import React from "react";
import Countdown from "react-countdown";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
const WaitingForAuctionTime = ({ auction }) => {
    return (
        <div>
            <h2>WaitingForAuctionTime</h2>
            Auction start in:
            <p className={styles.txtNormal}>
                Auction start in:
                <Countdown date={auction.startAuctionTime * 1000} />
            </p>
        </div>
    );
};

export default WaitingForAuctionTime;
