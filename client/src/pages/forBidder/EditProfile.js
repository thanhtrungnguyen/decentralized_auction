import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import HeaderUser from "../../components/header/HeaderUser";
import PageName from "../../components/header/PageName";
import FooterCopy from "../../components/footer/FooterCopy";
import { useNavigate } from "react-router-dom";
import useLocationForm from "../register/useLocationForm";
import Select from "react-select";
import "../../styleCss/stylesPages/forBidder/Profile.css";

const EditProfile = () => {
    const { id, propertyId } = useParams();
    const baseURL = `http://localhost:8800/api/user/${id}`;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setData(resp.data);
            });

            setLoading(false);
        }
        fetchData();
    }, [baseURL]);
    console.log(data);
    console.log(loading);
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);

    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

    const [firstName, setFirstName] = useState(null);
    const [lastName, setlastName] = useState(null);
    const [gender, setgender] = useState("Male");
    const [dateOfBirth, setdateOfBirth] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [specificAddress, setSpecificAddress] = useState(null);
    const [cardNumber, setcardNumber] = useState(null);
    const [dateRangeCard, setdateRangeCard] = useState(null);
    const [cardGrantedPlace, setCardGrantedPlace] = useState(null);
    const [cardFront, setCardFront] = useState(null);
    const [cardBack, setCardBack] = useState(null);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setlastName(value);
        }
        if (id === "gender") {
            setgender(value);
        }
        if (id === "dateOfBirth") {
            setdateOfBirth(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "phone") {
            setPhone(value);
        }
        if (id === "specificAddress") {
            setSpecificAddress(value);
        }
        if (id === "cardNumber") {
            setcardNumber(value);
        }
        if (id === "dateRangeCard") {
            setdateRangeCard(value);
        }
        if (id === "cardGrantedPlace") {
            setCardGrantedPlace(value);
        }
        if (id === "cardFront") {
            setCardFront(e.target.files[0]);
        }
        if (id === "cardBack") {
            setCardBack(e.target.files[0]);
        }
    };
    const handleSubmit = (event) => {
        let cityId = selectedCity.value;
        let districtId = selectedDistrict.value;
        let wardId = selectedWard.value;

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("gender", gender);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("cityId", cityId);
        formData.append("city", selectedCity.label);
        formData.append("districtId", districtId);
        formData.append("district", selectedDistrict.label);
        formData.append("wardId", wardId);
        formData.append("ward", selectedWard.label);
        formData.append("specificAddress", specificAddress);
        formData.append("cardNumber", cardNumber);
        formData.append("dateRangeCard", dateRangeCard);
        formData.append("cardGrantedPlace", cardGrantedPlace);
        formData.append("cardFront", cardFront);
        formData.append("cardBack", cardBack);

        axios
            .put(
                "http://localhost:8800/api/editProfile",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                navigate(`profile/${id}`);
            });
        console.log(formData);

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

    const Cancel = () => {
        navigate(`/profile/${id}`);
    };
    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (getUser().role === "BIDDER") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />
            <PageName pageName={"Edit Profile"} link={`editProfile/${id}`} home={"homePage"} />

            <div className="con">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <p className="title">Personal Information</p>
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
                            <input
                                type="text"
                                className="input"
                                value={firstName}
                                onChange={(e) => handleInputChange(e)}
                                id="firstName"
                                defaultValue={data.contact.First_Name__c}
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Last Name</label>
                            <input
                                type="text"
                                className="input"
                                value={lastName}
                                onChange={(e) => handleInputChange(e)}
                                defaultValue={data.contact.Last_Name__c}
                                id="lastName"
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Gender</label>
                            <select
                                id="gender"
                                className="input"
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Gender"
                                value={gender}
                                defaultValue={data.contact.Gender__c}
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="row">
                            <label className="label">Date of birth</label>
                            <input
                                type="date"
                                className="input"
                                defaultValue={data.contact.Date_Of_Birth__c}
                                value={dateOfBirth}
                                onChange={(e) => handleInputChange(e)}
                                id="dateOfBirth"
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Email</label>
                            <input
                                className="input"
                                type="email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                value={email}
                                defaultValue={data.contact.Phone__c}
                                onChange={(e) => handleInputChange(e)}
                                id="email"
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Phone number</label>
                            <input
                                type="number"
                                className="input"
                                value={phone}
                                onChange={(e) => handleInputChange(e)}
                                id="phone"
                                defaultValue={data.contact.Phone__c}
                                required
                            ></input>
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
                            <Select
                                className="input"
                                name="cityId"
                                key={`cityId_${selectedCity?.value}`}
                                isDisabled={cityOptions.length === 0}
                                options={cityOptions}
                                onChange={(option) => onCitySelect(option)}
                                placeholder="Tỉnh/Thành"
                                defaultValue={data.contact.City__c}
                                required
                            />
                        </div>
                        <div className="row">
                            <label className="label">District</label>
                            <Select
                                className="input"
                                name="districtId"
                                key={`districtId_${selectedDistrict?.value}`}
                                isDisabled={districtOptions.length === 0}
                                options={districtOptions}
                                onChange={(option) => onDistrictSelect(option)}
                                placeholder="Quận/Huyện"
                                defaultValue={data.contact.District__c}
                                required
                            />
                        </div>
                        <div className="row">
                            <label className="label">Wards</label>
                            <Select
                                className="input"
                                name="wardId"
                                key={`wardId_${selectedWard?.value}`}
                                isDisabled={wardOptions.length === 0}
                                options={wardOptions}
                                placeholder="Phường/Xã"
                                onChange={(option) => onWardSelect(option)}
                                defaultValue={data.contact.Wards__c}
                                selected={wardOptions === data.contact.Wards__c}
                                required
                            />
                        </div>
                        <div className="row">
                            <label className="label">Specific address</label>
                            <input
                                type="text"
                                className="input"
                                value={specificAddress}
                                onChange={(e) => handleInputChange(e)}
                                id="specificAddress"
                                defaultValue={data.contact.Address__c}
                                required
                            ></input>
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
                            <input
                                type="text"
                                className="input"
                                value={cardNumber}
                                onChange={(e) => handleInputChange(e)}
                                id="cardNumber"
                                defaultValue={data.contact.Card_Number__c}
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Card granted date</label>
                            <input
                                type="date"
                                className="input"
                                value={dateRangeCard}
                                onChange={(e) => handleInputChange(e)}
                                id="dateRangeCard"
                                defaultValue={data.contact.Card_Granted_Date__c}
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Card granted place</label>
                            <input
                                type="text"
                                className="input"
                                onChange={(e) => handleInputChange(e)}
                                id="cardGrantedPlace"
                                defaultValue={data.contact.Card_Granted_Place__c}
                                required
                            ></input>
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
                        <input className="ipImg" id="cardFront" type="file" accept="image/*" onChange={(e) => handleInputChange(e)} required />
                        <input className="ipImg2" id="cardBack" type="file" accept="image/*" onChange={(e) => handleInputChange(e)} required />
                        <br />
                        <br />

                        {cardFront && <img src={URL.createObjectURL(cardFront)} className="img" alt="Thumb" />}
                        {cardBack && <img src={URL.createObjectURL(cardBack)} className="img2" alt="Thumb" />}
                        {/* <p className="bold">Account Information</p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="row">
                            <label className="label">Username</label>
                            <input type="text" className="input" readOnly></input>
                        </div>
                        <div className="row">
                            <label className="label">Password</label>
                            <input type="password" className="input" readOnly></input>
                        </div> */}
                    </div>
                    <div className="conBtn">
                        <button className="btnCancel" onClick={Cancel}>
                            Cancel
                        </button>
                        <input type="submit" className="btn" value="Save Change"></input>
                    </div>
                </form>
                <Footer />
                <FooterCopy />
            </div>
        </>
    );
};
export default EditProfile;
