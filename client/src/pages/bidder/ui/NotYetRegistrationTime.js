import React, { useState } from "react";
import Countdown from "react-countdown";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import AuctionRegistration from "./AuctionRegistration";
const NotYetRegistrationTime = ({ auction }) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <AuctionRegistration auction={auction} />;
        } else {
            return (
                <>
                    <h2>NotYetRegistrationTime</h2>
                    Registration start in:
                    <p className={styles.txtNormal}>
                        <span>
                            {days}d {hours}h {minutes}m {seconds}s
                        </span>
                    </p>
                </>
            );
        }
    };
    return <Countdown date={auction.startRegistrationTime * 1000} renderer={renderer} />;
};

export default NotYetRegistrationTime;
