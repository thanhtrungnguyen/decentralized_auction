import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

function TransactionStatus({ transactionStatus: tx }) {
    console.log(tx);
    const prefix = "https://goerli.etherscan.io/tx/";
    const hashString = tx?.transactionHash
        ? `Tx: ${tx?.transactionHash?.slice(0, 6)}...${tx?.transactionHash?.slice(tx?.transactionHash?.length - 4)}`
        : null;
    const link = `${prefix}${tx?.transactionHash}`;

    const transactionStatusType = () => {
        if (tx?.code === 4001) {
            return "Reject";
        }
        if (tx?.confirmations === 0) return "Pending";
        if (tx?.confirmations === 1) {
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
                return <>Transaction Pending</>;
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
            {renderTransactionStatus()}
        </div>
    );
}

export default TransactionStatus;
