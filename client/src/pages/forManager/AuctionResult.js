import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
// import { Outlet, Link } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
// import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";

// import { set } from "mongoose";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import Time from "../../components/time/Time";
import { useFetchData } from "../../hooks/useFetch";
import Countdown from "react-countdown";
import Loader from "../biddingFeatures/components/Loader";
const AuctionResult = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const prefix = "https://goerli.etherscan.io/tx/";
    const prefixAddress = "https://goerli.etherscan.io/address/";
    const { loading: auctionLoading, data: auctionData, error: auctionError } = useFetchData(`/contractInteraction/createdAuction/${id}`);
    const { loading: paymentLoading, data: paymentData, error: paymentError } = useFetchData(`/contractInteraction/payment/${id}`);

    const onClick = () => {
        navigate(`/viewBiddingForManager/${id}`);
    };
    const result = () => {
        navigate(`/viewAuctionResultForManager/${id}`);
    };
    const Registration = () => {
        navigate(`/viewRegistrationForManager/${id}`);
    };
    const withdraw = () => {
        navigate(`/withdrawForManager/${id}`);
    };
    const getLink = (transactionHash) => {
        var link = `${prefix}${transactionHash}`;
        return link;
    };
    const getString = (transactionHash) => {
        var hashString = `${transactionHash?.slice(0, 6)}...${transactionHash?.slice(transactionHash?.length - 4)}`;
        return hashString;
    };
    const getLinkAddress = (address) => {
        var link = `${prefixAddress}${address}`;
        return link;
    };
    const getDate = (dates) => {
        var date = new Date(new Date(0).setUTCSeconds(dates));
        return date.toLocaleString();
    };
    // const handleChange = (event, value) => {
    //     setPage(value);
    // };
    console.log(paymentData?.payment);
    return auctionLoading || paymentLoading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.container}>
                <SideBarSeller />
                <Time />
                <div className={styles.r}>
                    <div className={styles.con}>
                        <div className={styles.btns}>
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    Registration();
                                }}
                            >
                                Registration Information
                            </button>

                            <button
                                className={styles.btn}
                                onClick={() => {
                                    onClick();
                                }}
                            >
                                Place Bids Log
                            </button>
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    result();
                                }}
                            >
                                Auction Result
                            </button>
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    withdraw();
                                }}
                            >
                                Withdraw
                            </button>
                            <input className={styles.ip} type="text" placeholder="Enter Name"></input>
                            <button className={styles.btn}>Search</button>
                        </div>
                        <hr />
                        <p className={styles.title}>Auction Result</p>
                        {auctionLoading ? (
                            <Loader />
                        ) : (
                            <p className={styles.lb}>
                                Registration Time End in <Countdown date={auctionData?.createdAuction?.duePaymentTime * 1000} />
                            </p>
                        )}
                        <>
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Username</th>
                                    <th className={styles.th}>Wallet</th>
                                    <th className={styles.th}>Tx Hash</th>
                                    <th className={styles.th}>Time</th>
                                    <th className={styles.th}>Status</th>
                                </tr>

                                {paymentData?.payment.map((bid) => (
                                    <>
                                        <tr>
                                            <td>{bid?.user?.username}</td>
                                            <td>
                                                <a className={styles.txt} href={getLinkAddress(bid?.bidder)}>
                                                    {getString(bid?.bidder)}
                                                </a>
                                            </td>
                                            <td>
                                                <a className={styles.txt} href={getLink(bid?.transactionHash)}>
                                                    {getString(bid?.transactionHash)}
                                                </a>
                                            </td>

                                            <td>{getDate(bid?.blockTimestamp)}</td>
                                            <td>
                                                {bid.name === "PaymentCompleted" && "Payment Completed"}
                                                {bid.name === "CanceledAuctionResult" && "Canceled Auction Result"}
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </table>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AuctionResult;
