import styles from "../../styleCss/stylesPages/forSellers/AddProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarSeller";
// import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
// import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
// import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";

const EditAuction = () => {
    // const [date, setDate] = useState([
    //   new DateObject().setDay(15),
    //   new DateObject().add(1, "month").setDay(15),
    // ]);
    const [propertyImage, setPropertyImage] = useState(null);
    const [propertyVideo, setPropertyVideo] = useState(null);
    const [propertyName, setPropertyName] = useState(null);
    const [cagetory, setCategory] = useState("Car");
    const [propertyDescription, setPropertyDescription] = useState(null);
    const [startBid, setStartBid] = useState(null);
    const [biddingPreiod, setBiddingPreiod] = useState([new DateObject().setDay(15), new DateObject().add(1, "month").setDay(15)]);
    const navigate = useNavigate();
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
        setLoading(false);
    }, []);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "propertyImage") {
            setPropertyImage(e.target.files);
        }
        if (id === "propertyVideo") {
            setPropertyVideo(e.target.files[0]);
        }
        if (id === "propertyName") {
            setPropertyName(value);
        }
        if (id === "cagetory") {
            setCategory(value);
        }
        if (id === "propertyDescription") {
            setPropertyDescription(value);
        }
        if (id === "startBid") {
            setStartBid(value);
        }
        if (id === "biddingPreiod") {
            setBiddingPreiod(value);
        }
    };

    const handleSubmit = (event) => {
        const formData = new FormData();
        for (let i = 0; i < propertyImage.length; i++) {
            formData.append(`propertyImage${i}`, propertyImage[i]);
        }
        formData.append("propertyVideo", propertyVideo);
        formData.append("propertyName", propertyName);
        formData.append("cagetory", cagetory);
        formData.append("propertyDescription", propertyDescription);
        formData.append("startBid", startBid);
        formData.append("biddingPreiod", biddingPreiod);
        axios
            .put("/EditAuction", formData)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert("Edit Auction successfully!!!");
                navigate("/myAuctions");
            })
            .catch((err) => {
                alert(`🦄 Failed: ${err.response.data.message}`);
            });
        console.log(formData);
        for (const [key, value] of formData) {
            console.log(key + ": " + value);
        }

        event.preventDefault();
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
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}{" "}
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className={styles.root}>
                    <SideBarSeller />
                    <div className={styles.info}>
                        <div>
                            <p className={styles.title}>Basic Information</p>

                            <div className={styles.col1}>
                                <p className={styles.lable}>Property Image</p>
                                <p className={styles.lable}>Property Video</p>
                                <p className={styles.lable}>Property Name</p>
                                <p className={styles.lable}>Category</p>
                                <p className={styles.lable}>Property Description</p>
                            </div>
                            <div className={styles.col2}>
                                <input
                                    className={styles.inputImg}
                                    id="propertyImage"
                                    onChange={(e) => handleInputChange(e)}
                                    type="file"
                                    multiple
                                    required
                                ></input>
                                <br />
                                <input
                                    className={styles.inputImg}
                                    type="file"
                                    id="propertyVideo"
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                                <input
                                    id="propertyName"
                                    type="text"
                                    placeholder="Enter Property Name"
                                    className={styles.inputText}
                                    value={propertyName}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                            </div>

                            <select
                                className={styles.drop}
                                onChange={(e) => handleInputChange(e)}
                                id="cagetory"
                                placeholder="Category"
                                defaultValue="volvo"
                            >
                                <option value="Car">Car</option>
                                <option value="Table">Table</option>
                                <option value="Chair">Chair</option>
                            </select>
                            <textarea
                                id="propertyDescription"
                                value={propertyDescription}
                                className={styles.textarea}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className={styles.auction}>
                        <p className={styles.title}>Auction</p>
                        <div className={styles.col1}>
                            <p className={styles.lable}>Start bid</p>
                            <p className={styles.lable}>Bidding Period</p>
                        </div>
                        <div className={styles.col2}>
                            <input
                                id="startBid"
                                type="number"
                                placeholder="Enter Start bid"
                                className={styles.inputText}
                                onChange={(e) => handleInputChange(e)}
                                value={startBid}
                                required
                            ></input>
                            <DatePicker
                                id="biddingPreiod"
                                // onChange={(e) => handleInputChange(e)}
                                onChange={setBiddingPreiod}
                                ClassName={styles.datePicker}
                                value={biddingPreiod}
                                // onChange={setValue}
                                range
                                numberOfMonths={2}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker />]}
                            />
                        </div>
                    </div>
                    <div className={styles.btn}>
                        <input className={styles.btnSave} type="submit" value="Save and Pulish"></input>

                        <input className={styles.btnDraft} type="button" value="Save as Draft"></input>
                        <input className={styles.btnCancel} type="button" value="Cancel"></input>
                    </div>

                    {/* <Footer /> */}
                </div>
            </form>
        </>
    );
};
export default EditAuction;
