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
import "../../styleCss/stylesPages/forBidder/ProfileOrganization.css";

const EditProfileOrganization = () => {
    const { id, propertyId } = useParams();
    const baseURL = `http://localhost:8800/api/user/${id}`;
    //const { data, loading, error } = useFetch(baseURL);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);

    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

    const [organizationName, setOrganizationName] = useState(null);
    const [taxCode, setTaxCode] = useState(null);
    const [taxCodeGrantedDate, setTaxCodeGrantedDate] = useState(null);
    const [taxCodeGrantedPlace, setTaxCodeGrantedPlace] = useState(null);
    const [specificAddressOrganization, setSpecificAddressOrganization] = useState(null);
    const [position, setPosition] = useState(null);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [gender, setGender] = useState("Male");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [specificAddress, setSpecificAddress] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [dateRangeCard, setDateRangeCard] = useState(null);
    const [cardGrantedPlace, setCardGrantedPlace] = useState(null);
    const [cardFront, setCardFront] = useState(null);
    const [cardBack, setCardBack] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setFirstName(resp.data.contact.First_Name__c)
                setLastName(resp.data.contact.Last_Name__c)
                setGender(resp.data.contact.Gender__c)
                setDateOfBirth(resp.data.contact.Date_Of_Birth__c)
                setEmail(resp.data.contact.Email__c)
                setPhone(resp.data.contact.Phone__c)
                setSpecificAddress(resp.data.contact.Address__c)
                setCardNumber(resp.data.contact.Card_Number__c)
                setCardGrantedPlace(resp.data.contact.Card_Granted_Place__c)
                setDateRangeCard(resp.data.contact.Card_Granted_Date__c)

                setOrganizationName(resp.data.account.Name)
                setTaxCode(resp.data.account.Tax_Code__c)
                setTaxCodeGrantedDate(resp.data.account.Tax_Code_Granted_Date__c)
                setTaxCodeGrantedPlace(resp.data.account.Tax_Code_Granted_Place__c)
                setSpecificAddressOrganization(resp.data.account.Specific_Address__c)
                setPosition(resp.data.account.Name)

                setData(resp.data);
            });

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "organizationName") {
            setOrganizationName(value);
        }
        if (id === "position") {
            setPosition(value);
        }
        if (id === "taxCode") {
            setTaxCode(value);
        }
        if (id === "taxCodeGrantedDate") {
            setTaxCodeGrantedDate(value);
        }
        if (id === "taxCodeGrantedPlace") {
            setTaxCodeGrantedPlace(value);
        }
        if (id === "specificAddressOrganization") {
            setSpecificAddressOrganization(value);
        }
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "gender") {
            setGender(value);
        }
        if (id === "dateOfBirth") {
            setDateOfBirth(value);
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
            setCardNumber(value);
        }
        if (id === "dateRangeCard") {
            setDateRangeCard(value);
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
        formData.append("organizationName", organizationName);
        formData.append("taxCode", taxCode);
        formData.append("taxCodeGrantedDate", taxCodeGrantedDate);
        formData.append("taxCodeGrantedPlace", taxCodeGrantedPlace);
        formData.append("specificAddressOrganization", specificAddressOrganization);
        formData.append("position", position);

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
            `http://localhost:8800/api/user/updateProfile/${id}`,
            formData,
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
        navigate(`/profileOrganization/${id}`);
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
                            <input
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                className="input"
                                value={organizationName}
                                onChange={(e) => handleInputChange(e)}
                                id="organizationName"
                                defaultValue={data.organizationName}
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Tax Code</label>
                            <input
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                className="input"
                                defaultValue={data.taxCode}
                                value={taxCode}
                                onChange={(e) => handleInputChange(e)}
                                id="taxCode"
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Tax Code Granted Date</label>
                            <input
                                type="text"
                                className="input"
                                defaultValue={data.taxCodeGrantedDate}
                                value={taxCodeGrantedDate}
                                onChange={(e) => handleInputChange(e)}
                                id="taxCode"
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Tax Code Granted Place</label>
                            <input
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                className="input"
                                defaultValue={data.taxCodeGrantedPlace}
                                value={taxCodeGrantedPlace}
                                onChange={(e) => handleInputChange(e)}
                                id="taxCodeGrantedPlace"
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Specific Address</label>
                            <input
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                className="input"
                                defaultValue={data.specificAddress}
                                value={specificAddressOrganization}
                                onChange={(e) => handleInputChange(e)}
                                id="specificAddressOrganization"
                                required
                            ></input>
                        </div>{" "}
                        <div className="row">
                            <label className="label">Position</label>
                            <input
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                className="input"
                                defaultValue={data.specificAddress}
                                id="position"
                                value={position}
                                onChange={(e) => handleInputChange(e)}
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
                        <br />
                        <br />
                        <p className="bold">Basic Information</p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="row">
                            <label className="label">Firstname</label>
                            <input
                                type="text"
                                pattern="[a-zA-Z]{1,50}"
                                className="input"
                                value={firstName}
                                onChange={(e) => handleInputChange(e)}
                                id="firstName"
                                defaultValue={data.firstName}
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Lastname</label>
                            <input
                                type="text"
                                pattern="[a-zA-Z]{1,50}"
                                className="input"
                                value={lastName}
                                onChange={(e) => handleInputChange(e)}
                                defaultValue={data.lastName}
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
                                defaultValue={data.gender}
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
                                defaultValue={data.dateOfBirth}
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
                                defaultValue={data.email}
                                onChange={(e) => handleInputChange(e)}
                                id="email"
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Phone number</label>
                            <input
                                type="text"
                                pattern="[0]\d{9}"
                                className="input"
                                value={phone}
                                onChange={(e) => handleInputChange(e)}
                                id="phone"
                                defaultValue={data.phone}
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
                                defaultValue={selectedCity}
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
                                defaultValue={selectedDistrict}
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
                                defaultValue={selectedWard}
                                required
                            />
                        </div>
                        <div className="row">
                            <label className="label">Specific address</label>
                            <input
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                className="input"
                                value={specificAddress}
                                onChange={(e) => handleInputChange(e)}
                                id="specificAddress"
                                defaultValue={data.specificAddress}
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
                        <p className="bold">Identity/Citizen Card</p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="row">
                            <label className="label">Card number</label>
                            <input
                                type="text"
                                pattern="\d{12}"
                                className="input"
                                value={cardNumber}
                                onChange={(e) => handleInputChange(e)}
                                id="cardNumber"
                                defaultValue={data.cardNumber}
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
                                defaultValue={data.dateRangeCard}
                                required
                            ></input>
                        </div>
                        <div className="row">
                            <label className="label">Card granted place</label>
                            <input
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                className="input"
                                onChange={(e) => handleInputChange(e)}
                                value={cardGrantedPlace}
                                id="cardGrantedPlace"
                                defaultValue={data.cardGrantedPlace}
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
                        <input className="ipImg" id="cardFront" type="file" accept="image/*" onChange={(e) => handleInputChange(e)}  />
                        <input className="ipImg2" id="cardBack" type="file" accept="image/*" onChange={(e) => handleInputChange(e)}  />
                        <br />
                        <br />
                        {cardFront == null && (
                            <img src={`http://localhost:8800/api/auction/images/${data.contact.Font_Side_Image__c}`} className="img" alt="Thumb" />
                        )}
                        {cardFront != null && <img src={URL.createObjectURL(cardFront)} className="img" alt="Thumb" />}
                        {cardBack == null && (
                            <img src={`http://localhost:8800/api/auction/images/${data.contact.Back_Side_Image__c}`} className="img2" alt="Thumb" />
                        )}
                        {cardBack != null && <img src={URL.createObjectURL(cardBack)} className="img2" alt="Thumb" />}
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
export default EditProfileOrganization;
