import React, { useState } from "react";
import Countdown from "react-countdown";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import AuctionRegistration from "./AuctionRegistration";
const NotYetRegistrationTime = ({ auction, property }) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <AuctionRegistration auction={auction} property={property} />;
        } else {
            return (
                <>
                    <div className={styles.wait}>
                        <h2>Not Yet Registration Time</h2>
                        Registration start in:
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
    return <Countdown date={auction.startRegistrationTime * 1000} renderer={renderer} />;
};

export default NotYetRegistrationTime;
