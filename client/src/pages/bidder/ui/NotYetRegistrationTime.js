import React from "react";
import Countdown from "react-countdown";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
const NotYetRegistrationTime = ({ auction }) => {
    return (
        <div>
            <h2>NotYetRegistrationTime</h2>
            Registration start in:
            <p className={styles.txtNormal}>
                <Countdown date={auction.startRegistrationTime * 1000} />
            </p>
        </div>
    );
};

export default NotYetRegistrationTime;
