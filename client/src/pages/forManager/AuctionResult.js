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
                        <div className={styles.fl}>
                            <div className={styles.l}>
                                <p className={styles.label}>Start Bid</p>
                            </div>
                            <div className={styles.r}>
                                <p className={styles.txt}>ABC XYZ</p>
                            </div>
                        </div>
                        <div className={styles.fl}>
                            <div className={styles.l}>
                                <p className={styles.label}>Bid Amount</p>
                            </div>
                            <div className={styles.r}>
                                <p className={styles.txt}>44 ETH</p>
                            </div>
                        </div>{" "}
                        <div className={styles.fl}>
                            <div className={styles.l}>
                                <p className={styles.label}>Status</p>
                            </div>
                            <div className={styles.r}>
                                <p className={styles.txt}>Accept Auction result</p>
                            </div>
                        </div>{" "}
                        <div className={styles.fl}>
                            <div className={styles.l}>
                                <p className={styles.label}>Payment</p>
                            </div>
                            <div className={styles.r}>
                                <p className={styles.txt}>Not Yet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AuctionResult;
