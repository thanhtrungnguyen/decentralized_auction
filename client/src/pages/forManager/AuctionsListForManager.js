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
const AuctionsListForManager = () => {
    const [page, setPage] = React.useState(1);
    const [category, setCategory] = useState(null);
    const [category2, setCategory2] = useState(null);
    const [propertyName, setPropertyName] = useState(null);
    const [propertyName2, setPropertyName2] = useState(null);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const baseURL = "http://localhost:8800/api/auction/";
    const baseURLCategory = "http://localhost:8800/api/category/";
    const baseURLAuction = `http://localhost:8800/api/auction/getAll/${page}/${propertyName}/${category}/${status}`;
    const [listCategory, setListCategory] = useState([]);
    const [listAuction, setListAuction] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async()=>{
            setLoading(true);
            await axios.get(baseURLCategory).then((resp) => {

                console.log(resp.data);
                console.log("axios get");
                setListCategory(resp.data);
            });
            await axios.get(baseURLAuction).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setListAuction(resp.data);
            });
            setLoading(false);
        }
       fetchData();
        
    }, [baseURLAuction]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "category") {
            setCategory2(value);
        }
        if (id === "propertyName") {
            setPropertyName2(value);
        }
    };
    const handleSubmit = (event) => {
        propertyName2 === '' ? setPropertyName(null):setPropertyName(propertyName2);
        setCategory(category2)
        setPage(1);
        event.preventDefault();
    };
    const handleChangeStatus = (e)=>{
        setStatus(e.target.value)
        setPage(1);
    }
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
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarSeller />
                    <div className={styles.content}>
                        <div className={styles.search}>
                            <div className={styles.floatLeft}>
                                <p className={styles.title}>Property Name</p>
                                <input
                                    id="propertyName"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Please input"
                                    value={propertyName2}
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
                                 <option value='null'>All</option>
                                {listCategory.map((item) => (
                                    <option value={item.Name} selected={item.Name===category2} >{item.Name}</option>
                                ))}
                            </select>
                            <br />
                            <br />
                            <input className={styles.btn} type="submit" value="Search"></input>
                            <input className={styles.btnReset} type="button" value="Reset" onClick={(e)=>setPropertyName2('')}></input>
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <button className={styles.bold} value='null' onClick={(e)=>{handleChangeStatus(e)}}>
                                All
                            </button>
                            <button className={styles.link} value='null' onClick={(e)=>{handleChangeStatus(e)}}>
                                Request add
                            </button>
                            <button className={styles.link} value='Approved' onClick={(e)=>{handleChangeStatus(e)}}>
                                Approved
                            </button>
                            <button className={styles.link} value='null' onClick={(e)=>{handleChangeStatus(e)}}>
                                Upcoming
                            </button>
                            <button className={styles.link} value='null' onClick={(e)=>{handleChangeStatus(e)}}>
                                Bidding
                            </button>
                            <button className={styles.link} value='null' onClick={(e)=>{handleChangeStatus(e)}}>
                                Closed
                            </button>
                            <hr />
                            <p className={styles.txtBold}>Total Auction: {listAuction.totalAuction}</p>
                            {/* <Link className={styles.btnAdd} to="/addProperty">
              Add a New Property
            </Link> */}
                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Property Name</th>
                                    <th className={styles.th}>Category Name</th>
                                    <th className={styles.th}>Registration Time</th>
                                    <th className={styles.th}>Auction Time</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {listAuction.listAuction.map((auction) => (
                                    <tr>
                                        <td className={styles.td}>{auction.Name}</td>
                                        <td className={styles.td}>{auction.Category_Id__r.Name}</td>
                                        <td className={styles.td}>
                                            {auction.Auctions1__r.records[0].Status__c == "Request" && `__`}
                                            {auction.Auctions1__r.records[0].Status__c != "Request" &&
                                                "From " +
                                                    auction.Auctions1__r.records[0].Start_Registration_Time__c +
                                                    " To " +
                                                    auction.Auctions1__r.records[0].End_Registration_Time__c}
                                        </td>
                                        <td className={styles.td}>
                                            {auction.Auctions1__r.records[0].Status__c == "Request" && `__`}
                                            {auction.Auctions1__r.records[0].Status__c != "Request" &&
                                                "From " +
                                                    auction.Auctions1__r.records[0].Start_Aution_Time__c +
                                                    " To " +
                                                    auction.Auctions1__r.records[0].End_Auction_Time__c}
                                        </td>
                                        <td className={styles.td}>{auction.Auctions1__r.records[0].Status__c}</td>
                                        <td className={styles.td}>
                                            <Link
                                                className={styles.linkBlue}
                                                to={`/auctionDetailForManager/${auction.Auctions1__r.records[0].Id}/${auction.Id}`}
                                            >
                                                View
                                            </Link>
                                            {auction.Auctions1__r.records[0].Status__c != "Approved" && 
                                            <Link
                                                className={styles.linkBlue}
                                                to={`/approveAuction/${auction.Auctions1__r.records[0].Id}/${auction.Id}`}
                                            >
                                                Approve
                                            </Link>}
                                            
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <div>
                                <Pagination className={styles.pagi} count={Math.floor(listAuction.total / 10) + 1} page={page} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default AuctionsListForManager;
