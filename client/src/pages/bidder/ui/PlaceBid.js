import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { Outlet, Link } from "react-router-dom";
import { Button, Input, ConnectButton, useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";
import HeaderBid from "../components/HeaderBid";
import auctionAbi from "../../../constants/abi.json";
import contractAddresses from "../../../constants/contractAddress.json";
import Moralis from "moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import TransactionStatus from "../components/TransactionStatus";
function PlaceBid({ auction }) {
    const { auctionId } = useParams() || "null";
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}/placedBid`;

    // const [openModal, setOpenModal] = useState(() => {
    //     return false;
    // });

    const [placedBid, setPlacedBid] = useState(() => {
        return [];
    });
    const [highestBid, setHighestBid] = useState(() => {
        return "0";
    });
    const [inputBidAmount, setInputBidAmount] = useState(() => {
        return "0";
    });
    const [transactionStatus, setTransactionStatus] = useState(() => {
        return undefined;
    });

    const inputRef = useRef("0");

    useEffect(() => {
        axios
            .get(baseURL)
            .then((res) => {
                setPlacedBid(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);
    // console.log(chainId);
    // const chainId = 31337;
    const dispatch = useNotification();

    // const auctionContractAddress = chainId in contractAddresses ? contractAddresses[31337][0] : null;
    const auctionContractAddress = contractAddresses[chainId][0] ?? null;
    // console.log(auctionContractAddress);

    const [auctionInformation, setAuctionInformation] = useState(() => {
        return [];
    });

    const getHighestBid = () => {
        const highest = 0;
        placedBid.forEach((element) => {
            if (element.bidAmount > highest) {
                highest = element.bidAmount;
            }
        });
        setHighestBid(highest);
    };
    // getHighestBid();

    const {
        runContractFunction: placeBid,
        data,
        error,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: auctionAbi,
        contractAddress: auctionContractAddress, // your contract address here
        functionName: "placeBid",
        msgValue: "0",
        params: {
            auctionId: auction.auctionId,
            bidAmount: ethers.utils.parseEther(inputBidAmount.toString() || "0").toString(),
        },
    });
    if (data) console.log(data);
    if (error) console.log(error);

    // const { runContractFunction: getAuctionInformationById } = useWeb3Contract({
    //     abi: auctionAbi,
    //     contractAddress: auctionContractAddress,
    //     functionName: "getAuctionInformationById",
    //     params: { auctionId: "12a" },
    // });
    // const updateUIValues = async () => {
    //     const auctionInformation = await getAuctionInformationById();
    // };
    useEffect(() => {
        if (isWeb3Enabled) {
            // updateUIValues();
        }
    }, [isWeb3Enabled]);
    const handleSuccess = async (tx) => {
        try {
            console.log("handleSuccess " + tx.hash);
            setTransactionStatus({ hash: tx.hash, status: "Waiting For Confirmation..." });
            await tx.wait(1);

            // updateUIValues();
            setTransactionStatus({ hash: tx.hash, status: "Completed" });

            handleSuccessNotification();
        } catch (error) {
            console.log(error);
        }
    };
    const handleComplete = async (hash) => {
        console.log(hash);
        // setTransactionStatus({ hash: hash, status: "waitingForConfirmation" });
    };
    const handleSuccessNotification = () => {
        dispatch({
            type: "success",
            title: "Place Bid Notification",
            message: "Place Bid Completed!",
            position: "topR",
            icon: <BsCheckLg />,
        });
    };

    const handleClick = async () => {
        await setInputBidAmount(inputRef.current.value);
        console.log(inputBidAmount);
        await placeBid({
            onError: handleErrorNotification,
            onSuccess: handleSuccess,
            onComplete: handleComplete,
        });
    };

    const handleErrorNotification = (tx) => {
        console.log("handleErrorNotification " + tx);
        setTransactionStatus({ status: "Failed" });
        dispatch({
            type: "error",
            title: "Place Bid Error",
            message: "Place Bid Failed!",
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    return (
        <div>
            <div>
                <p className={styles.txtBlack}>Place a Bid </p>
                <p className={styles.txt}>You have selected:</p>\
                <div>
                    <div className={styles.info}>
                        {/* <img className={styles.img} src={sendAuction.MediaURL[0]} alt="images" /> */}
                        <img className={styles.img} src="https://static.vecteezy.com/packs/media/photos/term-bg-3-f6a12264.jpg" alt="images" />
                        {/* <p className={styles.title}>{sendAuction.PropertyName}</p> */}
                        <p className={styles.title}>PropertyName PropertyName PropertyName PropertyName</p>
                        <p className={styles.txtM}>Starting bid:</p>
                        <p className={styles.txtNormal}>{auction.startBid}</p>
                        <p className={styles.txtM}>Current bid:</p>
                        <p className={styles.txtNormal}>{highestBid} ETH</p>
                        {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                        <p className={styles.txtM}>Auction ends in:</p>
                        <p className={styles.txtNormal}>
                            <Countdown date={auction.endAuctionTime * 1000} />
                        </p>
                    </div>
                    <div className={styles.detail}>
                        {/* <form> */}
                        <p className={styles.title}>Place bid details:</p>
                        {/* <p className={styles.txtT}>Your bid must be at least 6969 ETH</p>
                        {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                        {/* <input className={styles.input} type="text"></input> */}
                        <Input
                            className={styles.input}
                            label="Your bid must be at least 6969 ETH"
                            placeholder=""
                            type="number"
                            // ref={inputRef}
                            value={inputBidAmount}
                            errorMessage="Your name must contain your name"
                            validation={{
                                max: "",
                                min: 1,
                            }}
                            onChange={(event) => {
                                setInputBidAmount(event.target.value);
                            }}
                        />
                        <label className={styles.mess}>message</label>
                        <br />
                        <br />
                        {/* <input
                className={styles.btn}
                type="submit"
                value="Place bid"
              ></input> */}
                        <Button
                            disabled={isLoading || isFetching}
                            // {isLoading || isFetching}
                            // {isLoading}
                            customize={{
                                backgroundColor: "#E9F2FA",
                                border: "4px solid #0B72C4",
                                color: "#0B72C4",
                                fontSize: "20px",
                                fontWeight: "700",
                                onHover: "darken",
                                padding: "8px 12px",
                            }}
                            onClick={async () => {
                                console.log(inputBidAmount);
                                placeBid({
                                    onError: handleErrorNotification,
                                    onSuccess: handleSuccess,
                                    onComplete: handleComplete,
                                });
                            }}
                            text={isLoading || isFetching ? <div>Loading...</div> : <div>Place Bid</div>}
                            theme="colored"
                        />
                        {/* </form> */}
                        {transactionStatus != undefined ? <TransactionStatus transactionStatus={transactionStatus} /> : ""}

                        {/* <p className={styles.tran}>{transactionStatus?.hash || "???"}</p>
                        <p className={styles.tran}>{transactionStatus?.status || "???"}</p> */}
                    </div>
                    <div id="trans" className={styles.transactions}>
                        <div className={styles.col1}>
                            <p className={styles.txtT}>Your transactions</p>
                            <hr />
                            <p className={styles.tran}>g43getg43</p>
                            <p className={styles.tran}>g3g4rere</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={styles.txtT}>Time</p>
                            <hr />
                            <p className={styles.tran}>10 minutes ago</p>
                            <p className={styles.tran}>10 minutes ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceBid;
