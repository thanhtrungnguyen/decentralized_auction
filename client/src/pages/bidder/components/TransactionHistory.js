import React, { useEffect, useState } from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import axios from "axios";

import { useMoralis } from "react-moralis";

const TransactionHistory = ({ auction }) => {
    const baseURL = `http://localhost:8800/api/auctionInformation/${auction.auctionId}/placedBid`;

    // const [placedBid, setPlacedBid] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get(baseURL)
    //         .then((res) => {
    //             setPlacedBid(res.data);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, placedBid);
    // // const { account } = useMoralis();
    // console.log(placedBid);
    // const listTxByAccount = () => {};
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
