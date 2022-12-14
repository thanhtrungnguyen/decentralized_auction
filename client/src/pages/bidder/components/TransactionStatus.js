import React from "react";
import { Link } from "react-router-dom";
import { LinkTo } from "web3uikit";

function TransactionStatus({ transactionStatus }) {
    const prefix = "https://goerli.etherscan.io/tx/";
    // const txtHash = transactionStatus.hash
    //     ? `${transactionStatus.hash.slice(0, 6)}...${transactionStatus.hash.slice(transactionStatus.hash.length - 4)}`
    //     : "";
    const txtHash = `${transactionStatus.hash.slice(0, 6)}...${transactionStatus.hash.slice(transactionStatus.hash.length - 4)}`;
    return (
        <div>
            <Link to={`${prefix}${transactionStatus.hash}`}>{`Tx: ${txtHash}`}</Link>
            <div>{`Status: ${transactionStatus.status}`}</div>
        </div>
    );
}

export default TransactionStatus;
