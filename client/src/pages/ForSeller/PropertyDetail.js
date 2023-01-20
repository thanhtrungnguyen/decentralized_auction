import styles from "../../styleCss/stylesPages/forSellers/AddProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarSeller";
import Footer from "../../components/footer/Footer";
import SidebarSeller from "../../components/sidebar_seller/SidebarSeller";
// import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
// import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
// import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "../../config/axiosConfig";
import { useFetcher, useParams } from "react-router-dom";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
const PropertyDetail = () => {
    // const [date, setDate] = useState([
    //   new DateObject().setDay(15),
    //   new DateObject().add(1, "month").setDay(15),
    // ]);
    const { id } = useParams();
    const navigate = useNavigate();

    const baseURL = `http://localhost:5000/api/property/${id}`;

    const [role, setRole] = useState();
    const Cancel = () => {
        navigate("/myProperty");
    };
    const { data, loading, error } = useFetch(baseURL);

    const [viewPropertyTime, setViewPropertyTime] = useState([new DateObject().setDay(15), new DateObject().add(1, "month").setDay(15)]);
    // const getUser = () => {
    //     var users = null;
    //     const token = Cookies.get("access_token");
    //     if (!token) {
    //         console.log("Not authenticated");
    //     }
    //     jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
    //         users = user;
    //     });
    //     return users;
    // };
    return loading ? (
        <Loading />
    ) : (
        <>
            <form>
                <div className={styles.root2}>
                    <SidebarSeller />
                    <Time />
                    <div className={styles.info2}>
                        <div>
                            <p className={styles.title}>Basic Information</p>

                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Image</p>
                                </div>
                                <div className={styles.r}>
                                    <img className={styles.img} src={`${data.property.mediaUrl[0]}`} alt="images" />
                                    <img className={styles.img} src={`${data.property.mediaUrl[1]}`} alt="images" />
                                    <img className={styles.img} src={`${data.property.mediaUrl[2]}`} alt="images" />
                                </div>
                            </div>
                            <br />
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Video</p>
                                </div>
                                <div className={styles.r}>
                                    <video
                                        className={styles.video}
                                        src={`${data.property.mediaUrl[3]}`}
                                        playing={true}
                                        controls={true}
                                        loop={true}
                                        muted={true}
                                        playsinline={true}
                                        onReady={true}
                                        width="40%"
                                        height="90%"
                                    />
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Name</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.property.name}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Category</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.property.category.name}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Start Bid</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.property.startBid}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Deposit</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.property.depositAmount}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Price Step</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.property.priceStep}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Place View Property</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.property.placeViewProperty}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>View Property Time</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>
                                        From: {new Date(data.property.startViewPropertyTime).toLocaleString()} - To:{" "}
                                        {new Date(data.property.endViewPropertyTime).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Description</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.property.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.btn}>
                        <input className={styles.btnCancel2} type="button" value="Cancel" onClick={Cancel}></input>
                    </div>
                </div>
            </form>
        </>
    );
};
export default PropertyDetail;
