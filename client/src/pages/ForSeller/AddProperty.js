import styles from "../../styleCss/stylesPages/forSellers/AddProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarSeller";
import Footer from "../../components/footer/Footer";
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
import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import { ToastContainer, toast } from "react-toastify";
// import "./styles.css";
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
    const [category, setCategory] = useState("null");
    const [propertyDescription, setPropertyDescription] = useState(null);
    const [startBid, setStartBid] = useState(null);
    const [deposit, setDeposit] = useState(null);
    const [priceStep, setPriceStep] = useState(null);
    const [placeViewProperty, setPlaceViewProperty] = useState(null);
    // const [startBid, setStartBid] = useState(null);
    const [viewPropertyTime, setViewPropertyTime] = useState([new DateObject().setDay(15), new DateObject().add(1, "month").setDay(15)]);

    const navigate = useNavigate();
    const baseURL = "http://localhost:5000/api/category/categories";
    const { data, loading } = useFetch(baseURL);
    const [role, setRole] = useState();
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
    }, []);
    const notify = (message) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
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
            setPropertyVideo(e.target.files[0]);
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
        if (category === "null") {
            notify("🦄 Please select category");
        } else {
            const formData = new FormData();
            formData.append("propertyImage1", propertyImage1);
            formData.append("propertyImage2", propertyImage2);
            formData.append("propertyImage3", propertyImage3);
            formData.append("propertyVideo", propertyVideo);
            formData.append("name", propertyName);
            formData.append("category", category);
            formData.append("description", propertyDescription);
            formData.append("startViewPropertyTime", viewPropertyTime[0]);
            formData.append("endViewPropertyTime", viewPropertyTime[1]);
            formData.append("startBid", startBid);
            formData.append("depositAmount", deposit);
            formData.append("priceStep", priceStep);
            formData.append("placeViewProperty", placeViewProperty);
            formData.append("user", "63bd8531cc9d75cd8780454c");

            // formData.append("startBid", startBid);
            // formData.append("biddingPreiod", biddingPreiod);

            axios
                .post(
                    "/property/create",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    },
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    if (res.data.success === true) {
                        alert(res.data.message);
                        navigate("/myProperty");
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    notify(`${err.response.data.message} , ${err}`);
                });
        }

        event.preventDefault();
    };
    // const [selectedImage, setSelectedImage] = useState();

    // This function will be triggered when the file field change
    // const imageChange = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setSelectedImage(e.target.files[0]);
    //     }
    // };
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
            <form onSubmit={handleSubmit}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
                <div className={styles.root}>
                    <SideBarSeller />
                    <Time />
                    <div className={styles.info}>
                        <div>
                            <p className={styles.title}>Basic Information</p>

                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Image</p>
                                </div>
                                <div className={styles.r}>
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
                                        {propertyImage1 && (
                                            <img src={URL.createObjectURL(propertyImage1)} className={styles.image} alt="Thumb" />
                                        )}{" "}
                                        {propertyImage2 && <img src={URL.createObjectURL(propertyImage2)} className={styles.image} alt="Thumb" />}{" "}
                                        {propertyImage3 && <img src={URL.createObjectURL(propertyImage3)} className={styles.image} alt="Thumb" />}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Video</p>
                                </div>
                                <div className={styles.r}>
                                    {/* <input
                                        className={styles.inputText}
                                        type="text"
                                        id="propertyVideo"
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    ></input> */}
                                    <input
                                        className={styles.inputImg}
                                        id="propertyVideo"
                                        onChange={(e) => handleInputChange(e)}
                                        type="file"
                                        required
                                    ></input>
                                    <div className={styles.conImg}>
                                        {propertyVideo && <video src={URL.createObjectURL(propertyVideo)} className={styles.video} controls />}{" "}
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Name</p>
                                </div>
                                <div className={styles.r}>
                                    <input
                                        id="propertyName"
                                        type="text"
                                        pattern="^\s*([^\s]\s*){0,100}$"
                                        placeholder="Enter Property Name"
                                        className={styles.inputText}
                                        value={propertyName}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    ></input>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Category</p>
                                </div>
                                <div className={styles.r}>
                                    <select className={styles.inputText} onChange={(e) => handleInputChange(e)} id="category" placeholder="Category">
                                        <option value="null">---------Select Category---------</option>
                                        {data?.categories.map((item) => (
                                            <option value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Start Bid</p>
                                </div>
                                <div className={styles.r}>
                                    <input
                                        id="startBid"
                                        type="text"
                                        pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                                        placeholder="Enter Start Bid"
                                        className={styles.inputText}
                                        value={startBid}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    ></input>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Deposit</p>
                                </div>
                                <div className={styles.r}>
                                    <input
                                        id="deposit"
                                        type="text"
                                        pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                                        placeholder="Enter Deposit"
                                        className={styles.inputText}
                                        value={deposit}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    ></input>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Price Step</p>
                                </div>
                                <div className={styles.r}>
                                    <input
                                        id="priceStep"
                                        type="number"
                                        pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                                        placeholder="Enter Price Step"
                                        className={styles.inputText}
                                        value={priceStep}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    ></input>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Place View Property</p>
                                </div>
                                <div className={styles.r}>
                                    <input
                                        id="placeViewProperty"
                                        type="text"
                                        pattern="^\s*([^\s]\s*){0,100}$"
                                        placeholder="Enter Place View Property"
                                        className={styles.inputText}
                                        value={placeViewProperty}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    ></input>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>View Property Time</p>
                                </div>
                                <div className={styles.r}>
                                    <DatePicker
                                        style={{ width: "746px" }}
                                        id="viewPropertyTime"
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
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Description</p>
                                </div>
                                <div className={styles.r}>
                                    <textarea
                                        id="propertyDescription"
                                        pattern="^\s*([^\s]\s*){0,}$"
                                        value={propertyDescription}
                                        className={styles.textarea}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.btn}>
                        <input className={styles.btnSave} type="submit" value="Save"></input>

                        <input className={styles.btnCancel} type="button" value="Cancel" onClick={Cancel}></input>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddProperty;
