import "../../styleCss/stylesPages/forBidder/ProfileOrganization.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import Loading from "../../components/loading/Loading";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import HeaderUser from "../../components/header/HeaderUser";
import PageName from "../../components/header/PageName";
import FooterCopy from "../../components/footer/FooterCopy";
import { useNavigate } from "react-router-dom";

const ProfileOrganization = () => {
    const { id } = useParams();
    const baseURL = `http://localhost:8800/api/user/${id}`;
    const { data, loading, error } = useFetch(baseURL);
    const navigate = useNavigate();
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
    console.log(data);
    console.log(loading);
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
    const handleClick = () => {
        navigate(`/editProfileOrganization/${id}`);
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
            })()}
            <NavBar />
            <PageName pageName={"Profile"} link={`profile/${id}`} home={"homePage"} />

            <div className="con">
                <div className="container">
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
                        <input type="text" className="input" value={data.account.Name} readOnly></input>
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
                    {/* <p className="bold">Account Information</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="row">
                        <label className="label">Username</label>
                        <input type="text" className="input" value={data.username} readOnly></input>
                    </div>
                    <div className="row">
                        <label className="label">Password</label>
                        <input type="password" className="input" value={data.password} readOnly></input>
                    </div> */}
                </div>
                <div className="conBtn">
                    <button className="btn" onClick={handleClick}>
                        Edit Profile
                    </button>
                </div>
                <Footer />
                <FooterCopy />
            </div>
        </>
    );
};
export default ProfileOrganization;
