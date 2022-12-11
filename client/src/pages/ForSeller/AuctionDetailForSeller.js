import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarSeller";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/stylesPages/forSellers/AuctionDetailForSeller.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
import ReactPlayer from "react-player";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const AuctionDetailForSeller = () => {
    const { id } = useParams();
    const baseURL = `http://localhost:8800/api/auction/auctiondetailForSeller/${id}`;
    const { data, loading, error } = useFetch(baseURL);
    console.log(data);
    console.log(loading);
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
        "loading please wait"
    ) : (
        <>
            {(() => {
                if (getUser().role == "SELLER") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}{" "}
            <NavBar />
            <div className={styles.container}>
                <SideBarSeller />
                <div className={styles.detail}>
                    <div className={styles.info}>
                        <div className={styles.col1}>
                            <div className={styles.col3}>
                                <div className={styles.row}>
                                    <img className={styles.img} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                                    {/* <img
                    className={styles.img}
                    src={`http://localhost:8800/api/auction/images/${data[0].Properties_Media__r.records[0].Name}`}
                    alt="images"
                  /> */}
                                </div>
                                <div className={styles.row}>
                                    <img className={styles.img} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                                    {/* <img
                    className={styles.img}
                    src={`http://localhost:8800/api/auction/images/${data[0].Properties_Media__r.records[1].Name}`}
                    alt="images"
                  /> */}
                                </div>
                                <div className={styles.row}>
                                    <img className={styles.img} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                                    {/* <img
                    className={styles.img}
                    src={`http://localhost:8800/api/auction/images/${data[0].Properties_Media__r.records[2].Name}`}
                    alt="images"
                  /> */}
                                </div>
                            </div>
                            <div className={styles.col4}>
                                <ReactPlayer
                                    className={styles.video}
                                    url="https://www.youtube.com/watch?v=6ltIt-NtQjQ"
                                    playing={true}
                                    controls={true}
                                    loop={true}
                                    muted={true}
                                    playsinline={true}
                                    onReady={true}
                                    width="85%"
                                    height="90%"
                                />
                            </div>
                        </div>
                        <div className={styles.col2}>
                            <p className={styles.title}>Property Name</p>
                            {/* <p className={styles.title}>{data.auction.propertyName}</p> */}
                            <br />
                            <br />
                            <p className={styles.txtBlue}>Start bid : 300 ETH</p>
                            {/* <p className={styles.txtBlue}>
                Start bid : ${data.auction.startBid}
              </p> */}
                            <p className={styles.txtBlue}>Cureent bid : $350 ETH</p>
                            {/* <p className={styles.txtBlue}>
                Cureent bid : ${data.auction.currentBid}
              </p> */}
                            <p className={styles.txt}>Auction Start Time : 31/12/2022 9:00AM</p>
                            {/* <p className={styles.txt}>
                Auction Start Time : ${data.auction.startTime}
              </p> */}
                            <p className={styles.txt}>Auction End Time : 31/12/2022 11:00AM</p>
                            {/* <p className={styles.txt}>
                Auction End Time : ${data.auction.endTime}
              </p> */}
                        </div>
                    </div>
                    <div className={styles.history}>
                        <p className={styles.title2}>Bidding History</p>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Amount</th>
                                <th className={styles.th}>Time</th>
                                <th className={styles.th}>Transaction Address</th>
                            </tr>
                            {data.map((auction) => (
                                <tr>
                                    <td className={styles.td}>{auction.amout}</td>
                                    <td className={styles.td}>{auction.time}</td>
                                    <td className={styles.td}>{auction.transactionAddress}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className={styles.td}>Dianne Russell</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.des}>
                        <div className={styles.con}>
                            <p className={styles.titleDes}>Description </p>
                            {/* <label className={styles.label}>{data.auction.description}</label> */}
                            <label className={styles.label}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                                in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </label>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default AuctionDetailForSeller;
