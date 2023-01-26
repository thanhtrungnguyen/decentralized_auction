import styles from "../../../styleCss/stylesComponents/forManager/approveAuction.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker, { DateObject } from "react-multi-date-picker";
// import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "./styles.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";

const ApproveAuction = ({ auctionId, propertyId }) => {
    const axios = useAxiosPrivate();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [registrationFee, setRegistrationFee] = useState(null);
    const [name, setName] = useState(null);
    const [startRegistrationTime, setStartRegistrationTime] = useState(new Date());
    const [endRegistrationTime, setEndRegistrationTime] = useState(new Date());
    const [startAuctionTime, setStartAuctionTime] = useState(new Date());
    const [endAuctionTime, setEndAuctionTime] = useState(new Date());
    const [duePaymentTime, setDuePaymentTime] = useState(new Date());
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "registrationFee") {
            setRegistrationFee(value);
        }
        if (id === "name") {
            setName(value);
        }
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
        if (!registrationFee.trim()) {
            notify("🦄 registrationFee is empty");
        } else if (!name.trim()) {
            notify("🦄 name is empty");
        } else {
            axios
                .patch(`http://localhost:5000/api/auction/approve/${auctionId}`, {
                    name: name,
                    startRegistrationTime: new Date(startRegistrationTime),
                    endRegistrationTime: new Date(endRegistrationTime),
                    startAuctionTime: new Date(startAuctionTime),
                    endAuctionTime: new Date(endAuctionTime),
                    duePaymentTime: new Date(duePaymentTime),
                    registrationFee: registrationFee.trim(),
                    property: propertyId,
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    window.location.reload(false);
                    setExpanded(false);
                    navigate("/auctionListForManager");
                })
                .catch((err) => {
                    notify(`🦄 Create Failed: ${err.response.data.message}, ${err}`);
                });
        }
        event.preventDefault();
    };
    const handCancel = () => {
        setExpanded(false);
    };
    return (
        <>
            {expanded ? (
                <div className={styles.container}>
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
                        <p className={styles.title}>Approve Auction</p>
                        <p className={styles.txt}>Auction Name</p>
                        <input className={styles.input} id="name" type="text" value={name} onChange={(e) => handleInputChange(e)} required></input>
                        <p className={styles.txt}>Registration Fee</p>
                        <input
                            className={styles.input}
                            id="registrationFee"
                            type="text"
                            value={registrationFee}
                            onChange={(e) => handleInputChange(e)}
                            required
                        ></input>
                        <p className={styles.txt}>Time Registration</p>
                        <div className={styles.fl}>
                            <label className={styles.lb}>From:</label>
                            <DatePicker
                                id="startRegistrationTime"
                                onChange={setStartRegistrationTime}
                                value={startRegistrationTime}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker position="bottom" />]}
                                required
                            />
                            <label className={styles.lb}>To:</label>
                            <DatePicker
                                id="endRegistrationTime"
                                onChange={setEndRegistrationTime}
                                value={endRegistrationTime}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker position="bottom" />]}
                                required
                            />
                        </div>
                        <p className={styles.txt}>Auction Time</p>
                        <div className={styles.fl}>
                            <label className={styles.lb}>From:</label>
                            <DatePicker
                                id="startAuctionTime"
                                onChange={setStartAuctionTime}
                                value={startAuctionTime}
                                format="MM/DD/YYYY HH:mm:ss"
                                required
                                plugins={[<TimePicker position="bottom" />]}
                            />
                            <label className={styles.lb}>To:</label>
                            <DatePicker
                                id="endAuctionTime"
                                onChange={setEndAuctionTime}
                                value={endAuctionTime}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker position="bottom" />]}
                                required
                            />
                        </div>
                        <p className={styles.txt}>Due payment time</p>
                        <div className={styles.fl}>
                            <label className={styles.lb}>Time:</label>
                            <DatePicker
                                id="duePaymentTime"
                                onChange={setDuePaymentTime}
                                value={duePaymentTime}
                                format="MM/DD/YYYY HH:mm:ss"
                                plugins={[<TimePicker position="bottom" />]}
                                required
                            />
                        </div>
                        <br />
                        <input type="submit" value="OK" className={styles.btnOK}></input>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default ApproveAuction;
