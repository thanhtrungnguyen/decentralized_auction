import React from "react";
import { ConnectButton } from "web3uikit";

import styles from "../../styleCss/stylesComponents/placeABid.module.css";

const HeaderBid = () => {
    return (
        <div>
            <p className={styles.txtBlack}>HeaderBid</p>

            <ConnectButton />
        </div>
    );
};

export default HeaderBid;
