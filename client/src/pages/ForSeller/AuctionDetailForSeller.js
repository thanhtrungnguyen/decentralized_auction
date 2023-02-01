import styles from "../../styleCss/stylesPages/forSellers/AuctionDetailForSeller.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
import ReactPlayer from "react-player";
import HeaderUser from "../../components/header/HeaderUser";

import Loading from "../../components/loading/Loading";
import Pagination from "@mui/material/Pagination";
import Time from "../../components/time/Time";
import moment from "moment";
import "moment/locale/vi";
const AuctionDetailForSeller = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseURL = `/auction/${id}`;
    const { data, loading } = useFetch(baseURL);
    const [role, setRole] = useState();

    const Cancel = () => {
        navigate("/myAuctions");
    };
    return loading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.container}>
                <SideBarSeller />
                <Time />
                <div className={styles.detail}>
                    <div className={styles.info}>
                        <div className={styles.col1}>
                            <div className={styles.col3}>
                                <div className={styles.row}>
                                    <img className={styles.img} src={data.auction.property.mediaUrl[0]} alt="images" />
                                    {/* <img
                    className={styles.img}
                    src={`http://localhost:8800/api/auction/images/${data[0].Properties_Media__r.records[0].Name}`}
                    alt="images"
                  /> */}
                                </div>
                                <div className={styles.row}>
                                    <img className={styles.img} src={data.auction.property.mediaUrl[1]} alt="images" />
                                    {/* <img
                    className={styles.img}
                    src={`http://localhost:8800/api/auction/images/${data[0].Properties_Media__r.records[1].Name}`}
                    alt="images"
                  /> */}
                                </div>
                                <div className={styles.row}>
                                    <img className={styles.img} src={data.auction.property.mediaUrl[2]} alt="images" />
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
                                    url={data.auction.property.mediaUrl[3]}
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
                            {/* <p className={styles.title}>Property Name</p> */}
                            <p className={styles.title}>{data.auction.property.name}</p>
                            <br />
                            <br />
                            <p className={styles.txtBlue}>Start bid : {data.auction.property.startBid} ETH</p>
                            {/* <p className={styles.txtBlue}>
                Start bid : ${data.auction.startBid}
              </p> */}
                            <p className={styles.txtBlue}>Current bid : {data.auction.property.startBid} ETH</p>
                            {/* <p className={styles.txtBlue}>
                Cureent bid : ${data.auction.currentBid}
              </p> */}
                            <p className={styles.txt}>Auction Start Time : {moment(data.auction.property.startAuctionTime).format("L")}, {moment(data.auction.property.startAuctionTime).format("LTS")}</p>
                            {/* <p className={styles.txt}>
                Auction Start Time : ${data.auction.startTime}
              </p> */}
                            <p className={styles.txt}>Auction End Time : {moment(data.auction.property.endAuctionTime).format("L")}, {moment(data.auction.property.endAuctionTime).format("LTS")}</p>
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
                            {/* {data.map((auction) => (
                                <tr>
                                    <td className={styles.td}>{auction.amout}</td>
                                    <td className={styles.td}>{auction.time}</td>
                                    <td className={styles.td}>{auction.transactionAddress}</td>
                                </tr>
                            ))} */}
                            <tr>
                                <td className={styles.td}>Dianne Russell</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                            </tr>
                            <tr>
                                <td className={styles.td}>Dianne Russell</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                            </tr>
                            <tr>
                                <td className={styles.td}>Dianne Russell</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                            </tr>
                            <tr>
                                <td className={styles.td}>Dianne Russell</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                            </tr>
                            <tr>
                                <td className={styles.td}>Dianne Russell</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                                <td className={styles.td}>From 10:00-06/24/2021 to 10:00-06/24/2021</td>
                            </tr>
                        </table>
                        <Pagination
                            className={styles.Pagination}
                        // count={data.total % 10 > 0 ? Math.floor(data.total / 10) + 1 : data.total / 10}
                        // page={page}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className={styles.des}>
                        <div className={styles.con}>
                            <p className={styles.titleDes}>Description </p>
                            {/* <label className={styles.label}>{data.auction.description}</label> */}
                            <p className={styles.label}>
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
                                deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <input className={styles.btnCancel} type="button" value="Cancel" onClick={Cancel}></input>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AuctionDetailForSeller;
