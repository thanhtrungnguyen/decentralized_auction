import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

const TransactionHistory = ({ auction }) => {
    const baseURL = `http://localhost:8800/api/auctionInformation/${auction.auctionId}/placedBid`;

    return (
        <div id="trans" className={styles.transactions}>
            <div className={styles.col1}>
                <p className={styles.txtT}>Your transactions</p>
                <hr />
            </div>
            <div className={styles.col2}>
                <p className={styles.txtT}>Time</p>
                <hr />
            </div>
            <div className={styles.scroll}>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>{" "}
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>{" "}
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>{" "}
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>{" "}
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>{" "}
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>{" "}
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>{" "}
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>{" "}
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
                <div className={styles.col1}>
                    <label className={styles.tran}>g43getg43</label>
                </div>
                <div className={styles.col2}>
                    <label className={styles.tran}>10 minutes ago</label>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
