/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Countdown from "react-countdown";
import Decimal from "decimal.js";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import BiddingProperty from "../components/BiddingProperty";
import { useEffect, useState } from "react";
import TransactionStatus from "../components/TransactionStatus";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/blockchainConfig";
import Loader from "../components/Loader";
import { parseEther, parseWei } from "../../../utils/ethereumUnitConverter";
import { getBidderState } from "../../../utils/getBidderState";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CheckRegistration from "./CheckRegistration";

function AuctionRegistration({ auction, property }) {
    const { account, isWeb3Enabled } = useMoralis();
    const [transactionStatus, setTransactionStatus] = useState();
    const [bidderState, setBidderState] = useState(false);
    const [isWaiting, setWaiting] = useState();
    const dispatch = useNotification();

    const updateUI = async () => {
        setBidderState();
        await getBidInformationByAuctionId();
        setBidderState(getBidderState(bidInformationData, account));
    };

    const amount =
        auction.registrationFee != null && auction.depositAmount != null
            ? parseWei(new Decimal(auction.registrationFee).plus(auction.depositAmount).toString(), "ether")
            : "0";

    const {
        runContractFunction: getBidInformationByAuctionId,
        data: bidInformationData,
        error: bidInformationError,
        isFetching: isBidInformationFetching,
        isLoading: isBidInformationLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getBidInformationByAuctionId",
        params: { auctionId: auction.auctionId },
    });

    const {
        runContractFunction: registerToBid,
        data: registerToBidData,
        error: errorRegisterToBid,
        isFetching: isRegisterToBidFetching,
        isLoading: isRegisterToBidLoading,
    } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "registerToBid",
        msgValue: amount,
        params: { auctionId: auction.auctionId },
    });

    useEffect(() => {
        if (isWeb3Enabled) {
            setTransactionStatus("null");
            updateUI();
        }
    }, [isWeb3Enabled, account, bidInformationData?.length]);

    const axios = useAxiosPrivate();

    const handleSuccess = async (tx) => {
        console.log(tx);
        setWaiting(true);
        setTransactionStatus(tx);

        axios
            .post(`/auctionRegistration/${auction.auctionId}/registration`, {
                walletAddress: account,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        const result = await tx.wait(1);
        console.log(result);
        setTransactionStatus(result);
        updateUI();
        dispatch({
            type: "success",
            title: "Registration Notification",
            message: "Registration Completed!",
            position: "topR",
            icon: <BsCheckLg />,
        });
        setWaiting(false);
    };

    const handleError = () => {
        setTransactionStatus("null");
        dispatch({
            type: "error",
            title: "Registration Error",
            message: "Registration Failed!",
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    const renderCurrentBidderState = () => {
        switch (bidderState) {
            case "NOT_REGISTERED":
                return (
                    <>
                        <p className={styles.txtT}>
                            Total amount you must to pay:
                            {parseEther(amount)}
                            ETH
                        </p>
                        {/* <button
                            disabled={isRegisterToBidFetching || isRegisterToBidLoading}
                            className={styles.btn}
                            onClick={async () =>
                                await registerToBid({
                                    onSuccess: handleSuccess,
                                    onError: handleError,
                                })
                            }
                        >
                            {loading ? <div>Loading...</div> : <div>Register for auction</div>}
                        </button> */}
                        <button
                            disabled={isRegisterToBidFetching || isRegisterToBidLoading | isWaiting}
                            className={styles.btn}
                            onClick={async () =>
                                await registerToBid({
                                    onSuccess: handleSuccess,
                                    onError: handleError,
                                })
                            }
                        >
                            {isRegisterToBidFetching || isRegisterToBidLoading ? (
                                <div>Waiting for Confirmation...</div>
                            ) : (
                                <div>Register for auction</div>
                            )}
                        </button>
                        <TransactionStatus transactionStatus={transactionStatus} />
                    </>
                );
            case "BIDDING":
                return (
                    <>
                        <TransactionStatus transactionStatus={transactionStatus} />
                        <p className={styles.title}>You have Registered The Auction</p>
                    </>
                );
            default:
                return <Loader />;
        }
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <CheckRegistration auction={auction} property={property} />;
        } else {
            return (
                <div>
                    <div>
                        <p className={styles.txtBlack}>Auction Registration </p>
                        <p className={styles.txt}>You have selected:</p>\
                        <div>
                            <div className={styles.info}>
                                <BiddingProperty property={property} />
                                <p className={styles.txtM}>Starting bid:</p>
                                <p className={styles.txtNormal}>{auction.startBid}</p>
                                <p className={styles.txtM}>Registration ends in:</p>
                                <p className={styles.txtNormal}>
                                    <span>
                                        {days}d {hours}h {minutes}m {seconds}s
                                    </span>
                                </p>
                            </div>
                            <div className={styles.detail}>
                                <p className={styles.title}>Registration details:</p>
                                <p className={styles.txtT}>Registration Fee: {auction.registrationFee} ETH</p>
                                <p className={styles.txtT}>Deposit Amount: {auction.depositAmount} ETH</p>
                                {renderCurrentBidderState()}
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
