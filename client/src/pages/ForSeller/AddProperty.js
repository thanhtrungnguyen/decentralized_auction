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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";

import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import { ToastContainer, toast } from "react-toastify";
// import "./styles.css";
const AddProperty = () => {
    const axios = useAxiosPrivate();
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
    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();
    const baseURL = "/category/categories";
    const { data, loading } = useFetch(baseURL);
    const [role, setRole] = useState();
    const [isVideo, setIsVideo] = useState(false);

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
        const videoEl = document.createElement("video");
        videoEl.src = window.URL.createObjectURL(propertyVideo);
        console.log(window.URL.createObjectURL(propertyVideo));
        videoEl.onloadedmetadata = (event) => {
            setIsVideo(true);
            window.URL.revokeObjectURL(videoEl.src);
            const { name, type } = propertyVideo;
            const { videoWidth, videoHeight } = videoEl;

            console.log(`Filename: ${name} - Type: ${type} - Size: ${videoWidth}px x ${videoHeight}px`);
        };

        videoEl.onerror = () => {
            setIsVideo(false);
            console.log("Please upload a video file.");
        };
        const fpropertyImage1 = propertyImage1.size;
        const fI1 = Math.round(fpropertyImage1 / 1024);
        const fpropertyImage2 = propertyImage2.size;
        const fI2 = Math.round(fpropertyImage2 / 1024);
        const fpropertyImage3 = propertyImage3.size;
        const fI3 = Math.round(fpropertyImage3 / 1024);
        const fpropertyVideo = propertyVideo.size;
        const fV = Math.round(fpropertyVideo / 1024);
        var idxDot1 = propertyImage1.name.lastIndexOf(".") + 1;
        var extFile1 = propertyImage1.name.substring(idxDot1, propertyImage1.length).toLowerCase();
        var idxDot2 = propertyImage2.name.lastIndexOf(".") + 1;
        var extFile2 = propertyImage2.name.substring(idxDot2, propertyImage2.length).toLowerCase();
        var idxDot3 = propertyImage3.name.lastIndexOf(".") + 1;
        var extFile3 = propertyImage3.name.substring(idxDot3, propertyImage3.length).toLowerCase();
        if (category === "null") {
            notify("🦄 Please select category");
        } else if (!propertyName.trim()) {
            notify("🦄 propertyName is empty");
        } else if (!propertyDescription.trim()) {
            notify("🦄 propertyDescription is empty");
        } else if (!startBid.trim()) {
            notify("🦄 startBid is empty");
        } else if (!deposit.trim()) {
            notify("🦄 deposit is empty");
        } else if (!priceStep.trim()) {
            notify("🦄 priceStep is empty");
        } else if (!placeViewProperty.trim()) {
            notify("🦄 placeViewProperty is empty");
        } else if (fI1 > 2048) {
            notify("🦄 Image 1, please select a file less than 2mb");
        } else if (fI2 > 2048) {
            notify("🦄 Image 2, please select a file less than 2mb");
        } else if (fI3 > 2048) {
            notify("🦄 Image 3, please select a file less than 2mb");
        } else if (fV > 10240) {
            notify("🦄 Video, please select a file less than 10mb");
        } else if (startBid * 0.2 < deposit) {
            notify("🦄 Deposit must less than 20% start bid");
        } else if (startBid * 0.1 < priceStep) {
            notify("🦄 Price Step must less than 10% start bid");
        } else if (startBid <= 0) {
            notify("🦄 Start Bid must more than 0 ");
        } else if (deposit <= 0) {
            notify("🦄 Deposit must more than 0 ");
        } else if (priceStep <= 0) {
            notify("🦄 Price Step must more than 0 ");
        } else if (extFile1 !== "jpg" && extFile1 !== "jpeg" && extFile1 !== "png") {
            notify("🦄 Image 1 Only jpg/jpeg and png files are allowed");
        } else if (extFile2 !== "jpg" && extFile2 !== "jpeg" && extFile2 !== "png") {
            notify("🦄 Image 2 Only jpg/jpeg and png files are allowed");
        } else if (extFile3 !== "jpg" && extFile3 !== "jpeg" && extFile3 !== "png") {
            notify("🦄 Image 3 Only jpg/jpeg and png files are allowed");
        } else if (!isVideo) {
            notify("🦄 Video Only video files are allowed. Please select again");
        } else {
            setDisable(true);
            console.log(disable);
            const formData = new FormData();
            formData.append("propertyImage1", propertyImage1);
            formData.append("propertyImage2", propertyImage2);
            formData.append("propertyImage3", propertyImage3);
            formData.append("propertyVideo", propertyVideo);
            formData.append("name", propertyName.trim());
            formData.append("category", category);
            formData.append("description", propertyDescription.trim());
            formData.append("startViewPropertyTime", viewPropertyTime[0]);
            formData.append("endViewPropertyTime", viewPropertyTime[1]);
            formData.append("startBid", startBid.trim());
            formData.append("depositAmount", deposit.trim());
            formData.append("priceStep", priceStep.trim());
            formData.append("placeViewProperty", placeViewProperty.trim());
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
                    setDisable(false);
                    console.log(disable);
                })
                .catch((err) => {
                    notify(`${err.response.data.message} , ${err}`);
                    setDisable(false);
                    console.log(disable);
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

    return loading ? (
        <Loading />
    ) : (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.root}>
                    <SideBarSeller />
                    <Time />
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
                                        accept=".png, .jpg, .jpeg"
                                        required
                                    ></input>
                                    <input
                                        className={styles.inputImg}
                                        id="propertyImage2"
                                        onChange={(e) => handleInputChange(e)}
                                        accept=".png, .jpg, .jpeg"
                                        type="file"
                                        required
                                    ></input>
                                    <input
                                        className={styles.inputImg}
                                        id="propertyImage3"
                                        onChange={(e) => handleInputChange(e)}
                                        accept=".png, .jpg, .jpeg"
                                        type="file"
                                        required
                                    ></input>
                                    <div className={styles.conImg}>
                                        {" "}
                                        {propertyImage1 && (
                                            <img src={URL.createObjectURL(propertyImage1)} className={styles.image} alt="Thumb" />
                                        )}{" "}
                                        {propertyImage2 && <img src={URL.createObjectURL(propertyImage2)} className={styles.image2} alt="Thumb" />}{" "}
                                        {propertyImage3 && <img src={URL.createObjectURL(propertyImage3)} className={styles.image3} alt="Thumb" />}
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
                                        type="text"
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
                        <input
                            className={styles.btnSave}
                            type="submit"
                            value="Save"
                            style={disable ? { backgroundColor: "red" } : {}}
                            disabled={disable}
                        ></input>

                        <input className={styles.btnCancel} type="button" value="Cancel" onClick={Cancel}></input>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddProperty;
