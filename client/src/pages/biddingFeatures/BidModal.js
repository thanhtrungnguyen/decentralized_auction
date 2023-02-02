import React from "react";
import HeaderBid from "./components/HeaderBid";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";

import AuctionRegistration from "./ui/AuctionRegistration";
import PlaceBid from "./ui/PlaceBid";
import NotYetRegistrationTime from "./ui/NotYetRegistrationTime";
import WaitingForAuctionTime from "./ui/WaitingForAuctionTime";
import Loading from "./components/Loader";
import { SUPPORT_CHAINS } from "../../config/blockchainConfig";
import AuctionResult from "./ui/auctionResult/AuctionResult";
import { useFetchData } from "../../hooks/useFetch";
import Loader from "./components/Loader";
import styles from "../../styleCss/stylesComponents/placeABid.module.css";

const BidModal = ({ setOpenModal, auction, auctionRegistration, property }) => {
    const { chainId, isWeb3Enabled, account } = useMoralis();
    const [hasMetamask, setHasMetamask] = useState(false);
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setHasMetamask(true);
        }
    }, [isWeb3Enabled, account]);
    const { loading, data, error } = useFetchData(`/auctionRegistration/user/${auction?.auctionId}`);
    const auctionState = () => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (!auction) return "AuctionNotFound";
        if (currentTimestamp < auction.startRegistrationTime) return "NotYetRegistrationTime";
        if (auction.startRegistrationTime < currentTimestamp && currentTimestamp < auction.endRegistrationTime) return "RegistrationTime";
        if (auction.endRegistrationTime < currentTimestamp && currentTimestamp < auction.startAuctionTime) return "WaitingAuctionTime";
        if (auction.startAuctionTime < currentTimestamp && currentTimestamp < auction.endAuctionTime) return "AuctionTime";
        if (auction.endAuctionTime < currentTimestamp && currentTimestamp < auction.duePaymentTime) return "PaymentTime";
        if (auction.duePaymentTime < currentTimestamp) return "AuctionEnded";
        return null;
    };

    const renderCurrentState = () => {
        try {
            if (!data)
                return (
                    <div className={styles.notification}>
                        <Loader />
                    </div>
                );
            if (data?.auctionRegistration?.length !== 0 && data?.auctionRegistration[0]?.walletAddress !== account) {
                return (
                    <div className={styles.notification}>
                        <p>You have used account {data?.auctionRegistration[0]?.walletAddress} for register the auction.</p>
                        <p>Please switch to that wallet account to continue.</p>
                    </div>
                );
            }
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
                case "AuctionNotFound":
                    return "Auction Not Found";
                default:
                    return "???????";
            }
        } catch (error) {
            console.log(error);
        }
    };
    // console.log("checkUserRegistered()", checkUserRegistered());
    return (
        <>
            <div className={styles.root}></div>
            <div className={styles.container}>
                <HeaderBid setOpenModal={setOpenModal} />
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        {hasMetamask ? (
                            isWeb3Enabled ? (
                                SUPPORT_CHAINS.includes(parseInt(chainId).toString()) ? (
                                    <div>{renderCurrentState()}</div>
                                ) : (
                                    <div className={styles.notification}>
                                        <h1>Unsupported Chain ID</h1>
                                        <p>Please switch to Supported Chains that is Goerli (Ethereum Testnet)</p>
                                    </div>
                                )
                            ) : (
                                <div className={styles.notification}>
                                    <p>Please connect to a Wallet</p>
                                </div>
                            )
                        ) : (
                            <div className={styles.notification}>
                                <p>Please install Metamask</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default BidModal;
