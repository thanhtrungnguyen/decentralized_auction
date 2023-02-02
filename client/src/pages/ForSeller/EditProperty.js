import styles from "../../styleCss/stylesPages/forSellers/AddProperty.module.css";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import HeaderUser from "../../components/header/HeaderUser";
import Comments from "./components/comment";
import { ToastContainer, toast } from "react-toastify";
import Time from "../../components/time/Time";
const EditProperty = () => {
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
    const [category, setCategory] = useState("Chair");
    const [listCategory, setlistCategory] = useState([]);

    const [propertyDescription, setPropertyDescription] = useState(null);
    const [startBid, setStartBid] = useState(null);
    const [deposit, setDeposit] = useState(null);
    const [priceStep, setPriceStep] = useState(null);
    const [placeViewProperty, setPlaceViewProperty] = useState(null);
    // const [startBid, setStartBid] = useState(null);
    const [viewPropertyTime, setViewPropertyTime] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState([]);
    const [status, setStatus] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();
    const baseURLCategory = "/category/categories";
    const [role, setRole] = useState();
    const [error, setError] = useState(false);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURLCategory).then((resp) => {
                console.log(resp.data);
                setlistCategory(resp.data);
            });
            await axios.get(baseURLProperty).then((resp) => {
                console.log(resp.data);
                setData(resp.data);
                setPropertyName(resp.data.property.name);
                setCategory(resp.data.property.category._id);
                // setPropertyVideo(resp.data.property.mediaUrl[3]);
                setPropertyDescription(resp.data.property.description);
                setStartBid(resp.data.property.startBid);
                setDeposit(resp.data.property.depositAmount);
                setPriceStep(resp.data.property.priceStep);
                setPlaceViewProperty(resp.data.property.placeViewProperty);
                // setStatus(resp.data.Status__c);
                setViewPropertyTime([new Date(resp.data.property.startViewPropertyTime), new Date(resp.data.property.endViewPropertyTime)]);
            });

            setLoading(false);
        };
        fetchData();
    }, []);

    const baseURLProperty = `/property/${id}`;

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
    const handleSubmit = (event) => {
        var fI1, fI2, fI3, fV;
        if (propertyImage1) {
            const fpropertyImage1 = propertyImage1.size;
            fI1 = Math.round(fpropertyImage1 / 1024);
        }
        if (propertyImage2) {
            const fpropertyImage2 = propertyImage2.size;
            fI2 = Math.round(fpropertyImage2 / 1024);
        }
        if (propertyImage3) {
            const fpropertyImage3 = propertyImage3.size;
            fI3 = Math.round(fpropertyImage3 / 1024);
        }
        if (propertyVideo) {
            const fpropertyVideo = propertyVideo.size;
            fV = Math.round(fpropertyVideo / 1024);
        }

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
            notify("🦄 Video, please select a file less than 4mb");
        } else if (startBid * 0.2 < deposit) {
            notify("🦄 Deposit must less than 20% start bid");
        } else if (startBid * 0.1 < priceStep) {
            notify("🦄 Price Step must less than 10% start bid");
        } else {
            setDisable(true);

            console.log(propertyImage1);
            const formData = new FormData();
            formData.append("propertyImage1", propertyImage1);
            formData.append("propertyImage2", propertyImage2);
            formData.append("propertyImage3", propertyImage3);
            formData.append("propertyVideo", propertyVideo);
            formData.append("name", propertyName.trim());
            formData.append("category", category.trim());
            formData.append("description", propertyDescription.trim());
            formData.append("startViewPropertyTime", viewPropertyTime[0]);
            formData.append("endViewPropertyTime", viewPropertyTime[1]);
            formData.append("startBid", startBid.trim());
            formData.append("depositAmount", deposit.trim());
            formData.append("priceStep", priceStep.trim());
            formData.append("placeViewProperty", placeViewProperty.trim());
            formData.append("status", "Modified");
            // formData.append("startBid", startBid);
            // formData.append("biddingPreiod", biddingPreiod);
            axios
                .patch(
                    `/property/update/${id}`,
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
                    setDisable(false);

                    alert("Edit property successfully!!!");
                    navigate("/myProperty");
                })
                .catch((err) => {
                    setDisable(false);

                    alert(`🦄 Failed: ${err.response.data.message}, ${err}`);
                });
        }
        event.preventDefault();
    };

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
                    <Comments />
                    <div className={styles.info}>
                        <div>
                            <p className={styles.title}>Basic Information</p>

                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Image</p>
                                </div>
                                <div className={styles.r}>
                                    <input className={styles.inputImg} id="propertyImage1" onChange={(e) => handleInputChange(e)} type="file"></input>
                                    <input className={styles.inputImg} id="propertyImage2" onChange={(e) => handleInputChange(e)} type="file"></input>
                                    <input className={styles.inputImg} id="propertyImage3" onChange={(e) => handleInputChange(e)} type="file"></input>
                                    <div className={styles.conImg}>
                                        {" "}
                                        {propertyImage1 == null ? (
                                            <img src={data.property.mediaUrl[0]} className={styles.image} alt="Thumb" />
                                        ) : (
                                            <img src={URL.createObjectURL(propertyImage1)} className={styles.image} alt="Thumb" />
                                        )}{" "}
                                        {propertyImage2 == null ? (
                                            <img src={data.property.mediaUrl[1]} className={styles.image} alt="Thumb" />
                                        ) : (
                                            <img src={URL.createObjectURL(propertyImage2)} className={styles.image} alt="Thumb" />
                                        )}{" "}
                                        {propertyImage3 == null ? (
                                            <img src={data.property.mediaUrl[2]} className={styles.image} alt="Thumb" />
                                        ) : (
                                            <img src={URL.createObjectURL(propertyImage3)} className={styles.image} alt="Thumb" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Video</p>
                                </div>
                                <div className={styles.r}>
                                    <input className={styles.inputImg} id="propertyVideo" onChange={(e) => handleInputChange(e)} type="file"></input>
                                    <div className={styles.conImg}>
                                        {propertyVideo == null ? (
                                            <video
                                                src={data.property.mediaUrl[3]}
                                                playing={true}
                                                controls={true}
                                                loop={true}
                                                muted={true}
                                                playsinline={true}
                                                onReady={true}
                                                width="40%"
                                                height="90%"
                                                className={styles.video}
                                                alt="Thumb"
                                            />
                                        ) : (
                                            <video src={URL.createObjectURL(propertyVideo)} className={styles.video} controls />
                                        )}
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
                                    <select
                                        className={styles.drop}
                                        onChange={(e) => handleInputChange(e)}
                                        id="category"
                                        placeholder="Category"
                                        defaultValue={data.property.category._id}
                                    >
                                        {listCategory?.categories.map((item) => (
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
                                        style={{ with: "752px" }}
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
                            style={disable ? { backgroundColor: "red" } : { backgroundColor: "violet" }}
                            disabled={disable}
                        ></input>

                        <input className={styles.btnCancel} type="button" value="Cancel" onClick={Cancel} disabled={disable}></input>
                    </div>
                </div>
                {/* <div className={styles.root}>
                    <SideBarSeller />
                    <Time />
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
                                <input className={styles.inputImg} id="propertyImage1" onChange={(e) => handleInputChange(e)} type="file"></input>
                                <input className={styles.inputImg} id="propertyImage2" onChange={(e) => handleInputChange(e)} type="file"></input>
                                <input className={styles.inputImg} id="propertyImage3" onChange={(e) => handleInputChange(e)} type="file"></input>
                                <div className={styles.conImg}>
                                    {propertyImage1 == null && (
                                        <img
                                            src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[0].Name}`}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                    {propertyImage1 != null && <img src={URL.createObjectURL(propertyImage1)} className={styles.image} alt="Thumb" />}
                                    {propertyImage2 == null && (
                                        <img
                                            src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[1].Name}`}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                    {propertyImage2 != null && <img src={URL.createObjectURL(propertyImage2)} className={styles.image} alt="Thumb" />}
                                    {propertyImage3 == null && (
                                        <img
                                            src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[2].Name}`}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                    {propertyImage3 != null && <img src={URL.createObjectURL(propertyImage3)} className={styles.image} alt="Thumb" />}
                                </div>

                                <br />
                                <input
                                    className={styles.inputText}
                                    type="text"
                                    id="propertyVideo"
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                    defaultValue={data.Properties_Media__r.records[3].Name}
                                ></input>
                                <input
                                    id="propertyName"
                                    type="text"
                                    pattern="^\s*([^\s]\s*){0,100}$"
                                    placeholder="Enter Property Name"
                                    className={styles.inputText}
                                    value={propertyName}
                                    onChange={(e) => handleInputChange(e)}
                                    defaultValue={data.Name}
                                    required
                                ></input>
                                <select
                                    className={styles.drop}
                                    onChange={(e) => handleInputChange(e)}
                                    id="category"
                                    placeholder="Category"
                                    defaultValue={data.Category_Id__r.Name}
                                >
                                    {listCategory.map((item) => (
                                        <option value={item.Name}>{item.Name}</option>
                                    ))}
                                </select>
                                <input
                                    id="startBid"
                                    type="text"
                                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                                    placeholder="Enter Start Bid"
                                    className={styles.inputText}
                                    value={startBid}
                                    onChange={(e) => handleInputChange(e)}
                                    defaultValue={data.Start_Bid__c}
                                    required
                                ></input>
                                <input
                                    id="deposit"
                                    type="text"
                                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                                    placeholder="Enter Deposit"
                                    className={styles.inputText}
                                    value={deposit}
                                    onChange={(e) => handleInputChange(e)}
                                    defaultValue={data.Deposit_Amount__c}
                                    required
                                ></input>
                                <input
                                    id="priceStep"
                                    type="text"
                                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                                    placeholder="Enter Price Step"
                                    className={styles.inputText}
                                    value={priceStep}
                                    onChange={(e) => handleInputChange(e)}
                                    defaultValue={data.Price_Step__c}
                                    required
                                ></input>
                                <input
                                    id="placeViewProperty"
                                    type="text"
                                    pattern="^\s*([^\s]\s*){0,100}$"
                                    placeholder="Enter Place View Property"
                                    className={styles.inputText}
                                    value={placeViewProperty}
                                    onChange={(e) => handleInputChange(e)}
                                    defaultValue={data.Place_View_Property__c}
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
                                    //   defaultValue={data.property.placeViewProperty}
                                />
                                <textarea
                                    id="propertyDescription"
                                    pattern="^\s*([^\s]\s*){0,}$"
                                    value={propertyDescription}
                                    className={styles.textarea}
                                    onChange={(e) => handleInputChange(e)}
                                    defaultValue={data.Description__c}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    =
                    <div className={styles.btn}>
                        <input className={styles.btnSave} type="submit" value="Save "></input>

                        <input className={styles.btnCancel} type="button" value="Cancel"></input>
                    </div>
                </div> */}
            </form>
        </>
    );
};
export default EditProperty;
