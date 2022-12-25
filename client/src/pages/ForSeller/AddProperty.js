import styles from "../../styleCss/stylesPages/forSellers/AddProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarSeller";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useFetch } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";

const AddProperty = () => {
    // const [date, setDate] = useState([
    //   new DateObject().setDay(15),
    //   new DateObject().add(1, "month").setDay(15),
    // ]);
    const [propertyImage1, setPropertyImage1] = useState(null);
    const [propertyImage2, setPropertyImage2] = useState(null);
    const [propertyImage3, setPropertyImage3] = useState(null);
    const [propertyVideo, setPropertyVideo] = useState(null);
    const [propertyName, setPropertyName] = useState(null);
    const [category, setCategory] = useState("Chair");
    const [propertyDescription, setPropertyDescription] = useState(null);
    const [startBid, setStartBid] = useState(null);
    const [deposit, setDeposit] = useState(null);
    const [priceStep, setPriceStep] = useState(null);
    const [placeViewProperty, setPlaceViewProperty] = useState(null);
    // const [startBid, setStartBid] = useState(null);
    const [viewPropertyTime, setViewPropertyTime] = useState([new DateObject().setDay(15), new DateObject().add(1, "month").setDay(15)]);

    const navigate = useNavigate();
    const baseURL = "http://localhost:8800/api/category/";
    const { data, loading, error } = useFetch(baseURL);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "propertyImage1") {
            setPropertyImage1(e.target.files[0]);
        }
        if (id === "propertyImage2") {
            setPropertyImage2(e.target.files[0]);
        }
        if (id === "propertyImage3") {
            setPropertyImage3(e.target.files[0]);
        }
        if (id === "propertyVideo") {
            setPropertyVideo(value);
        }
        if (id === "propertyName") {
            setPropertyName(value);
        }
        if (id === "category") {
            setCategory(value);
        }
        if (id === "propertyDescription") {
            setPropertyDescription(value);
        }
        if (id === "startBid") {
            setStartBid(value);
        }
        if (id === "deposit") {
            setDeposit(value);
        }
        if (id === "priceStep") {
            setPriceStep(value);
        }
        if (id === "placeViewProperty") {
            setPlaceViewProperty(value);
        }
        // if (id === "startBid") {
        //   setStartBid(value);
        // }
        if (id === "viewPropertyTime") {
            setViewPropertyTime(value);
        }
    };
    const Cancel = () => {
        navigate("/myProperty");
    };
    const handleSubmit = (event) => {
        const formData = new FormData();
        formData.append("propertyImage1", propertyImage1);
        formData.append("propertyImage2", propertyImage2);
        formData.append("propertyImage3", propertyImage3);
        formData.append("propertyVideo", propertyVideo);
        formData.append("propertyName", propertyName);
        formData.append("category", category);
        formData.append("propertyDescription", propertyDescription);
        formData.append("viewPropertyTime", viewPropertyTime);
        formData.append("startBid", startBid);
        formData.append("deposit", deposit);
        formData.append("priceStep", priceStep);
        formData.append("placeViewProperty", placeViewProperty);
        console.log(formData);
        // formData.append("startBid", startBid);
        // formData.append("biddingPreiod", biddingPreiod);
        axios
            .post("http://localhost:8800/api/property", formData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                navigate("/myProperty");
            });

        event.preventDefault();
    };
    const [selectedImage, setSelectedImage] = useState();

    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
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
                if (getUser().role == "SELLER") {
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
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <p className={styles.lable}>Property Video</p>
                                <p className={styles.lable}>Property Name</p>
                                <p className={styles.lable}>Category</p>
                                <p className={styles.lable}>Start Bid</p>
                                <p className={styles.lable}>Deposit</p>
                                <p className={styles.lable}>Price Step</p>
                                <p className={styles.lable}>Place View Property</p>
                                <p className={styles.lable}>View Property Time</p>
                                <p className={styles.lable}>Property Description</p>
                            </div>
                            <div className={styles.col2}>
                                {/* <input accept="image/*" type="file" onChange={imageChange} /> */}
                                <input
                                    className={styles.inputImg}
                                    id="propertyImage1"
                                    onChange={(e) => handleInputChange(e)}
                                    type="file"
                                    required
                                ></input>
                                <input
                                    className={styles.inputImg}
                                    id="propertyImage2"
                                    onChange={(e) => handleInputChange(e)}
                                    type="file"
                                    required
                                ></input>
                                <input
                                    className={styles.inputImg}
                                    id="propertyImage3"
                                    onChange={(e) => handleInputChange(e)}
                                    type="file"
                                    required
                                ></input>
                                <div className={styles.conImg}>
                                    {" "}
                                    {propertyImage1 && <img src={URL.createObjectURL(propertyImage1)} className={styles.image} alt="Thumb" />}{" "}
                                    {propertyImage2 && <img src={URL.createObjectURL(propertyImage2)} className={styles.image} alt="Thumb" />}{" "}
                                    {propertyImage3 && <img src={URL.createObjectURL(propertyImage3)} className={styles.image} alt="Thumb" />}
                                </div>

                                <br />
                                <input
                                    className={styles.inputText}
                                    type="text"
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
                                <select
                                    className={styles.drop}
                                    onChange={(e) => handleInputChange(e)}
                                    id="category"
                                    placeholder="Category"
                                    defaultValue="Chair"
                                >
                                    {data.map((item) => (
                                        <option value={item.Name}>{item.Name}</option>
                                    ))}
                                </select>
                                <input
                                    id="startBid"
                                    type="number"
                                    placeholder="Enter Start Bid"
                                    className={styles.inputText}
                                    value={startBid}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                                <input
                                    id="deposit"
                                    type="text"
                                    placeholder="Enter Deposit"
                                    className={styles.inputText}
                                    value={deposit}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                                <input
                                    id="priceStep"
                                    type="number"
                                    placeholder="Enter Price Step"
                                    className={styles.inputText}
                                    value={priceStep}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                                <input
                                    id="placeViewProperty"
                                    type="text"
                                    placeholder="Enter Place View Property"
                                    className={styles.inputText}
                                    value={placeViewProperty}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                                <DatePicker
                                    id="placeViewProperty"
                                    // onChange={(e) => handleInputChange(e)}
                                    onChange={setViewPropertyTime}
                                    ClassName={styles.datePicker}
                                    value={viewPropertyTime}
                                    // onChange={setValue}
                                    range
                                    numberOfMonths={2}
                                    format="MM/DD/YYYY HH:mm:ss"
                                    plugins={[<TimePicker />]}
                                />
                                <textarea
                                    id="propertyDescription"
                                    value={propertyDescription}
                                    className={styles.textarea}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.auction}>
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
          </div> */}
                    <div className={styles.btn}>
                        <input className={styles.btnSave} type="submit" value="Save"></input>
                        {/* 
            <input
              className={styles.btnDraft}
              type="button"
              value="Save as Draft"
            ></input> */}
                        <input className={styles.btnCancel} type="button" value="Cancel" onClick={Cancel}></input>
                    </div>

                    <Footer />
                </div>
            </form>
        </>
    );
};
export default AddProperty;
