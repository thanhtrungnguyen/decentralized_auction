import React from "react";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";
const AuctionResult = ({ auction }) => {
    const { address } = useMoralis();
    console.log(address);
    return <div>AuctionResult</div>;
};

export default AuctionResult;
