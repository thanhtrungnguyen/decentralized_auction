import styles from "../../../styleCss/stylesComponents/forManager/approveAuction.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker, { DateObject } from "react-multi-date-picker";
// import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import axios from "../../../config/axiosConfig";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "./styles.css";
const ApproveAuction = ({ idProperty }) => {
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
    const handleSubmit = (event) => {
        console.log(idProperty);
        axios
            .put(`/category/changeStatus/${idProperty}`, idProperty, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                //navigate("/listBidders");
                window.location.reload(false);
            });
        setExpanded(false);

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
                        <p className={styles.title}>Approve Auction</p>
                        <p className={styles.txt}>Auction Name</p>
                        <input className={styles.input} type="text" value={name} onChange={(e) => handleInputChange(e)} required></input>
                        <p className={styles.txt}>Registration Fee</p>
                        <input className={styles.input} type="text" value={registrationFee} onChange={(e) => handleInputChange(e)} required></input>
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
