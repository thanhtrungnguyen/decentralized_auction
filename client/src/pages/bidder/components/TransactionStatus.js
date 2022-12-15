import React from "react";
import { LinkTo } from "web3uikit";

function TransactionStatus({ transactionStatus }) {
    const prefix = "https://goerli.etherscan.io/tx/";
    const txtHash = `${transactionStatus.hash.slice(0, 6)}...${transactionStatus.hash.slice(transactionStatus.hash.length - 4)}`;
    return (
        <div>
            <LinkTo address={`${prefix}${transactionStatus.hash}`} iconLayout="leading" type="external" text={`Tx: ${txtHash}`} />
            <div>{`Status: ${transactionStatus.status}`}</div>
        </div>
    );
}

export default TransactionStatus;
