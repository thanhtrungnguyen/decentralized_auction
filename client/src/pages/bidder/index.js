import React from "react";
import styles from "../../styleCss/stylesComponents/placeABid.module.css";
import HeaderBid from "./components/HeaderBid";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";

import AuctionRegistration from "./ui/AuctionRegistration";
import PlaceBid from "./ui/PlaceBid";
import NotYetRegistrationTime from "./ui/NotYetRegistrationTime";
import WaitingForAuctionTime from "./ui/WaitingForAuctionTime";
import Loading from "./components/Loader";
import { SUPPORT_CHAINS, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } from "../../config/configuration";
import AuctionResult from "./ui/AuctionResult";

const BidModal = ({ closeModal, loading, auction, propertyId }) => {
    const [hasMetamask, setHasMetamask] = useState(false);
    const { chainId, isWeb3Enabled } = useMoralis();
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    });

    const auctionState = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (auction) {
            if (loading) return "Loading";
            if (currentTimestamp < auction.startRegistrationTime) return "NotYetRegistrationTime";
            if (auction.startRegistrationTime < currentTimestamp && currentTimestamp < auction.endRegistrationTime) return "RegistrationTime";
            if (auction.endRegistrationTime < currentTimestamp && currentTimestamp < auction.startAuctionTime) return "WaitingAuctionTime";
            if (auction.startAuctionTime < currentTimestamp && currentTimestamp < auction.endAuctionTime) return "AuctionTime";
            if (auction.endAuctionTime < currentTimestamp && currentTimestamp < auction.duePaymentTime) return "PaymentTime";
            if (auction.duePaymentTime < currentTimestamp) return "AuctionEnded";
        }
        return null;
    };

    const renderCurrentState = () => {
        switch (auctionState()) {
            case "Loading":
                return <Loading />;
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
                // return <h2>PaymentTime</h2>;
                return <AuctionResult auction={auction} />;
            case "AuctionEnded":
                return <h2>Auction Ended</h2>;
            default:
                return "Auction Not Found";
        }
    };
    return (
        <div className={styles.container}>
            <HeaderBid closeModal={closeModal} />
            <div>
                {hasMetamask ? (
                    isWeb3Enabled ? (
                        <div>
                            {SUPPORT_CHAINS.includes(parseInt(chainId).toString()) ? (
                                <div>{renderCurrentState()}</div>
                            ) : (
                                <div>
                                    <h1>Unsupported Chain ID</h1>
                                    <p>Please switch to Supported Chains that is Goerli (Ethereum Testnet)</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Please connect to a Wallet</p>
                    )
                ) : (
                    <p>Please install Metamask</p>
                )}
            </div>
        </div>
    );
};

export default BidModal;
