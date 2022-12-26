import styles from "../../styleCss/stylesPages/forSellers/AddProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import Popup from "reactjs-popup";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const AuctionDetailForManager = () => {
    // const [date, setDate] = useState([
    //   new DateObject().setDay(15),
    //   new DateObject().add(1, "month").setDay(15),
    // ]);
    const { id, propertyId } = useParams();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const baseURL = `http://localhost:8800/api/auction/auctiondetail/${id}/${propertyId}`;
    const [registrationFee, setRegistrationFee] = useState(null);
    const [name, setName] = useState(null);
    const [timeRegistration, setTimeRegistration] = useState([new DateObject().setDay(15), new DateObject().add(1, "month").setDay(15)]);

    const [auctionTime, setAuctionTime] = useState([new DateObject().setDay(15), new DateObject().add(1, "month").setDay(15)]);

    const { data, loading, error } = useFetch(baseURL);
    const onClick = () => {
        console.log(show);

        setShow(false);
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "registrationFee") {
            setRegistrationFee(value);
        }
        if (id === "name") {
            setName(value);
        }
    };
    var startviewTime = data.End_View_Property_Time__c || "";
    var startViewPropertyTime = new Date(startviewTime.split(",")[0]);
    var daySTView = parseInt(startViewPropertyTime.getUTCDate());

    const AprroveAuction = () => {
        alert(name + registrationFee + timeRegistration + auctionTime);
        axios
            .put(
                "http://localhost:8800/api/auction/approve/" + id,
                {
                    registrationFee: registrationFee,
                    timeRegistration: timeRegistration,
                    auctionTime: auctionTime,
                    name: name,
                    propertyId: propertyId,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
            });
    };
    const RejectAuction = () => {
        axios
            .put(
                "http://localhost:8800/api/auction/reject/" + id,
                {
                    propertyId: propertyId,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
            });
    };
    const Cancel = () => {
        navigate("/autionsListForManager");
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
    const convertDateTime = (time)=>{
        var startRegistrationTime = new Date(time);
        var startRegistrationTimeVN = startRegistrationTime.setTime(startRegistrationTime.getTime() - 7 * 60 * 60 * 1000);
        
        return new Date( new Date(startRegistrationTimeVN).toUTCString());
    }
    return loading ? (
        <Loading/>
    ) : (
        <>
            {(() => {
                if (getUser().role == "MANAGER") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />
            <form>
                <div className={styles.root}>
                    <SideBarSeller />
                    <div className={styles.info}>
                        <div>
                            <p className={styles.title}>Property Information</p>

                            <div className={styles.col1}>
                                <p className={styles.lable}>Property Image</p>
                                <p className={styles.lable}>Property Video</p>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
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
                                {/* <img
                  className={styles.img}
                  src="https://www.w3schools.com/html/pic_trulli.jpg"
                  alt="images"
                /> */}
                                <img
                                    className={styles.img}
                                    src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[0].Name}`}
                                    alt="images"
                                />
                                {/* <img
                  className={styles.img}
                  src="https://www.w3schools.com/html/pic_trulli.jpg"
                  alt="images"
                /> */}
                                <img
                                    className={styles.img}
                                    src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[1].Name}`}
                                    alt="images"
                                />
                                <img
                                    className={styles.img}
                                    src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[2].Name}`}
                                    alt="images"
                                />
                                <div className={styles.video}>
                                    <ReactPlayer
                                        className={styles.video}
                                        url={`${data.Properties_Media__r.records[3].Name}`}
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
                                {/* <img
                  className={styles.img}
                  src={`http://localhost:8800/api/auction/images/${data[0].Properties_Media__r.records[2].Name}`}
                  alt="images"
                /> */}
                                {/* <input
                  className={styles.inputImg}
                  id="propertyImage"
                  type="file"
                  multiple
                  required
                ></input>
                <br />
                <input
                  className={styles.inputImg}
                  type="file"
                  id="propertyVideo"
                  required
                  //   defaultValue={data.property.propertyVideo}
                ></input> */}
                                <input
                                    id="propertyName"
                                    type="text"
                                    placeholder="Enter Property Name"
                                    className={styles.inputText}
                                    value={data.Name}
                                    readonly
                                ></input>
                                <select
                                    className={styles.drop}
                                    id="cagetory"
                                    placeholder="Category"
                                    // value={data.Category_Id__r.Name}
                                    // defaultValue={data.Category_Id__r.Name}
                                    readonly
                                >
                                    <option value={data.Category_Id__r.Name}>{data.Category_Id__r.Name}</option>
                                    {/* <option value={data.property.category}>{data.property.category}</option> */}

                                    {/* {data.map((property) => (
                  <option value={property.category}>{property.category}</option>
                ))} */}
                                </select>
                                <input
                                    id="startBid"
                                    type="number"
                                    placeholder="Enter Start Bid"
                                    className={styles.inputText}
                                    // value={startBid}
                                    value={data.Start_Bid__c}
                                    // value={"123"}
                                    required
                                ></input>
                                <input
                                    id="deposit"
                                    type="text"
                                    placeholder="Enter Deposit"
                                    className={styles.inputText}
                                    // value={deposit}
                                    value={data.Deposit_Amount__c}
                                    // value={"123"}
                                    required
                                    readonly
                                ></input>
                                <input
                                    id="priceStep"
                                    type="number"
                                    placeholder="Enter Price Step"
                                    className={styles.inputText}
                                    // value={priceStep}
                                    value={data.Price_Step__c}
                                    // value={"321"}
                                    required
                                    readonly
                                ></input>
                                <input
                                    id="placeViewProperty"
                                    type="text"
                                    placeholder="Enter Place View Property"
                                    className={styles.inputText}
                                    // value={placeViewProperty}
                                    value={data.Place_View_Property__c}
                                    // value={"Ha Noi"}
                                    required
                                    readonly
                                ></input>
                                {/* <div className={styles.date}> */}
                                <DatePicker
                                    id="placeViewProperty"
                                    // onChange={(e) => handleInputChange(e)}
                                    // onChange={setViewPropertyTime}
                                    ClassName={styles.datePicker}
                                    value={[
                                        convertDateTime(data.Start_View_Property_Time__c),
                                        convertDateTime(data.End_View_Property_Time__c),
                                    ]}
                                    //   value={data.property.viewPropertyTime}
                                    // onChange={setValue}
                                    range
                                    numberOfMonths={2}
                                    format="MM/DD/YYYY HH:mm:ss"
                                    plugins={[<TimePicker />]}
                                    readOnly
                                />
                                {/* </div> */}
                                <textarea
                                    id="propertyDescription"
                                    // value={propertyDescription}
                                    value={data.Description__c}
                                    // value={
                                    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                    // }
                                    className={styles.textarea}
                                    required
                                ></textarea>{" "}
                            </div>
                        </div>
                    </div>
                    <div className={styles.auctionForm}>
                        <p className={styles.title}>Auction</p>
                        <div className={styles.col1}>
                            {" "}
                            <p className={styles.lable}>Auction Name</p>
                            <p className={styles.lable}>Registration Fee</p>
                            <p className={styles.lable}>Time Registration</p>
                            <p className={styles.lable}>Auction Time</p>
                        </div>
                        <div className={styles.col2}>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter Auction Name"
                                className={styles.inputText}
                                // value={priceStep}
                                // value={data.property.priceStep}
                                value={data.Auctions1__r.records[0].Name}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            <input
                                id="registrationFee"
                                type="number"
                                placeholder="Enter Registration Fee"
                                className={styles.inputText}
                                // value={priceStep}
                                // value={data.property.priceStep}
                                value={data.Auctions1__r.records[0].RegistrationFee__c}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            {/* <div className={styles.date}> */}
                            <DatePicker
                                id="timeRegistration"
                                // onChange={(e) => handleInputChange(e)}
                                onChange={setTimeRegistration}
                                ClassName={styles.datePicker}
                                value={[
                                    convertDateTime(data.Auctions1__r.records[0].Start_Registration_Time__c),
                                    convertDateTime(data.Auctions1__r.records[0].End_Registration_Time__c)
                                ]}
                                //   value={data.property.viewPropertyTime}
                                // onChange={setValue}
                                range
                                numberOfMonths={2}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker />]}
                            />
                            {/* </div> */}
                            <br />
                            {/* <div className={styles.date}> */}
                            <DatePicker
                                id="auctionTime"
                                // onChange={(e) => handleInputChange(e)}
                                onChange={setAuctionTime}
                                ClassName={styles.datePicker}
                                value={[
                                    convertDateTime(data.Auctions1__r.records[0].Start_Aution_Time__c),
                                    convertDateTime(data.Auctions1__r.records[0].End_Auction_Time__c),
                                ]}
                                //   value={data.property.viewPropertyTime}
                                // onChange={setValue}
                                range
                                numberOfMonths={2}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker />]}
                            />
                            {/* </div> */}
                        </div>
                    </div>
                    <div className={styles.btn2}>
                        {/* <input className={styles.btnSave2} type="button" value="Save and Publish" onClick={() => AprroveAuction()}></input> */}

                        {/* <Popup
                            visible={show}
                            trigger={<input className={styles.btnSave2} type="button" value="Save and Publish"></input>}
                            position="right center"
                        >
                            <div className={styles.popup}>
                                <label className={styles.title}>Save and Publish this auction</label>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className={styles.btnCancel} type="button" value="Cancel" onClick={onClick}></input>
                                <input className={styles.btnSave2} type="button" value="Save and Publish" onClick={() => AprroveAuction()}></input>
                            </div>
                        </Popup> */}
                        {/* <input className={styles.btnDraft} type="button" value="Reject Request Add" onClick={() => RejectAuction()}></input> */}
                        {/* <Popup trigger={<input className={styles.btnDraft} type="button" value="Reject Request Add"></input>} position="right center">
                            <div className={styles.popup}>
                                <label className={styles.title}>Reject Request Add this auction</label>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className={styles.btnCancel} type="button" value="Cancel" onClick={onClick}></input>
                                <input className={styles.btnSave2} type="button" value="Reject Request Add" onClick={() => RejectAuction()}></input>
                            </div>
                        </Popup> */}

                        <input className={styles.btnCancel} type="button" value="Cancel" onClick={Cancel}></input>
                    </div>{" "}
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default AuctionDetailForManager;
