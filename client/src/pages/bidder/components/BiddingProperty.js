import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

const BiddingProperty = ({ auction }) => {
    return (
        <div>
            {/* <img className={styles.img} src={sendAuction.MediaURL[0]} alt="images" /> */}
            <img className={styles.img} src="https://static.vecteezy.com/packs/media/photos/term-bg-3-f6a12264.jpg" alt="images" />
            {/* <p className={styles.title}>{sendAuction.PropertyName}</p> */}
            <p className={styles.title}>PropertyName PropertyName PropertyName PropertyName PropertyName</p>
        </div>
    );
};

export default BiddingProperty;
