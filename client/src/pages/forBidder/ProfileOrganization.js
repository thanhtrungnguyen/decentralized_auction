// import "../../styleCss/stylesPages/forBidder/ProfileOrganization.css";
import styles from "../../styleCss/stylesPages/forBidder/profile.module.css";

import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import Loading from "../../components/loading/Loading";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import HeaderUser from "../../components/header/HeaderUser";
import PageName from "../../components/header/PageName";
import FooterCopy from "../../components/footer/FooterCopy";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { LogoutButton } from "../../components/buttons/LogoutButton";

const ProfileOrganization = () => {
    const axios = useAxiosPrivate();
    const { id } = useParams();
    const baseURL = `/organization/getByUserId/${id}`;
    const { data, loading, error } = useFetch(baseURL);
    const navigate = useNavigate();
    const [role, setRole] = useState();
    console.log(data);

    const handleClick = () => {
        navigate(`/editProfileOrganization/${id}`);
    };
    const Cancel = () => {
        navigate(`/homePage`);
    };

    return loading ? (
        <Loading />
    ) : (
        <>
            <NavBar />
            <PageName pageName={"Profile"} link={`profile/${id}`} home={"homePage"} />

            <div className="containers2">
                <div className={styles.content2}>
                    <p className={styles.title}>Organization Information</p>
                    <p className={styles.if}>Basic Information</p>
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Organization Name</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Mr</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Tax Code</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Hero</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Tax Code Granted Date</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Male</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Tax Code Granted Place</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>02/06/2000</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Organization Specific Address</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>abcxyz@gmail.com</label>
                        </div>
                    </div>
                    <p className={styles.title}>Personal Information</p>
                    <p className={styles.if}>Basic Information</p>
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>First Name</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Mr</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Last Name</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Hero</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Gender</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Male</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Date Of Birth</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>02/06/2000</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Email</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>abcxyz@gmail.com</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Phone</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>0987654321</label>
                        </div>
                    </div>
                    <p className={styles.if}>Address</p>
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Province/City</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Mr</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>District</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Hero</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Wards</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Male</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Specific Address</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>02/06/2000</label>
                        </div>
                    </div>
                    <br />

                    <p className={styles.if}>Citizen Card</p>
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Card Number </label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Mr</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Card Granted Date</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Hero</label>
                        </div>
                    </div>
                    <br />

                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <label className={styles.txt}>Card Granted Place</label>
                        </div>
                        <div className={styles.r}>
                            <label className={styles.txt2}>Male</label>
                        </div>
                    </div>
                    <br />
                    <div className={styles.fl}>
                        <div className={styles.l}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/C%C4%83n_c%C6%B0%E1%BB%9Bc_c%C3%B4ng_d%C3%A2n_g%E1%BA%AFn_ch%C3%ADp_m%E1%BA%B7t_tr%C6%B0%E1%BB%9Bc.jpg/640px-C%C4%83n_c%C6%B0%E1%BB%9Bc_c%C3%B4ng_d%C3%A2n_g%E1%BA%AFn_ch%C3%ADp_m%E1%BA%B7t_tr%C6%B0%E1%BB%9Bc.jpg"
                                className={styles.img}
                            ></img>
                        </div>
                        <div className={styles.r}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/C%C4%83n_c%C6%B0%E1%BB%9Bc_c%C3%B4ng_d%C3%A2n_g%E1%BA%AFn_ch%C3%ADp_m%E1%BA%B7t_tr%C6%B0%E1%BB%9Bc.jpg/640px-C%C4%83n_c%C6%B0%E1%BB%9Bc_c%C3%B4ng_d%C3%A2n_g%E1%BA%AFn_ch%C3%ADp_m%E1%BA%B7t_tr%C6%B0%E1%BB%9Bc.jpg"
                                className={styles.img}
                            ></img>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {/* <LogoutButton /> */}
                    <button className={styles.btn2} >
                        Back
                    </button>
                    <button className={styles.btn2} >
                        Change Password
                    </button>
                    <button
                        className={styles.btn2}
                        onClick={() => {
                            navigate("/editProfileOrganization");
                        }}
                    >
                        Edit
                    </button>
                </div>
                <Footer />
                <FooterCopy />
                {/* <div className="container">
                    <p className="title">Organization Information</p>
                    <br />
                    <br />
                    <br />
                    <p className="bold">Organization Information</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="row">
                        <label className="label">Organization name</label>
                        <input type="text" className="input" value={data.account.Name} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Tax Code</label>
                        <input type="text" className="input" value={data.account.Tax_Code__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Tax Code Granted Date</label>
                        <input type="text" className="input" value={data.account.Tax_Code_Granted_Date__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Tax Code Granted Place</label>
                        <input type="text" className="input" value={data.account.Tax_Code_Granted_Place__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Specific Address</label>
                        <input type="text" className="input" value={data.account.Specific_Address__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Position</label>
                        <input type="text" className="input" value={data.position} readOnly></input>
                    </div>
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
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p className="bold">Basic Information</p>
                    <br />
                    <br />
                    <br />
                    <br />

                    <div className="row">
                        <label className="label">First Name</label>
                        <input type="text" className="input" value={data.contact.First_Name__c}></input>
                    </div>
                    <div className="row">
                        <label className="label">Last Name</label>
                        <input type="text" className="input" value={data.contact.Last_Name__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Gender</label>
                        <input type="text" className="input" value={data.contact.Gender__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Date Of Birth</label>
                        <input type="text" className="input" value={data.contact.Date_Of_Birth__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Email</label>
                        <input type="text" className="input" value={data.contact.Email__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Phone number</label>
                        <input type="text" className="input" value={data.contact.Phone__c} readOnly></input>
                    </div>
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
                    <br />
                    <br />
                    <br />
                    <br />

                    <p className="bold">Address</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="row">
                        <label className="label">Province/City</label>
                        <input type="text" className="input" value={data.contact.City__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">District</label>
                        <input type="text" className="input" value={data.contact.District__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Wards</label>
                        <input type="text" className="input" value={data.contact.Wards__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Specific address</label>
                        <input type="text" className="input" value={data.contact.Address__c} readOnly></input>
                    </div>
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
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <p className="bold">Identity/Citizen Card</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="row">
                        <label className="label">Card number</label>
                        <input type="text" className="input" value={data.contact.Card_Number__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Card granted date</label>
                        <input type="text" className="input" value={data.contact.Card_Granted_Date__c} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Card granted place</label>
                        <input type="text" className="input" value={data.contact.Card_Granted_Place__c} readOnly></input>
                    </div>

                    <img className="img" src={`http://localhost:8800/api/auction/images/${data.contact.Font_Side_Image__c}`} alt="images" />
                    <img className="img2" src={`http://localhost:8800/api/auction/images/${data.contact.Back_Side_Image__c}`} alt="images" />
                
                </div>
                <div className="conBtn">
                <button className="btnCancel" onClick={Cancel}>
                            Cancel
                        </button>
                    <button className="btn" onClick={handleClick}>
                        Edit Profile
                    </button>
                </div>
                <Footer />
                <FooterCopy /> */}
            </div>
        </>
    );
};
export default ProfileOrganization;
