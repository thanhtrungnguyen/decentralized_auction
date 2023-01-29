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
import WaitingForAuctionTime from "./WaitingForAuctionTime";
import TransactionStatus from "../components/TransactionStatus";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/blockchainConfig";
import Loader from "../components/Loader";
import { parseEther, parseWei } from "../../../utils/ethereumUnitConverter";
import { getBidderState } from "../../../utils/getBidderState";
import { useAxios } from "../../../hooks/useAxios";

function AuctionRegistration({ auction, property }) {
    const { account, isWeb3Enabled } = useMoralis();
    const [transactionStatus, setTransactionStatus] = useState();
    const [bidderState, setBidderState] = useState(false);
    const dispatch = useNotification();

    const updateUI = async () => {
        setTransactionStatus();
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
            updateUI();
        }
    }, [isWeb3Enabled, account, bidInformationData?.length]);

    const handleSuccess = async (tx) => {
        try {
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            // eslint-disable-next-line react-hooks/rules-of-hooks
            // const { loading, data, error } = usePostRequest(`/api/auctionRegistration/${auction.auctionId}/registration`, {
            //     walletAddress: account,
            // });
            await tx.wait(1);
            setTransactionStatus({ hash: tx.hash, status: "Completed" });
            updateUI();
            dispatch({
                type: "success",
                title: "Registration Notification",
                message: "Registration Completed!",
                position: "topR",
                icon: <BsCheckLg />,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleError = () => {
        setTransactionStatus({ status: "Failed" });
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
                            disabled={isRegisterToBidFetching || isRegisterToBidLoading}
                            className={styles.btn}
                            onClick={async () =>
                                await registerToBid({
                                    onSuccess: handleSuccess,
                                    onError: handleError,
                                })
                            }
                        >
                            {isRegisterToBidFetching || isRegisterToBidLoading ? <div>Loading...</div> : <div>Register for auction</div>}
                        </button>
                    </>
                );
            case "BIDDING":
                return <p className={styles.title}>You have Registered The Auction</p>;
            default:
                return <Loader />;
        }
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <WaitingForAuctionTime auction={auction} property={property} />;
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
