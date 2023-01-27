import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

function TransactionStatus({ transactionStatus }) {
    const prefix = "https://goerli.etherscan.io/tx/";

    // console.log(transactionStatus);
    const transactionStatusType = () => {
        if (transactionStatus == null) return "NoTx";
        if (transactionStatus.hash == null) return "NoHash";
        if (transactionStatus.hash != null) return "Tx";
        return null;
    };

    const renderTransactionStatus = () => {
        switch (transactionStatusType()) {
            case "NoTx":
                return <div></div>;
            case "NoHash":
                return <div>Transaction Failed</div>;
            case "Tx":
                const hashString = `Tx: ${transactionStatus.hash.slice(0, 6)}...${transactionStatus.hash.slice(transactionStatus.hash.length - 4)}`;
                const link = `${prefix}${transactionStatus.hash}`;
                return (
                    <div>
                        <br />

                        <a className={styles.txt} href={link}>
                            {hashString}
                        </a>
                        <br />
                        <div className={styles.txt}>{`Status: ${transactionStatus.status}`}</div>
                    </div>
                );
            default:
                return <div></div>;
        }
    };

    return <div>{renderTransactionStatus()}</div>;
}

export default TransactionStatus;
