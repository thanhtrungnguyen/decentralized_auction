import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

<<<<<<< HEAD
const BiddingProperty = ({ property }) => {
=======
const BiddingProperty = ({ auction }) => {
>>>>>>> 490b38d720c744c734643af17c4648d9f1233415
    return (
        <div>
            {/* <img className={styles.img} src={sendAuction.MediaURL[0]} alt="images" /> */}
            <img className={styles.img} src="https://static.vecteezy.com/packs/media/photos/term-bg-3-f6a12264.jpg" alt="images" />
            {/* <p className={styles.title}>{sendAuction.PropertyName}</p> */}
<<<<<<< HEAD
            <p className={styles.title}>{property}</p>
            <br />
            <br />
            <br />
            <br />
=======
            <p className={styles.title}>PropertyName PropertyName PropertyName PropertyName PropertyName</p>
>>>>>>> 490b38d720c744c734643af17c4648d9f1233415
        </div>
    );
};

export default BiddingProperty;
