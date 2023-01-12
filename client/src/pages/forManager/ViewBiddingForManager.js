import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
// import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
// import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
// import { set } from "mongoose";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Time from "../../components/time/Time";
const ViewBiddingForManager = () => {
    const [page, setPage] = React.useState(1);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const baseURL = `/auction/getAllBidding/${id}`;
    //const socket = io.connect("http://localhost:8800");
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();
    const [status, setStatus] = useState(null);

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
    }, [status, baseURL]);
    // socket.on("count", (item) => {
    //     if (item !== status) {
    //         setStatus(data);
    //         console.log(item);
    //     }
    // });
    const onClick = () => {
        navigate(`/viewBiddingForManager/${id}`);
    };
    const result = () => {
        navigate(`/viewAuctionResultForManager/${id}`);
    };
    const Registration = () => {
        navigate(`/viewRegistrationForManager/${id}`);
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
    const getDate = (dates) => {
        var date = new Date(new Date(0).setUTCSeconds(dates));
        return date.toLocaleString();
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
                                    navigate("/viewRegistrationForManager");
                                }}
                            >
                                Registration Information
                            </button>

                            <button
                                className={styles.btn}
                                onClick={() => {
                                    navigate("/viewBiddingForManager");
                                }}
                            >
                                Place Bids Log
                            </button>
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    navigate("/viewAuctionResultForManager");
                                }}
                            >
                                Auction Result
                            </button>
                            <input className={styles.ip} type="text" placeholder="Enter Name"></input>
                            <button className={styles.btn}>Search</button>
                        </div>
                        <p className={styles.lb}>Registration Time End in 1d 4h 32m 32s</p>
                        <p className={styles.lb}>Place Bids Log</p>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Username</th>
                                <th className={styles.th}>Wallet</th>
                                <th className={styles.th}>Tx Hash</th>
                                <th className={styles.th}>Bid Amount</th>
                                <th className={styles.th}>Placed at</th>
                                <th className={styles.th}>Status</th>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>0xdfdf...fdfd</td>
                                <td>0xdfdf...fdfd</td>
                                <td>2.234123</td>
                                <td>dd/MM/yyyy - HH:mm:ss</td>
                                <td>Retracted</td>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>0xdfdf...fdfd</td>
                                <td>0xdfdf...fdfd</td>
                                <td>2.234123</td>
                                <td>dd/MM/yyyy - HH:mm:ss</td>
                                <td>Retracted</td>
                            </tr>{" "}
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>0xdfdf...fdfd</td>
                                <td>0xdfdf...fdfd</td>
                                <td>2.234123</td>
                                <td>dd/MM/yyyy - HH:mm:ss</td>
                                <td>Bidding</td>
                            </tr>{" "}
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>0xdfdf...fdfd</td>
                                <td>0xdfdf...fdfd</td>
                                <td>2.234123</td>
                                <td>dd/MM/yyyy - HH:mm:ss</td>
                                <td>Retracted</td>
                            </tr>{" "}
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>0xdfdf...fdfd</td>
                                <td>0xdfdf...fdfd</td>
                                <td>2.234123</td>
                                <td>dd/MM/yyyy - HH:mm:ss</td>
                                <td>Bidding</td>
                            </tr>
                        </table>
                        <hr />
                        <div>
                            <Pagination
                                className={styles.Pagination}
                            // count={data.total % 10 > 0 ? Math.floor(data.total / 10) + 1 : data.total / 10}
                            // page={page}
                            // onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={styles.container}>
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
                            className={styles.bold}
                            onClick={(e) => {
                                onClick(e);
                            }}
                        >
                            Place Bids Log
                        </label>
                        <label
                            className={styles.link}
                            onClick={(e) => {
                                result(e);
                            }}
                        >
                            Auction Result
                        </label>

                        <hr />
                        <p className={styles.txtBold}>Auction Time End in: {data.AuctionTime}</p>
                        <h2>Place Bids Log</h2>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Username</th>
                                <th className={styles.th}>Wallet</th>
                                <th className={styles.th}>Tx Hash</th>
                                <th className={styles.th}>Bid Amount</th>
                                <th className={styles.th}>Placed at</th>
                                <th className={styles.th}>Status</th>
                            </tr>
                            {data.map((Bids) => (
                                <tr>
                                    <td className={styles.td}>{Bids.bidderId}</td>
                                    <td className={styles.td}>{Bids.bidder}</td>

                                    <td className={styles.td}>{Bids.transactionHash}</td>
                                    <td className={styles.td}>{Bids.bidAmount}</td>
                                    <td className={styles.td}>{getDate(Bids.blockTimestamp)}</td>

                                    <td className={styles.td}>
                                        {Bids.name === "PlacedBid" && "Bidding"}
                                        {Bids.name === "RetractedBid" && "RetractedBid"}
                                    </td>
                                </tr>
                            ))}
                        </table>
                        <div>
                            <Pagination className={styles.pagi} count={Math.floor(data.total / 10) + 1} page={page} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div> */}
        </>
    );
};
export default ViewBiddingForManager;
