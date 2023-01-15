import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import Decimal from "decimal.js";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import BiddingProperty from "../components/BiddingProperty";
import { useEffect, useState } from "react";
import WaitingForAuctionTime from "./WaitingForAuctionTime";
import TransactionStatus from "../components/TransactionStatus";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/blockchainConfig";
import { useFetchData } from "../../../hook/useFetch";
import Loader from "../components/Loader";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

function AuctionRegistration({ auction, propertyObject }) {
    const { account, isWeb3Enabled } = useMoralis();
    const dispatch = useNotification();
    // const [bidInformation, setBidInformation] = useState();
    const [transactionStatus, setTransactionStatus] = useState();
    const [isRegisteredBidder, setRegisteredBidder] = useState(false);
    const [isLoadingInfo, setLoadingInfo] = useState(true);
    const baseURL = `http://localhost:8800/api/auctionInformation/${auction.auctionId}/registered`;
    const { loading, data: registeredBid, error } = useFetchData(baseURL);
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled, account, isRegisteredBidder, loading, registeredBid]);

    const amount =
        auction.registrationFee != null && auction.depositAmount != null
            ? ethers.utils.parseUnits(new Decimal(auction.registrationFee).plus(auction.depositAmount).toString(), "ether").toString()
            : "0";

    const {
        runContractFunction: registerToBid,
        data,
        error: errorRegisterToBid,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "registerToBid",
        msgValue: amount,
        params: { auctionId: auction.auctionId },
    });
    const updateUI = async () => {
        // setBidInformation(await getBidInformationByAuctionId());
        await checkRegisteredBidder();
        setLoadingInfo(false);
        // setRegisteredBidder(true);
    };

    const checkRegisteredBidder = async () => {
        if (!registeredBid) return;
        await registeredBid.forEach((element) => {
            if (element.bidder.toUpperCase() === account.toUpperCase()) {
                setRegisteredBidder(true);
            }
        });
        // setRegisteredBidder(false);
    };

    const getUser = () => {
        var users = null;
        const token = Cookies.get("access_token");
        if (!token) {
            console.log("Not authenticated");
        }
        jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
            users = user;
        });
        return users;
    };
    const createAuctionRegistration = () => {
        const postUrl = "http://localhost:8800/api/auctionInformation/auctionRegistration";
        const auctionRegistration = { auctionId: auction.auctionId, bidderId: getUser().userName, wallet: account };
        axios
            .post(postUrl, auctionRegistration)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSuccess = async (tx) => {
        try {
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);
            setTransactionStatus({ hash: tx.hash, status: "Completed" });
            updateUI();
            setRegisteredBidder(true);
            createAuctionRegistration();
            handleSuccessNotification(tx);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSuccessNotification = () => {
        dispatch({
            type: "success",
            title: "Registration Notification",
            message: "Registration Completed!",
            position: "topR",
            icon: <BsCheckLg />,
        });
    };
    const handleErrorNotification = () => {
        setTransactionStatus({ status: "Failed" });
        dispatch({
            type: "error",
            title: "Registration Error",
            message: "Registration Failed!",
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <WaitingForAuctionTime auction={auction} propertyObject={propertyObject} />;
        } else {
            return (
                <div>
                    <div>
                        <p className={styles.txtBlack}>Auction Registration </p>
                        <p className={styles.txt}>You have selected:</p>\
                        <div>
                            <div className={styles.info}>
                                {/* <BiddingProperty auction={auction} property={property} /> */}
                                <BiddingProperty propertyObject={propertyObject} />
                                <p className={styles.txtM}>Starting bid:</p>
                                <p className={styles.txtNormal}>{auction.startBid}</p>
                                {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                                <p className={styles.txtM}>Registration ends in:</p>
                                <p className={styles.txtNormal}>
                                    <span>
                                        {days}d {hours}h {minutes}m {seconds}s
                                    </span>
                                </p>
                            </div>
                            <div className={styles.detail}>
                                {/* <form> */}
                                <p className={styles.title}>Registration details:</p>
                                <p className={styles.txtT}>Registration Fee: {auction.registrationFee} ETH</p>
                                <p className={styles.txtT}>Deposit Amount: {auction.depositAmount} ETH</p>

                                {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                                {/* <label className={styles.mess}>message</label> */}
                                {isLoadingInfo ? (
                                    <Loader />
                                ) : !isRegisteredBidder ? (
                                    <>
                                        <p className={styles.txtT}>
                                            Total amount you must to pay:
                                            {auction.registrationFee != null && auction.depositAmount != null
                                                ? new Decimal(auction.registrationFee).plus(auction.depositAmount).toString()
                                                : "0"}
                                            ETH
                                        </p>
                                        <button
                                            disabled={isRegisteredBidder || isLoading || isFetching}
                                            className={styles.btn}
                                            onClick={async () =>
                                                await registerToBid({
                                                    onSuccess: handleSuccess,
                                                    onError: handleErrorNotification,
                                                })
                                            }
                                        >
                                            {isLoading || isFetching ? <div>Loading...</div> : <div>Register for auction</div>}
                                        </button>
                                    </>
                                ) : (
                                    <p className={styles.title}>You have Registered The Auction</p>
                                )}

                                <TransactionStatus transactionStatus={transactionStatus} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return <Countdown date={auction.endRegistrationTime * 1000} renderer={renderer} />;
}

export default AuctionRegistration;
