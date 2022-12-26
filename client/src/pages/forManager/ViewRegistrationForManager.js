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

const ViewRegistrationForManager = () => {
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
                            className={styles.bold}
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
                            className={styles.link}
                            onClick={(e) => {
                                result(e);
                            }}
                        >
                            Auction Result
                        </label>

                        <hr />
                        <p className={styles.txtBold}>Registration Time End in: {data.RegistrationTime}</p>
                        <p className={styles.txtBold}>Total Registered Bidders: {data.totalRegistration}</p>

                        <br />
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Username</th>
                                <th className={styles.th}>Wallet</th>
                                <th className={styles.th}>Registration Hash</th>
                                <th className={styles.th}>Registered at</th>
                            </tr>
                            {data.map((auction) => (
                                <tr>
                                    <td className={styles.td}>{auction.Username}</td>
                                    <td className={styles.td}>{auction.Wallet}</td>

                                    <td className={styles.td}>{auction.RegistrationHash}</td>
                                    <td className={styles.td}>{new Date(auction.RegisteredAt).toUTCString().split("GMT")[0]}</td>
                                </tr>
                            ))}
                        </table>
                        <div>
                            <Pagination className={styles.pagi} count={Math.floor(data.total / 10) + 1} page={page} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default ViewRegistrationForManager;
