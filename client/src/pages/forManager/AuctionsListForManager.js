import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
// import { BsFillCheckSquareFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
// import { set } from "mongoose";
import Loading from "../../components/loading/Loading";
import { AiFillEye, AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import Time from "../../components/time/Time";
import { Link, useNavigate } from "react-router-dom";
import useWindowSize from "@react-hook/window-size";
import Confetti from "react-confetti";
import Select from "react-select";

import moment from "moment";
const AuctionsListForManager = () => {
    const [page, setPage] = React.useState(1);
    const [category, setCategory] = useState(null);
    const [category2, setCategory2] = useState(null);
    const [auctionName, setAuctionName] = useState(null);
    const [auctionName2, setAuctionName2] = useState(null);
    // const [data, setData] = useState([]);
    // const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    // const baseURL = "http://localhost:8800/api/auction/";
    //const baseURLCategory = "/category/";

    // const baseURL = `http://localhost:8800/api/auction/filter/${page}/${status}/${price}/${sort}/${name}`;
    const [listCategory, setListCategory] = useState([]);
    const [listAuction, setListAuction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();
    const navigate = useNavigate();
    const baseURLAuction = `/auction/auctions/${page}/${status}/${auctionName}`;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // await axios.get(baseURLCategory).then((resp) => {
            //     console.log(resp.data);
            //     console.log("axios get");
            //     setListCategory(resp.data);
            // });
            await axios.get(baseURLAuction).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setListAuction(resp.data.auctions);
            });

            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }

            setLoading(false);
        };
        fetchData();
    }, [baseURLAuction]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "category") {
            setCategory2(value);
        }
        if (id === "auctionName") {
            setAuctionName2(value);
        }
    };
    const handleSubmit = (event) => {
        auctionName2 === "" ? setAuctionName(null) : setAuctionName(auctionName2);
        setCategory(category2);
        setPage(1);
        event.preventDefault();
    };
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
        setPage(1);
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

    function exportData(data) {
        return (
            <>
                {data.listAuction.map((item) => (
                    <tr>
                        <td>{item.status === "Request" ? "___________" : item.name}</td>
                        <td>
                            {item.status === "Request" ? (
                                "___________"
                            ) : (
                                <>
                                    From {moment(item.startRegistrationTime).format("L")} - {moment(item.startRegistrationTime).format("LTS")} to{" "}
                                    {moment(item.endRegistrationTime).format("L")} - {moment(item.endRegistrationTime).format("LTS")}
                                </>
                            )}
                        </td>
                        <td>
                            {item.status === "Request" ? (
                                "___________"
                            ) : (
                                <>
                                    From {moment(item.startAuctionTime).format("L")} - {moment(item.startAuctionTime).format("LTS")} to{" "}
                                    {moment(item.endAuctionTime).format("L")} - {moment(item.endAuctionTime).format("LTS")}
                                </>
                            )}
                        </td>
                        <td>{item.status === "Request" ? "Request Add" : item.status}</td>
                        <td>
                            {item.status === "Request" ? (
                                <div className={styles.fl2}>
                                    <AiFillEye
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate(`/auctionDetailForManager/${item._id}`);
                                        }}
                                    />
                                    <Link className={styles.link2} to={`/approveAuction/${item._id}`}>
                                        Approve/Reject
                                    </Link>
                                </div>
                            ) : (
                                <div className={styles.fl2}>
                                    <AiFillEye
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate(`/auctionDetailForManager/${item._id}`);
                                        }}
                                    />
                                    <Link className={styles.link2} to={`/viewRegistrationForManager`}>
                                        Process
                                    </Link>
                                </div>
                            )}

                            {/* <AiOutlineDelete className={styles.iconView} /> */}
                        </td>
                    </tr>
                ))}
            </>
        );
    }
    const options = [
        { value: "HihiHEhe", label: "HihiHEhe" },
        { value: "chocolate", label: "chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
        { value: "HihiHEhe", label: "HihiHEhe" },
        { value: "chocolate", label: "chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    return loading ? (
        <Loading />
    ) : (
        <>
            {/* <Confetti width="1900px" height="960px" /> */}
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarSeller />
                    <Time />
                    <div className={styles.r}>
                        <div className={styles.con}>
                            <div className={styles.btns}>
                                <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="null">
                                    All
                                </button>
                                {/* <button className={styles.btn}>Created</button> */}
                                {/* <button className={styles.btn}>Modified</button> */}
                                <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Request">
                                    Request Add
                                </button>
                                <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Approved">
                                    Approved
                                </button>
                                <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Upcoming">
                                    Upcoming
                                </button>
                                <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Bidding">
                                    Bidding
                                </button>
                                <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Closed">
                                    Closed
                                </button>
                                <Select className={styles.select} options={options} placeholder="Select Seller" />

                                <input
                                    className={styles.ip}
                                    type="text"
                                    placeholder="Enter Name"
                                    id="auctionName"
                                    value={auctionName2}
                                    onChange={(e) => handleInputChange(e)}
                                ></input>
                                <button className={styles.btn} type="submit">
                                    Search
                                </button>
                            </div>
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Auction Name</th>
                                    <th className={styles.th}>Registration time</th>
                                    <th className={styles.th}>Auction time</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {exportData(listAuction)}
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
                    <Time />

                    <div className={styles.content}>
                        <div className={styles.search}>
                            <div className={styles.floatLeft}>
                                <p className={styles.title}>Auction Name</p>
                                <input
                                    id="auctionName"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Please input"
                                    value={auctionName2}
                                    onChange={(e) => handleInputChange(e)}
                                    //required
                                ></input>
                            </div>
                            <p className={styles.title}>Category</p>
                            <select
                                className={styles.select}
                                onChange={(e) => handleInputChange(e)}
                                id="category"
                                placeholder="Category"
                                //defaultValue="null"
                            >
                                <option value="null">All</option>
                                {listCategory.map((item) => (
                                    <option value={item.Name} selected={item.Name === category2}>
                                        {item.Name}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <br />
                            <input className={styles.btn} type="submit" value="Search"></input>
                            <input className={styles.btnReset} type="button" value="Reset" onClick={(e) => setAuctionName2("")}></input>
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <button
                                className={styles.bold}
                                value="null"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                All
                            </button>
                            <button
                                className={styles.link}
                                value="Request"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Request add
                            </button>
                            <button
                                className={styles.link}
                                value="Approved"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Approved
                            </button>
                            <button
                                className={styles.link}
                                value="UpcomingforBid"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Upcoming
                            </button>
                            <button
                                className={styles.link}
                                value="Bidding"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Bidding
                            </button>
                            <button
                                className={styles.link}
                                value="Closed"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Closed
                            </button>
                            <hr />
                            <p className={styles.txtBold}>Total Auction: {listAuction.totalAuction}</p>
                         
                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Auction Name</th>
                                    <th className={styles.th}>Property Name</th>
                                    <th className={styles.th}>Category Name</th>
                                    <th className={styles.th}>Registration Time</th>
                                    <th className={styles.th}>Auction Time</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {listAuction.listAuction.map((auction) => (
                                    <tr>
                                        <td className={styles.td}>{auction.Auctions1__r.records[0].Name}</td>
                                        <td className={styles.td}>{auction.Name}</td>

                                        <td className={styles.td}>{auction.Category_Id__r.Name}</td>
                                        <td className={styles.td}>
                                            {auction.Auctions1__r.records[0].Status__c === "Request" && `__`}
                                            {auction.Auctions1__r.records[0].Status__c !== "Request" &&
                                                "From " +
                                                    new Date(auction.Auctions1__r.records[0].Start_Registration_Time__c)
                                                        .toUTCString()
                                                        .split("GMT")[0] +
                                                    "To " +
                                                    new Date(auction.Auctions1__r.records[0].End_Registration_Time__c).toUTCString().split("GMT")[0]}
                                        </td>
                                        <td className={styles.td}>
                                            {auction.Auctions1__r.records[0].Status__c === "Request" && `__`}
                                            {auction.Auctions1__r.records[0].Status__c !== "Request" &&
                                                "From " +
                                                    new Date(auction.Auctions1__r.records[0].Start_Aution_Time__c).toUTCString().split("GMT")[0] +
                                                    " To " +
                                                    new Date(auction.Auctions1__r.records[0].End_Auction_Time__c).toUTCString().split("GMT")[0]}
                                        </td>
                                        <td className={styles.td}>{auction.Auctions1__r.records[0].Status__c}</td>
                                        <td className={styles.td}>
                                            <Link
                                                className={styles.linkBlue}
                                                to={`/auctionDetailForManager/${auction.Auctions1__r.records[0].Id}/${auction.Id}`}
                                            >
                                                View
                                            </Link>
                                            {auction.Auctions1__r.records[0].Status__c === "Bidding" && (
                                                <Link
                                                    className={styles.linkBlue}
                                                    to={`/viewRegistrationForManager/${auction.Auctions1__r.records[0].Id}`}
                                                >
                                                    Process
                                                </Link>
                                            )}
                                            {auction.Auctions1__r.records[0].Status__c === "UpcomingforBid" && (
                                                <Link
                                                    className={styles.linkBlue}
                                                    to={`/viewRegistrationForManager/${auction.Auctions1__r.records[0].Id}`}
                                                >
                                                    Process
                                                </Link>
                                            )}

                                            {auction.Auctions1__r.records[0].Status__c === "RegistrationTime" && (
                                                <Link
                                                    className={styles.linkBlue}
                                                    to={`/viewRegistrationForManager/${auction.Auctions1__r.records[0].Id}`}
                                                >
                                                    Process
                                                </Link>
                                            )}
                                            {auction.Auctions1__r.records[0].Status__c === "Closed" && (
                                                <Link
                                                    className={styles.linkBlue}
                                                    to={`/viewRegistrationForManager/${auction.Auctions1__r.records[0].Id}`}
                                                >
                                                    Process
                                                </Link>
                                            )}
                                            {auction.Auctions1__r.records[0].Status__c === "Success" && (
                                                <Link
                                                    className={styles.linkBlue}
                                                    to={`/viewRegistrationForManager/${auction.Auctions1__r.records[0].Id}`}
                                                >
                                                    Process
                                                </Link>
                                            )}
                                            {auction.Auctions1__r.records[0].Status__c === "Fail" && (
                                                <Link
                                                    className={styles.linkBlue}
                                                    to={`/viewRegistrationForManager/${auction.Auctions1__r.records[0].Id}`}
                                                >
                                                    Process
                                                </Link>
                                            )}
                                            {auction.Auctions1__r.records[0].Status__c === "Request" && (
                                                <Link
                                                    className={styles.linkBlue}
                                                    to={`/approveAuction/${auction.Auctions1__r.records[0].Id}/${auction.Id}`}
                                                >
                                                    Approve
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <div>
                                <Pagination
                                    className={styles.pagi}
                                    count={Math.floor(listAuction.total / 10) + 1}
                                    page={page}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
            </form>
        </>
    );
};
export default AuctionsListForManager;
