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
import io from "socket.io-client";
import Time from "../../components/time/Time";
import Countdown from "react-countdown";
import { BASE_URL } from "../../api/axios";
import { parseEther } from "../../utils/ethereumUnitConverter";
import { useFetchData } from "../../hooks/useFetch";
import Loader from "../biddingFeatures/components/Loader";
const ViewBiddingForManager = () => {
    const prefix = "https://goerli.etherscan.io/tx/";
    const prefixAddress = "https://goerli.etherscan.io/address/";
    const axios = useAxiosPrivate();
    const [page, setPage] = React.useState(1);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const baseURL = `/contractInteraction/placedBid/${id}`;
    const baseURLAuction = `auction/${id}`;
    const socket = io.connect(BASE_URL);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();
    const [status, setStatus] = useState(null);
    const [auction, setAuction] = useState(null);
    const { loading: auctionLoading, data: auctionData, error: auctionError } = useFetchData(`/contractInteraction/createdAuction/${id}`);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            axios.get(baseURLAuction).then((resp) => {
                console.log(resp.data.auction);
                setAuction(resp.data.auction);
            });
            axios.get(baseURL).then((resp) => {
                console.log(resp.data.placedBid);
                console.log("axios get");
                console.log("abc" + status);
                setData(resp.data.placedBid);
            });

            setLoading(false);
        };
        fetchData();
    }, [status, baseURL]);
    socket.on("count", (item) => {
        if (item != status) {
            setStatus(item);
            console.log(item);
        }
    });
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
    return loading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.container}>
                <SideBarSeller />
                <Time />
                <div className={styles.r}>
                    <div className={styles.con2}>
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
                        {/* <Countdown date={auction.endAuctionTime * 1000} renderer={renderer} /> */}
                        <p className={styles.lb}>Place Bids Log</p>
                        {auctionLoading ? (
                            <Loader />
                        ) : (
                            <p className={styles.lb}>
                                Registration Time End in <Countdown date={auctionData?.createdAuction?.endAuctionTime * 1000} />
                            </p>
                        )}
                        <>
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Username</th>
                                    <th className={styles.th}>Wallet</th>
                                    <th className={styles.th}>Tx Hash</th>
                                    <th className={styles.th}>Bid Amount</th>
                                    <th className={styles.th}>Placed at</th>
                                    <th className={styles.th}>Status</th>
                                </tr>

                                {data?.map((bid) => (
                                    <>
                                        <tr>
                                            <td>{bid?.user?.username}</td>
                                            <td>
                                                <a href={getLinkAddress(bid?.bidder)}>{getString(bid?.bidder)}</a>
                                            </td>
                                            <td>
                                                <a href={getLink(bid?.transactionHash)}>{getString(bid?.transactionHash)}</a>
                                            </td>

                                            <td>{bid?.bidAmount != undefined ? parseEther(bid?.bidAmount) : <p></p>}</td>
                                            <td>{getDate(bid?.blockTimestamp)}</td>
                                            <td>
                                                {bid.name === "PlacedBid" && "Bidding"}
                                                {bid.name === "RetractedBid" && "RetractedBid"}
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </table>
                        </>
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
