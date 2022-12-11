import styles from "../../styleCss/registerForO.module.css";
import "react-dropdown/style.css";
import useLocationForm from "./useLocationForm";
import Select from "react-select";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import { BsFillPersonFill, BsBank2 } from "react-icons/bs";
import Footer from "../../components/footer/Footer";
const Register = () => {
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);
    const navigate = useNavigate();

    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

    const [organizationName, setOrganizationName] = useState(null);
    const [taxCode, setTaxCode] = useState(null);
    const [taxCodeGrantedDate, setTaxCodeGrantedDate] = useState(null);
    const [taxCodeGrantedPlace, setTaxCodeGrantedPlace] = useState(null);
    const [specificAddressOrganization, setSpecificAddressOrganization] = useState(null);
    //const [companyCertifcate, setCompanyCertifcate] = useState(null);
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
    const [userName, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [position, setPosition] = useState(null);
    const [role, setRole] = useState("BIDDER");
    const [usertype, setUsertype] = useState("ACCOUNT");

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
        // if (id === "companyCertifcate") {
        //   setCompanyCertifcate(e.target.files[0]);
        // }
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
        if (id === "userName") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "rePassword") {
            setRePassword(value);
        }
        if (id === "role") {
            setRole(value);
        }
    };
    const handleSubmit = (event) => {
        let cityId = selectedCity.value;
        let city = selectedCity.label;
        let districtId = selectedDistrict.value;
        let district = selectedDistrict.label;
        let wardId = selectedWard.value;
        let ward = selectedWard.label;
        let cardfront = cardFront.name;
        let cardback = cardBack.name;
        //let certificateCompany = companyCertifcate.name;

        const formData = new FormData();
        formData.append("organizationName", organizationName);
        formData.append("taxCode", taxCode);
        formData.append("taxCodeGrantedDate", taxCodeGrantedDate);
        formData.append("taxCodeGrantedPlace", taxCodeGrantedPlace);
        formData.append("specificAddressOrganization", specificAddressOrganization);

        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("gender", gender);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("position", position);
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
        formData.append("username", userName);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("usertype", usertype);
        axios
            .post(
                "http://localhost:8800/api/auth/register",
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
                navigate("/login");
            });
        alert(
            "information: " +
                firstName +
                " " +
                lastName +
                " " +
                gender +
                " " +
                dateOfBirth +
                " " +
                email +
                " " +
                phone +
                " " +
                cityId +
                " " +
                districtId +
                " " +
                " " +
                wardId +
                " " +
                specificAddress +
                " " +
                cardNumber +
                " " +
                dateRangeCard +
                " " +
                cardGrantedPlace +
                " " +
                cardBack.name +
                " " +
                cardFront.name +
                " " +
                userName +
                " " +
                password +
                " " +
                rePassword +
                " " +
                role
        );
        event.preventDefault();
    };

    return (
        <>
            <Header />
            <NavBar />
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <p className={styles.textCreate}>Create your DAP account</p>
                    <p className={styles.textAd}>Already have an account? Login</p>
                    <br />
                    <div className={styles.divImg}>
                        <Link to="/register">
                            <BsFillPersonFill className={styles.icon} />
                            <p className={styles.textFor}>For personal</p>
                        </Link>
                    </div>
                    <div className={styles.divImg2}>
                        <BsBank2 className={styles.icon} />
                        <p className={styles.textFor}>For organization</p>
                    </div>
                    <p className={styles.textBlue}>Organization information</p>
                    <p className={styles.textRed}>Basic information</p>
                    <input
                        className={styles.inputT}
                        type="text"
                        placeholder="Organization name"
                        value={organizationName}
                        onChange={(e) => handleInputChange(e)}
                        id="organizationName"
                        required
                    ></input>
                    <p className={styles.txtBlack}>Message</p>
                    <input
                        className={styles.inputT}
                        type="text"
                        placeholder="Tax code"
                        value={taxCode}
                        onChange={(e) => handleInputChange(e)}
                        id="taxCode"
                        required
                    ></input>
                    <p className={styles.txtBlack}>Message</p>
                    <p className={styles.txtBlack}>Tax code granted date</p>
                    <input
                        type="date"
                        className={styles.ipdate}
                        value={taxCodeGrantedDate}
                        onChange={(e) => handleInputChange(e)}
                        id="taxCodeGrantedDate"
                    ></input>
                    <input
                        className={styles.inputT}
                        type="text"
                        placeholder="Tax code granted place"
                        value={taxCodeGrantedPlace}
                        onChange={(e) => handleInputChange(e)}
                        id="taxCodeGrantedPlace"
                        required
                    ></input>
                    <br />
                    Information
                    <br />
                    <br />
                    <input
                        className={styles.inputT}
                        type="text"
                        placeholder="Specific address"
                        value={specificAddressOrganization}
                        onChange={(e) => handleInputChange(e)}
                        id="specificAddressOrganization"
                        required
                    ></input>
                    {/* <input
            className={styles.imgCard}
            id="companyCertifcate"
            type="file"
            // onChange={(e) => {
            //   console.log(e.target.files[0]);
            // }}
            onChange={(e) => handleInputChange(e)}
            required
          /> */}
                    <p className={styles.textBlue}>Representative Information</p>
                    <p className={styles.textRed}>Basic information</p>
                    <input
                        className={styles.inputT}
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => handleInputChange(e)}
                        id="firstName"
                        required
                    ></input>
                    <p className={styles.txtBlack}>Message</p>
                    <input
                        className={styles.inputT}
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => handleInputChange(e)}
                        id="lastName"
                        required
                    ></input>
                    <p className={styles.txtBlack}>Message</p>
                    <select id="gender" className={styles.dropdown} onChange={(e) => handleInputChange(e)} placeholder="Gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <p className={styles.txtBlack}>Date of birth</p>
                    <input type="date" className={styles.ipdate} value={dateOfBirth} onChange={(e) => handleInputChange(e)} id="dateOfBirth"></input>
                    <input
                        className={styles.inputEP}
                        type="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => handleInputChange(e)}
                        id="email"
                        required
                    ></input>
                    <input
                        className={styles.inputEP}
                        type="number"
                        // pattern="/(8|0)\d{9}/"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => handleInputChange(e)}
                        id="phone"
                        required
                    ></input>
                    <input
                        className={styles.inputT}
                        type="text"
                        placeholder="Position"
                        value={position}
                        onChange={(e) => handleInputChange(e)}
                        id="position"
                        required
                    ></input>
                    <p className={styles.textRed}>Address</p>
                    <Select
                        className={styles.select}
                        name="cityId"
                        key={`cityId_${selectedCity?.value}`}
                        isDisabled={cityOptions.length === 0}
                        options={cityOptions}
                        onChange={(option) => onCitySelect(option)}
                        placeholder="Tỉnh/Thành"
                        defaultValue={selectedCity}
                    />
                    <Select
                        className={styles.select}
                        name="districtId"
                        key={`districtId_${selectedDistrict?.value}`}
                        isDisabled={districtOptions.length === 0}
                        options={districtOptions}
                        onChange={(option) => onDistrictSelect(option)}
                        placeholder="Quận/Huyện"
                        defaultValue={selectedDistrict}
                    />
                    <Select
                        className={styles.select}
                        name="wardId"
                        key={`wardId_${selectedWard?.value}`}
                        isDisabled={wardOptions.length === 0}
                        options={wardOptions}
                        placeholder="Phường/Xã"
                        onChange={(option) => onWardSelect(option)}
                        defaultValue={selectedWard}
                    />
                    <input
                        className={styles.ipadd}
                        type="text"
                        placeholder="Specific address"
                        value={specificAddress}
                        onChange={(e) => handleInputChange(e)}
                        id="specificAddress"
                        required
                    ></input>{" "}
                    <p className={styles.textRed}>Identity/Citizen card</p>
                    <input
                        type="text"
                        placeholder="Card number"
                        className={styles.ip3}
                        value={cardNumber}
                        onChange={(e) => handleInputChange(e)}
                        id="cardNumber"
                        required
                    ></input>
                    <input type="date" className={styles.ip3} value={dateRangeCard} onChange={(e) => handleInputChange(e)} id="dateRangeCard"></input>
                    <input
                        type="text"
                        placeholder="Card granted place"
                        className={styles.ip3}
                        value={cardGrantedPlace}
                        onChange={(e) => handleInputChange(e)}
                        id="cardGrantedPlace"
                        required
                    ></input>
                    <input
                        className={styles.imgCard}
                        id="cardFront"
                        type="file"
                        // onChange={(e) => {
                        //   console.log(e.target.files[0]);
                        // }}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                    <input
                        id="cardBack"
                        type="file"
                        // onChange={(e) => {
                        //   console.log(e.target.files[0]);
                        // }}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                    <p className={styles.textBlue}>Account Information</p>
                    <input
                        className={styles.inputEP}
                        type="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        value={userName}
                        onChange={(e) => handleInputChange(e)}
                        id="userName"
                        placeholder="Username"
                        required
                    ></input>
                    <input
                        className={styles.inputEP}
                        type="text"
                        value={password}
                        onChange={(e) => handleInputChange(e)}
                        id="password"
                        placeholder="Password"
                        required
                    ></input>
                    <input
                        className={styles.inputEP}
                        type="text"
                        value={rePassword}
                        onChange={(e) => handleInputChange(e)}
                        id="rePassword"
                        placeholder="Re-eneter the password"
                        required
                    ></input>
                    {/* <select
            id="role"
            className={styles.dropdown}
            onChange={(e) => handleInputChange(e)}
            placeholder="Role"
          >
            <option value="BIDDER">BIDDER</option>
            <option value="SELLER">SELLER</option>
          </select> */}
                    <input type="submit" className={styles.ipsubmit} value="SIGN UP"></input>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Register;
