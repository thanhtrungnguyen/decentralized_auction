import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
const TransactionHistory = () => {
    return (
        <div id="trans" className={styles.transactions}>
            <div className={styles.col1}>
                <p className={styles.txtT}>Your transactions</p>
                <hr />
                <p className={styles.tran}>g43getg43</p>
                <p className={styles.tran}>g3g4rere</p>
            </div>
            <div className={styles.col2}>
                <p className={styles.txtT}>Time</p>
                <hr />
                <p className={styles.tran}>10 minutes ago</p>
                <p className={styles.tran}>10 minutes ago</p>
            </div>
        </div>
    );
};

export default TransactionHistory;
