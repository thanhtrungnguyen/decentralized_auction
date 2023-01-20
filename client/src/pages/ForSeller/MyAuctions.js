import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarSeller";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
// import { BsFillCheckSquareFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
// import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import { AiFillEye, AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import Time from "../../components/time/Time";
const MyAuctions = () => {
    const [page, setPage] = React.useState(1);
    const [category, setCategory] = useState(null);
    const [category2, setCategory2] = useState(null);
    const [auctionName, setAuctionName] = useState(null);
    const [role, setRole] = useState();
    const [propertyName2, setAuctionName2] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    // const navigate = useNavigate();
    // const baseURL = "http://localhost:8800/api/myAuctions/";
    // const { data, loading, error } = useFetch(baseURL);
    //const baseURLCategory = "/category/";
    const baseURLAuction = `/auction/auctions/seller/${page}/${status}/${auctionName}`;
    //const { data, loading, error } = useFetch(baseURL);
    const [listCategory, setListCategory] = useState([]);
    const [listAuction, setListAuction] = useState([]);
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "category") {
            setCategory2(value);
        }
        if (id === "auctionName") {
            setAuctionName2(value);
        }
    };
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
        setPage(1);
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // await axios.get(baseURLCategory).then((resp) => {
            //     console.log(resp.data);
            //     console.log("axios get");
            //     setListCategory(resp.data);
            // });
            await axios.get(baseURLAuction, { withCredentials: true }).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setListAuction(resp.data.auctions);
            });
            setLoading(false);
        };
        fetchData();
    }, [baseURLAuction]);
    const handleSubmit = (event) => {
        propertyName2 === "" ? setAuctionName(null) : setAuctionName(propertyName2);
        setCategory(category2);
        setPage(1);
        event.preventDefault();
    };
    const navigate = useNavigate();
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
                        <td>{item.name}</td>
                        <td>{item.property.name}</td>
                        <td>{item.property.category.name}</td>
                        <td>{item.property.startBid}</td>
                        <td>{item.property.status}</td>
                        <td>
                            <AiFillEye
                                className={styles.iconView}
                                onClick={() => {
                                    navigate("/auctionDetailForSeller");
                                }}
                            />
                            {/* <AiOutlineDelete className={styles.iconView} /> */}
                        </td>
                    </tr>
                ))}
            </>
        );
    }
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
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="null">
                                All
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Created">
                                Created
                            </button>
                            {/* <button className={styles.btn}>Modified</button> */}
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Request">
                                Request
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Approved">
                                Approved
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Rejected">
                                Rejected
                            </button>
                            <form onSubmit={handleSubmit}>
                                <input
                                    className={styles.ip}
                                    type="text"
                                    placeholder="Enter Auction Name"
                                    id="auctionName"
                                    value={propertyName2}
                                    onChange={(e) => handleInputChange(e)}
                                ></input>
                                <button className={styles.btn} type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Auction Name</th>
                                <th className={styles.th}>Property Name</th>
                                <th className={styles.th}>Category</th>
                                <th className={styles.th}>Start Bid</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Action</th>
                            </tr>
                            {exportData(listAuction)}
                        </table>
                        <hr />
                        <div>
                            <Pagination
                                className={styles.Pagination}
                                count={Math.ceil(listAuction.count / 8)}
                                hidden={listAuction.count === 0 ? true : false}
                                page={page}
                                onChange={handleChange}
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
                                    value={propertyName2}
                                    onChange={(e) => handleInputChange(e)}
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

                                            <Link
                                                className={styles.linkBlue}
                                                to={`/viewRegistrationForManager/${auction.Auctions1__r.records[0].Id}/${auction.Id}`}
                                            >
                                                Process
                                            </Link>

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
        </>
    );
};
export default MyAuctions;
