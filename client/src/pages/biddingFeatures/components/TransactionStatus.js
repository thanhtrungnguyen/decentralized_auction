import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

function TransactionStatus({ transactionStatus: tx }) {
    const prefix = "https://goerli.etherscan.io/tx/";
    if (tx) {
        console.log(tx);
    }
    const hashString = tx?.transactionHash
        ? `Tx: ${tx?.transactionHash?.slice(0, 6)}...${tx?.transactionHash?.slice(tx?.transactionHash?.length - 4)}`
        : tx?.hash
        ? `Tx: ${tx?.hash?.slice(0, 6)}...${tx?.hash?.slice(tx?.hash?.length - 4)}`
        : ``;
    const link = `${prefix}${tx?.transactionHash}`;

    const transactionStatusType = () => {
        if (tx?.code === 4001) {
            return "Reject";
        }
        if (tx?.confirmations === 0) return "Pending";
        if (tx?.confirmations !== 0) {
            if (tx?.events) return "Success";
            return "Fail";
        }
        if (tx == null) return "NoTx";
    };

    const renderTransactionStatus = () => {
        switch (transactionStatusType()) {
            case "NoTx":
                return <div></div>;
            case "Fail":
                return <div>Transaction Failed</div>;
            case "Pending": {
                return <>Transaction Submitted</>;
            }
            case "Reject": {
                return <>Transaction Rejected</>;
            }
            case "Success":
                return <p>Transaction Successfully!</p>;
            default:
                return <div></div>;
        }
    };

    return (
        <div>
            {hashString && (
                <div>
                    <br />
                    <a className={styles.txt} href={link}>
                        {hashString}
                    </a>
                    <br />
                </div>
            )}
            <p className={styles.txt}>{renderTransactionStatus()}</p>
        </div>
    );
}

export default TransactionStatus;
