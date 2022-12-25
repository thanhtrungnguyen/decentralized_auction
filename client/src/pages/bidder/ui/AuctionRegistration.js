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
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../config/configuration";

function AuctionRegistration({ auction }) {
    const { account, isWeb3Enabled } = useMoralis();
    const dispatch = useNotification();
    const [bidInformation, setBidInformation] = useState();
    const [transactionStatus, setTransactionStatus] = useState();
    const [isRegisteredBidder, setRegisteredBidder] = useState();

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled, account]);

    const amount =
        auction.registrationFee != null && auction.depositAmount != null
            ? ethers.utils.parseUnits(new Decimal(auction.registrationFee).plus(auction.depositAmount).toString(), "ether").toString()
            : "0";

    const { runContractFunction: getBidInformationByAuctionId } = useWeb3Contract({
        abi: CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getBidInformationByAuctionId",
        params: { auctionId: auction.auctionId },
    });

    const {
        runContractFunction: registerToBid,
        data,
        error,
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
        setBidInformation(await getBidInformationByAuctionId());

        checkRegisteredBidder();
    };

    const checkRegisteredBidder = () => {
        bidInformation.forEach((element) => {
            if (element.bidder.toUpperCase() === account.toUpperCase()) {
                setRegisteredBidder(true);
            }
        });
    };

    if (error) console.log(error);
    console.log();

    const handleSuccess = async (tx) => {
        try {
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);

            updateUI();
            setTransactionStatus({ hash: tx.hash, status: "Completed" });
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
    const handleComplete = async (hash) => {
        console.log(hash);
        // setTransactionStatus({ hash: hash, status: "waitingForConfirmation" });
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
            return <WaitingForAuctionTime auction={auction} />;
        } else {
            return (
                <div>
                    <div>
                        <p className={styles.txtBlack}>Auction Registration </p>
                        <p className={styles.txt}>You have selected:</p>\
                        <div>
                            <div className={styles.info}>
                                {/* <BiddingProperty auction={auction} property={property} /> */}
                                <BiddingProperty />
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
                                <p className={styles.txtT}>
                                    Total amount you must to pay:
                                    {auction.registrationFee != null && auction.depositAmount != null
                                        ? new Decimal(auction.registrationFee).plus(auction.depositAmount).toString()
                                        : "0"}{" "}
                                    ETH
                                </p>
                                {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                                {/* <label className={styles.mess}>message</label> */}

                                {isRegisteredBidder ? (
                                    <button
                                        disabled={isRegisteredBidder || isLoading || isFetching}
                                        className={styles.btn}
                                        onClick={async () =>
                                            await registerToBid({
                                                onSuccess: handleSuccess,
                                                onError: handleErrorNotification,
                                                onComplete: handleComplete,
                                            })
                                        }
                                    >
                                        {isLoading || isFetching ? <div>Loading...</div> : <div>Register for auction</div>}
                                    </button>
                                ) : (
                                    <>You have Registered The Auction</>
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
