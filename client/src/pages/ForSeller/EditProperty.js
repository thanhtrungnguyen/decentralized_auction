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
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const EditProperty = () => {
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
    const baseURLCategory = `http://localhost:8800/api/category`;
    const [role, setRole] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURLCategory).then((resp) => {
                console.log(resp.data);
                console.log("axios get");

                setlistCategory(resp.data);
            });
            await axios.get(baseURLProperty).then((resp) => {
                console.log(resp.data);
                setPropertyName(resp.data.Name);
                setCategory(resp.data.Category_Id__r.Name);
                setPropertyVideo(resp.data.Properties_Media__r.records[3].Name);
                setPropertyDescription(resp.data.Description__c);
                setStartBid(resp.data.Start_Bid__c);
                setDeposit(resp.data.Deposit_Amount__c);
                setPriceStep(resp.data.Price_Step__c);
                setPlaceViewProperty(resp.data.Place_View_Property__c);
                setStatus(resp.data.Status__c);
                setViewPropertyTime([
                    new Date(resp.data.Start_View_Property_Time__c).setTime(
                        new Date(resp.data.Start_View_Property_Time__c).getTime() - 7 * 60 * 60 * 1000
                    ),
                    new Date(resp.data.End_View_Property_Time__c).setTime(
                        new Date(resp.data.End_View_Property_Time__c).getTime() - 7 * 60 * 60 * 1000
                    ),
                ]);
                setData(resp.data);
            });

            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }

            setLoading(false);
        };
        fetchData();
    }, [baseURLCategory]);

    const baseURLProperty = `http://localhost:8800/api/property/getById/${id}`;

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

    const handleSubmit = (event) => {
        console.log(propertyImage1);
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
        formData.append("_method", "PUT");
        formData.append("status", status);
        // formData.append("startBid", startBid);
        // formData.append("biddingPreiod", biddingPreiod);
        axios
            .put(`http://localhost:8800/api/property/${id}`, formData, {
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
                        <input className={styles.btnSave} type="submit" value="Save "></input>

                        <input className={styles.btnCancel} type="button" value="Cancel"></input>
                    </div>

                    <Footer />
                </div>
            </form>
        </>
    );
};
export default EditProperty;
