import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { set } from "mongoose";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";

const AuctionResult = () => {
    const [page, setPage] = React.useState(1);
    const { id, propertyId } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const baseURL = `http://localhost:8800/api/auction/${page}/${id}`;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            axios.get(baseURL).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setData(resp.data);
            });
            setLoading(false);
        };
        fetchData();
    }, [baseURL]);
    const onClick = () => {
        navigate(`/viewBiddingForManager/${id}/${propertyId}`);
    };
    const result = () => {
        navigate(`/viewAuctionResultForManager/${id}/${propertyId}`);
    };
    const Registration = () => {
        navigate(`/viewRegistrationForManager/${id}/${propertyId}`);
    };
    const handleChange = (event, value) => {
        setPage(value);
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
    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (getUser().role == "MANAGER") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}{" "}
            <NavBar />
            <div className={styles.container}>
                <SideBarSeller />
                <div className={styles.content}>
                    <div className={styles.search}>
                        <label
                            className={styles.link}
                            onClick={(e) => {
                                Registration(e);
                            }}
                        >
                            Registration Information
                        </label>
                        <label
                            className={styles.link}
                            onClick={(e) => {
                                onClick(e);
                            }}
                        >
                            Place Bids Log
                        </label>
                        <label
                            className={styles.bold}
                            onClick={(e) => {
                                result(e);
                            }}
                        >
                            Auction Result
                        </label>
                        <hr />
                        <p className={styles.b}>Place Bids Log</p>
                        <p className={styles.txtBold}>Payment Time End in: {data.PaymentTime}</p>
                        <br />
                        <div>
                            <div className={styles.left}>
                                <label className={styles.labelL}>Winner</label>
                            </div>
                            <div className={styles.right}>
                                <label className={styles.lablelR}>{data.userName}</label>
                            </div>
                        </div>
                        <br />
                        <br />

                        <div>
                            <div className={styles.left}>
                                <label className={styles.labelL}>Bid Amount</label>
                            </div>
                            <div className={styles.right}>
                                <label className={styles.lablelR}>{data.BidAmount}</label>
                            </div>
                        </div>
                        <br />
                        <br />

                        <div>
                            <div className={styles.left}>
                                <label className={styles.labelL}>Status</label>
                            </div>
                            <div className={styles.right}>
                                <label className={styles.lablelR}>{data.Status}</label>
                            </div>
                        </div>
                        <br />
                        <br />

                        <div>
                            <div className={styles.left}>
                                <label className={styles.labelL}>Payment</label>
                            </div>
                            <div className={styles.right}>
                                <label className={styles.lablelR}>{data.Payment}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default AuctionResult;
