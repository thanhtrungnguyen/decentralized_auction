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
import { SUPPORT_CHAINS, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } from "../../config/blockchainConfig";
import AuctionResult from "./ui/auctionResult/AuctionResult";
import { useFetchBidding } from "../../hooks/useFetch";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const BidModal = ({ setOpenModal, auction, auctionRegistration, property }) => {
    const { chainId, isWeb3Enabled, account } = useMoralis();
    const [hasMetamask, setHasMetamask] = useState(false);
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    }, [isWeb3Enabled, account]);
    // const checkUserRegistered = () => {
    //     let wallet;
    //     auctionRegistration?.map((element) => {
    //         if (element.bidderId == getUser().id) {
    //             wallet = element.wallet;
    //         }
    //     });
    //     return wallet;
    // };
    const auctionState = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        // const registeredWallet = checkUserRegistered();
        // console.log(checkUserRegistered());
        // debugger;
        if (!auction) return "AuctionNotFound";
        if (currentTimestamp < auction.startRegistrationTime) return "NotYetRegistrationTime";
        // if (registeredWallet != null && registeredWallet != account) {
        //     return "RegisteredWithOtherWallet";
        // }
        if (auction.startRegistrationTime < currentTimestamp && currentTimestamp < auction.endRegistrationTime) return "RegistrationTime";
        if (auction.endRegistrationTime < currentTimestamp) {
            // if (registeredWallet == account) {
            if (auction.endRegistrationTime < currentTimestamp && currentTimestamp < auction.startAuctionTime) return "WaitingAuctionTime";
            if (auction.startAuctionTime < currentTimestamp && currentTimestamp < auction.endAuctionTime) return "AuctionTime";
            if (auction.endAuctionTime < currentTimestamp && currentTimestamp < auction.duePaymentTime) return "PaymentTime";
            if (auction.duePaymentTime < currentTimestamp) return "AuctionEnded";
            // }
            return "NotRegistered";
        }
        return null;
    };

    const renderCurrentState = () => {
        // console.log("State: " + auctionState());
        switch (auctionState()) {
            case "Loading":
                return <Loading />;
            case "NotYetRegistrationTime":
                return <NotYetRegistrationTime auction={auction} property={property} />;
            case "RegistrationTime":
                // return <AuctionRegistration auction={auction} property={property} />;
                return <AuctionRegistration auction={auction} property={property} />;
            case "WaitingAuctionTime":
                return <WaitingForAuctionTime auction={auction} property={property} />;
            case "AuctionTime":
                return <PlaceBid auction={auction} property={property} />;
            case "PaymentTime":
                // return <h2>PaymentTime</h2>;
                return <AuctionResult auction={auction} property={property} />;
            case "AuctionEnded":
                return <h2>Auction Ended</h2>;
            case "NotRegistered":
                return (
                    <>
                        <h1>Bidders only</h1>
                        <p>Registration Time has ended</p>
                    </>
                );
            case "RegisteredWithOtherWallet":
                return (
                    <div>
                        <h1>You have registered the auction with other account</h1>
                        {/* <strong>{checkUserRegistered()}</strong> */}
                    </div>
                );
            case "AuctionNotFound":
                return "Auction Not Found";
            default:
                return "???????";
        }
    };
    // console.log("checkUserRegistered()", checkUserRegistered());
    return (
        <div className={styles.container}>
            <HeaderBid setOpenModal={setOpenModal} />
            <div>
                {hasMetamask ? (
                    isWeb3Enabled ? (
                        SUPPORT_CHAINS.includes(parseInt(chainId).toString()) ? (
                            <div>{renderCurrentState()}</div>
                        ) : (
                            <div>
                                <h1>Unsupported Chain ID</h1>
                                <p>Please switch to Supported Chains that is Goerli (Ethereum Testnet)</p>
                            </div>
                        )
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
