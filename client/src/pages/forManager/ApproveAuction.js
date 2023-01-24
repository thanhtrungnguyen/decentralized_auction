import styles from "../../styleCss/stylesPages/forManagers/ApproveAuction.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
// import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
// import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
// import Popup from "reactjs-popup";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import "../../styleCss/stylesPages/forManagers/Approve.css";
import Popup from "reactjs-popup";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import SidebarManager from "../../components/sidebar_manager/SidebarManager";
import ApproveAuction from "../../components/popups/forManager/ApproveAuction";
import RejectAuction from "../../components/popups/forManager/RejectAuction";
const PropertyDetail = () => {
    const axios = useAxiosPrivate();
    // const [date, setDate] = useState([
    //   new DateObject().setDay(15),
    //   new DateObject().add(1, "month").setDay(15),
    // ]);
    const [role, setRole] = useState();

    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const navigate = useNavigate();
    const baseURL = `http://localhost:5000/api/auction/${id}`;
    const [registrationFee, setRegistrationFee] = useState(null);
    const [name, setName] = useState(null);
    const [timeRegistration, setTimeRegistration] = useState([new DateObject().setDay(15), new DateObject().add(1, "month").setDay(15)]);

    const [auctionTime, setAuctionTime] = useState([new DateObject().setDay(15), new DateObject().add(1, "month").setDay(15)]);

    const [paymentTime, setPaymentTime] = useState(new Date());

    const { data, loading } = useFetch(baseURL);
    const onClick = () => {
        //console.log(show);

        setShow(false);
    };

    const onTrue = () => {
        setShow(true);
        console.log(show);
    };
    const onClick2 = () => {
        console.log(show);

        setShow2(false);
    };

    const onTrue2 = () => {
        setShow2(true);
        console.log(show);
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
    // var daySTView = parseInt(startViewPropertyTime.getUTCDate());

    const AprroveAuction = () => {
        // alert(name + registrationFee + timeRegistration + auctionTime);
        axios
            .put(
                "/auction/approve/" + id,
                {
                    registrationFee: registrationFee,
                    timeRegistration: timeRegistration,
                    auctionTime: auctionTime,
                    name: name,
                    paymentTime: paymentTime,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                alert("Approve Auction successfully!!!");
                navigate("/auctionListForManager");
            })
            .catch((err) => {
                alert(`🦄 Failed: ${err.response.data.message} , ${err}`);
            });
    };
    // const RejectAuction = () => {
    //     axios
    //         .put(
    //             "http://localhost:8800/api/auction/reject/" + id,
    //             {
    //                 propertyId: propertyId,
    //             },
    //             {
    //                 withCredentials: true,
    //             }
    //         )
    //         .then((res) => {
    //             console.log(res);
    //             console.log(res.data);
    //             alert(res.data.message);
    //         });
    // };
    const Cancel = () => {
        navigate("/auctionListForManager");
    };
    const Approve = () => {
        return <ApproveAuction idProperty="12" />;
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
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
    }, []);
    return loading ? (
        <Loading />
    ) : (
        <>
            <form>
                <div className={styles.root}>
                    <SidebarManager />
                    <Time />
                    <div className={styles.info}>
                        <div>
                            <p className={styles.title}>Property Information</p>

                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Image</p>
                                </div>
                                <div className={styles.r}>
                                    <img className={styles.img} src={`${data.auction.property.mediaUrl[0]}`} alt="images" />
                                    <img className={styles.img} src={`${data.auction.property.mediaUrl[1]}`} alt="images" />
                                    <img className={styles.img} src={`${data.auction.property.mediaUrl[2]}`} alt="images" />
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
                                        src={`${data.auction.property.mediaUrl[3]}`}
                                        playing={true}
                                        controls={true}
                                        loop={true}
                                        muted={true}
                                        playsinline={true}
                                        onReady={true}
                                        width="350px"
                                        height="200px"
                                    />
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Name</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.auction.property.name}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Category</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.auction.property.category.name}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Start Bid</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.auction.property.startBid}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Deposit</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.auction.property.depositAmount}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Price Step</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.auction.property.priceStep}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Place View Property</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.auction.property.placeViewProperty}</p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>View Property Time</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>
                                        From: {new Date(data.auction.property.startViewPropertyTime).toLocaleString()} - To:{" "}
                                        {new Date(data.auction.property.endViewPropertyTime).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    <p className={styles.lable}>Property Description</p>
                                </div>
                                <div className={styles.r}>
                                    <p className={styles.txt}>{data.auction.property.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.btn}></div>
                    <div className={styles.btn}>
                        <Popup trigger={<label className={styles.btnSave}> Approve</label>} position="right center">
                            <ApproveAuction auctionId={data.auction._id} propertyId={data.auction.property._id} />
                        </Popup>
                        <Popup trigger={<label className={styles.btnSave2}> Reject</label>} position="right center">
                            <RejectAuction auctionId={data.auction._id} />
                        </Popup>

                        <input className={styles.btnCancel} type="button" value="Cancel" onClick={Cancel}></input>
                    </div>
                </div>
                {/* <div className={styles.root}>
                    <SideBarSeller />
                    <Time />
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
                                <img
                                    className={styles.img}
                                    src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[0].Name}`}
                                    alt="images"
                                />
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
                                    <video
                                        className={styles.video}
                                        src={`${data.property.mediaUrl[3]}`}
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
                                <input
                                    id="propertyName"
                                    type="text"
                                    placeholder="Enter Property Name"
                                    className={styles.inputText}
                                    value={data.property.name}
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
                                </select>
                                <input
                                    id="startBid"
                                    type="number"
                                    placeholder="Enter Start Bid"
                                    className={styles.inputText}
                                    // value={startBid}
                                    value={data.property.startBid}
                                    // value={"123"}
                                    required
                                ></input>
                                <input
                                    id="deposit"
                                    type="text"
                                    placeholder="Enter Deposit"
                                    className={styles.inputText}
                                    // value={deposit}
                                    value={data.property.depositAmount}
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
                                    value={data.property.priceStep}
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
                                    value={data.property.placeViewProperty}
                                    // value={"Ha Noi"}
                                    required
                                    readonly
                                ></input>
                                <DatePicker
                                    wrapperClassName={styles.datePicker}
                                    id="placeViewProperty"
                                    // onChange={(e) => handleInputChange(e)}
                                    // onChange={setViewPropertyTime}
                                    value={[
                                        new Date(data.property.startViewPropertyTime).toLocaleString(),
                                        new Date(data.property.endViewPropertyTime).toLocaleString(),
                                    ]}
                                    //   value={data.property.viewPropertyTime}
                                    // onChange={setValue}
                                    range
                                    numberOfMonths={2}
                                    format="MM/DD/YYYY HH:mm:ss"
                                    plugins={[<TimePicker />]}
                                    readOnly
                                />
                                <textarea
                                    id="propertyDescription"
                                    // value={propertyDescription}
                                    value={data.property.description}
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
                            <p className={styles.lable}>PaymentTime Time</p>
                        </div>
                        <div className={styles.col2}>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter Auction Name"
                                className={styles.inputText}
                                // value={priceStep}
                                // value={data.property.priceStep}
                                value={name}
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
                                value={registrationFee}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>

                            <DatePicker
                                id="timeRegistration"
                                // onChange={(e) => handleInputChange(e)}
                                onChange={setTimeRegistration}
                                ClassName={styles.datePicker}
                                value={timeRegistration}
                                //   value={data.property.viewPropertyTime}
                                // onChange={setValue}
                                range
                                numberOfMonths={2}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker />]}
                            />

                            <br />

                            <DatePicker
                                id="auctionTime"
                                // onChange={(e) => handleInputChange(e)}
                                onChange={setAuctionTime}
                                ClassName={styles.datePicker}
                                value={auctionTime}
                                //   value={data.property.viewPropertyTime}
                                // onChange={setValue}
                                range
                                numberOfMonths={2}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker />]}
                            />

                            <DatePicker selected={paymentTime} onChange={setPaymentTime} format="MM/DD/YYYY HH:mm:ss" plugins={[<TimePicker />]} />
                        </div>
                    </div>
                    <div className={styles.btn2}>
                        <input className={styles.btnSave2} type="button" value="Save and Publish" onClick={onTrue2}></input>
                        {show2 && (
                            <div className={styles.popup}>
                                <label className={styles.title}>Save and Publish this auction</label>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className={styles.btnCancel} type="button" value="Cancel" onClick={onClick2}></input>
                                <input className={styles.btnSave2} type="button" value="Save and Publish" onClick={() => AprroveAuction()}></input>
                            </div>
                        )}

                        <input className={styles.btnDraft} type="button" value="Reject Request Add" onClick={onTrue}></input>
                        {show && (
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
                        )}

                        <input className={styles.btnCancel} type="button" value="Cancel" onClick={Cancel}></input>
                    </div>
                </div> */}
            </form>
        </>
    );
};
export default PropertyDetail;
