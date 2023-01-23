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
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
// import { set } from "mongoose";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import Time from "../../components/time/Time";
const AuctionResult = () => {
    const axios = useAxiosPrivate();
    const [page] = React.useState(1);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const baseURL = `/auction/${page}/${id}`;

    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            axios.get(baseURL).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setData(resp.data);
            });

            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);
    const onClick = () => {
        navigate(`/viewBiddingForManager/${id}`);
    };
    const result = () => {
        navigate(`/viewAuctionResultForManager/${id}`);
    };
    const Registration = () => {
        navigate(`/viewRegistrationForManager/${id}`);
    };
    // const handleChange = (event, value) => {
    //     setPage(value);
    // };
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
                            <input className={styles.ip} type="text" placeholder="Enter Name"></input>
                            <button className={styles.btn}>Search</button>
                        </div>
                        <hr />
                        <p className={styles.title}>Auction Result</p>
                        <p className={styles.lb}>Payment Time End in 5d 5h 34m 32s</p>
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
            {/* <div className={styles.container}>
                <SideBarSeller />
                <Time />
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
            </div> */}
        </>
    );
};
export default AuctionResult;
