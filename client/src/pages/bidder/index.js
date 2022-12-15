import React from "react";
import styles from "../../styleCss/stylesComponents/placeABid.module.css";
import ConfirmPayment from "./ui/ConfirmPayment";
import { Outlet, Link } from "react-router-dom";
// import { Button } from "@web3uikit/core"
import { ConnectButton } from "web3uikit";
import HeaderBid from "./components/HeaderBid";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useState, useEffect } from "react";
import auctionAbi from "../../constants/abi.json";
import contractAddresses from "../../constants/contractAddress.json";
import AuctionRegistration from "./ui/AuctionRegistration";
import PlaceBid from "./ui/PlaceBid";
import NotYetRegistrationTime from "./ui/NotYetRegistrationTime";
import WaitingForAuctionTime from "./ui/WaitingForAuctionTime";
import axios from "axios";

const BidModal = ({ closeModal, auction: auctionId, property }) => {
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}`;
    const [auction, setAuction] = useState([]);
    const supportedChains = ["5"];
    const [hasMetamask, setHasMetamask] = useState(false);
    const { enableWeb3, chainId, isWeb3Enabled } = useMoralis();
    console.log(auction);
    // const { runContractFunction, data, error, isFetching, isLoading } = useWeb3Contract({
    //     abi: auctionAbi,
    //     contractAddress: "0xe3417CF4716Ae7F66F063f03c38D0Bc27DED9AdC", // your contract address here
    //     functionName: "getAuctionInformationById",
    //     params: { auctionId: "89hg348e3d35gj" },
    // });
    // console.log(data);

    console.log(auctionId);
    useEffect(() => {
        axios
            .get(baseURL)
            .then((res) => {
                setAuction(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    });

    const auctionState = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp < auction.startRegistrationTime) return "NotYetRegistrationTime";
        if (auction.startRegistrationTime < currentTimestamp && currentTimestamp < auction.endRegistrationTime) return "RegistrationTime";
        if (auction.endRegistrationTime < currentTimestamp && currentTimestamp < auction.startAuctionTime) return "WaitingAuctionTime";
        if (auction.startAuctionTime < currentTimestamp && currentTimestamp < auction.endAuctionTime) return "AuctionTime";
        if (auction.endAuctionTime < currentTimestamp && currentTimestamp < auction.duePaymentTime) return "PaymentTime";
        if (auction.duePaymentTime < currentTimestamp) return "AuctionEnded";
        return null;
    };

    const renderCurrentState = () => {
        switch (auctionState()) {
            case "NotYetRegistrationTime":
                return <NotYetRegistrationTime auction={auction} />;
            case "RegistrationTime":
                return <AuctionRegistration auction={auction} property={property} />;
            case "WaitingAuctionTime":
                return <WaitingForAuctionTime auction={auction} />;
            case "AuctionTime":
                return <PlaceBid auction={auction} property={property} />;
            case "PaymentTime":
                return <h2>PaymentTime</h2>;
            case "AuctionEnded":
                return <h2>Auction Ended</h2>;
            default:
                return "Auction Not Found ";
        }
    };
    return (
        <div className={styles.container}>
            <HeaderBid closeModal={closeModal} />
            <div>{hasMetamask ? isWeb3Enabled ? <p></p> : <p></p> : "Please install Metamask"}</div>
            {isWeb3Enabled ? (
                <div>
                    {supportedChains.includes(parseInt(chainId).toString()) ? (
                        <div>{renderCurrentState()}</div>
                    ) : (
                        <div>
                            <h1>Unsupported Chain ID</h1>
                            <p>Please switch to Supported Chains that is Goerli (Ethereum Testnet)</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>Please connect to a Wallet</div>
            )}
        </div>
    );
};

export default BidModal;
