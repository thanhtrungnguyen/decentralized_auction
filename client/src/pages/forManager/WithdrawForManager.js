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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";

// import { set } from "mongoose";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import Time from "../../components/time/Time";
const WithdrawForManager = () => {
    const axios = useAxiosPrivate();
    const [page, setPage] = React.useState(1);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const baseURL = `/contractInteraction/withdraw/${id}`;
    const [role, setRole] = useState();

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
    const handleChange = (event, value) => {
        setPage(value);
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
                        <p className={styles.lb}>Registration Time End in 1d 4h 32m 32s</p>
                        <p className={styles.lb}>Total Registered Bidders: 10</p>

                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Username</th>
                                <th className={styles.th}>Wallet</th>
                                <th className={styles.th}>Tx Hash</th>
                                <th className={styles.th}>Withdraw at</th>
                            </tr>
                            {data.withdraw?.map((auction) => (
                                <tr>
                                    <td>{auction?.user?.username}</td>
                                    <td>{auction?.bidder}</td>
                                    <td>{auction?.transactionHash}</td>
                                    <td>{new Date(auction?.blockTimestamp * 1000).toLocaleString()}</td>
                                </tr>
                            ))}
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
        </>
    );
};
export default WithdrawForManager;
