import React from "react";
import styles from "../../styleCss/stylesComponents/placeABid.module.css";
import HeaderBid from "./components/HeaderBid";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";

import AuctionRegistration from "./ui/AuctionRegistration";
import PlaceBid from "./ui/PlaceBid";
import NotYetRegistrationTime from "./ui/NotYetRegistrationTime";
import WaitingForAuctionTime from "./ui/WaitingForAuctionTime";

const BidModal = ({ closeModal, auction, propertyId }) => {
    const supportedChains = ["5"];
    const [hasMetamask, setHasMetamask] = useState(false);
    const { chainId, isWeb3Enabled } = useMoralis();

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    });

    const auctionState = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (auction == []) return "Loading";
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
            case "Loading":
                return <h2>Loading...</h2>;
            case "NotYetRegistrationTime":
                return <NotYetRegistrationTime auction={auction} />;
            case "RegistrationTime":
                // return <AuctionRegistration auction={auction} property={property} />;
                return <AuctionRegistration auction={auction} />;
            case "WaitingAuctionTime":
                return <WaitingForAuctionTime auction={auction} />;
            case "AuctionTime":
                return <PlaceBid auction={auction} property={propertyId} />;
            case "PaymentTime":
                return <h2>PaymentTime</h2>;
            case "AuctionEnded":
                return <h2>Auction Ended</h2>;
            default:
                return "Auction Not Found";
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
