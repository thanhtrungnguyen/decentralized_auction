import React from "react";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { Outlet, Link } from "react-router-dom";
import { Button, ConnectButton, useNotification } from "web3uikit";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";
import HeaderBid from "../components/HeaderBid";
import auctionAbi from "../../../constants/abi.json";
import contractAddresses from "../../../constants/contractAddress.json";
import Moralis from "moralis";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import Decimal from "decimal.js";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import BiddingProperty from "../components/BiddingProperty";
<<<<<<< HEAD
import { useFetch } from "../../../hook/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";

function AuctionRegistration({ auction: auctionId, property: propertyId }) {
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}`;
    const [auction, setAuction] = useState([]);
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
=======
>>>>>>> 490b38d720c744c734643af17c4648d9f1233415

    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex);
    console.log(chainId);
    // const chainId = 31337;
    const dispatch = useNotification();

    // const auctionContractAddress = chainId in contractAddresses ? contractAddresses[31337][0] : null;
    const auctionContractAddress = contractAddresses[chainId][0] ?? null;
    console.log(auctionContractAddress);
    const {
        runContractFunction: registerToBid,
        data,
        error,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: auctionAbi,
        contractAddress: auctionContractAddress, // your contract address here
        functionName: "registerToBid",
        msgValue: ethers.utils.parseUnits(new Decimal(auction.registrationFee).plus(auction.depositAmount).toString(), "ether").toString(),
        params: { auctionId: auction.auctionId },
    });
    if (data) console.log(data.toString());
    if (error) console.log(error);
    console.log();
    // const { runContractFunction: getAuctionInformationById } = useWeb3Contract({
    //     abi: auctionAbi,
    //     contractAddress: auctionContractAddress,
    //     functionName: "getAuctionInformationById",
    //     params: { auctionId: "12a" },
    // });
    // const updateUIValues = async () => {
    //     const auctionInformation = await getAuctionInformationById();
    // };

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            // updateUIValues();
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
        dispatch({
            type: "error",
            title: "Registration Error",
            message: "Registration Failed!",
            position: "topR",
            icon: <AiOutlineClose />,
        });
    };

    return (
        <div>
            <div>
                <p className={styles.txtBlack}>Auction Registration </p>
                <p className={styles.txt}>You have selected:</p>\
                <div>
                    <div className={styles.info}>
<<<<<<< HEAD
                        <BiddingProperty auction={auction} property={propertyId} />
=======
                        {/* <img className={styles.img} src={sendAuction.MediaURL[0]} alt="images" /> */}
                        {/* <img className={styles.img} src="https://static.vecteezy.com/packs/media/photos/term-bg-3-f6a12264.jpg" alt="images" /> */}
                        {/* <p className={styles.title}>{sendAuction.PropertyName}</p> */}
                        {/* <p className={styles.title}>PropertyName PropertyName PropertyName PropertyName </p> */}
                        {/* <BiddingProperty auction={auction} /> */}
>>>>>>> 490b38d720c744c734643af17c4648d9f1233415
                        <p className={styles.txtM}>Starting bid:</p>
                        <p className={styles.txtNormal}>{auction.startBid}</p>
                        {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                        <p className={styles.txtM}>Registration ends in:</p>
                        <p className={styles.txtNormal}>
                            <Countdown date={auction.endRegistrationTime * 1000} />
                        </p>
                    </div>
                    <div className={styles.detail}>
                        {/* <form> */}
                        <p className={styles.title}>Registration details:</p>
                        <p className={styles.txtT}>Registration Fee: {auction.registrationFee} ETH</p>
                        <p className={styles.txtT}>Deposit Amount: {auction.depositAmount} ETH</p>
                        <p className={styles.txtT}>
                            Total amount you must to pay:{new Decimal(auction.registrationFee).plus(auction.depositAmount).toString()} ETH
                        </p>
                        {/* <p className={styles.txtNormal}>{sendAuction.CurrentBid}</p> */}
                        {/* <label className={styles.mess}>message</label> */}
                        <button
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
                        {/* <input
                className={styles.btn}
                type="submit"
                value="Place bid"
              ></input> */}
                        {/* </form> */}
                    </div>
                </div>
            </div>
            {/* ) : (
                <div>Please connect to a Wallet</div>
            )} */}
        </div>
    );
}

export default AuctionRegistration;
