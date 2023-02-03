import React from "react";
import { Loading } from "web3uikit";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
const Loader = () => {
    return (
        <div className={styles.loader}>
            <Loading fontSize={12} size={12} spinnerColor="#2E7DAF" spinnerType="wave" text="Loading..." />
        </div>
    );
};

export default Loader;
