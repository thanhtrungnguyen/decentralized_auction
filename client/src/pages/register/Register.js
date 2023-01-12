import styles from "../../styleCss/register.module.css";
// import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import useLocationForm from "./useLocationForm";
import Select from "react-select";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { BsFillPersonFill, BsBank2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import FooterCopy from "../../components/footer/FooterCopy";
// import ReactDOM from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
// axios.defaults.withCredentials = true;
const Register = () => {
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown1(passwordShown1 ? false : true);
    };
    const toggleRePasswordVisibility = () => {
        setPasswordShown2(passwordShown2 ? false : true);
    };

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
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [role] = useState("BIDDER");
    const [usertype] = useState("CONTACT");

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
        if (id === "userName") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "rePassword") {
            setRePassword(value);
        }
        // if (id === "role") {
        //   setRole(value);
        // }
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
        formData.append("username", username);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("usertype", usertype);
        if (rePassword !== password) {
            setMessage("Please enter match the password");
        } else {
            axios
                .post(
                    "/auth/register",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    alert("Register successfully!!!");
                    navigate("/login");
                });
        }

        event.preventDefault();
    };

    return (
        <>
            <Header />
            <NavBar />
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <p className={styles.textCreate}>Create your DAP account</p>
                    <Link to="/login" className={styles.textAd}>
                        Already have an account? Login
                    </Link>
                    <br />
                    <div className={styles.divImg}>
                        <BsFillPersonFill className={styles.icon} />
                        <p className={styles.textFor}>For personal</p>
                    </div>
                    <div className={styles.divImg2}>
                        <Link to="/registerForO">
                            <BsBank2 className={styles.icon} />
                            <p className={styles.textFor}>For organization</p>
                        </Link>
                    </div>
                    <p className={styles.textBlue}>Personal Infomation</p>
                    <p className={styles.textRed}>Basic information</p>
                    <input
                        className={styles.inputT}
                        type="text"
                        pattern="[a-zA-Z]{1,50}"
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
                        pattern="[a-zA-Z]{1,50}"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => handleInputChange(e)}
                        id="lastName"
                        required
                    ></input>
                    <p className={styles.txtBlack}>Message</p>
                    <select
                        id="gender"
                        className={styles.dropdown}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Gender"
                        value={gender}
                        defaultValue="Male"
                    >
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
                        type="text"
                        pattern="[0]\d{9}"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => handleInputChange(e)}
                        id="phone"
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
                        pattern="^\s*([^\s]\s*){0,300}$"
                        placeholder="Specific address"
                        value={specificAddress}
                        onChange={(e) => handleInputChange(e)}
                        id="specificAddress"
                        required
                    ></input>{" "}
                    <p className={styles.textRed}>Identity/Citizen card</p>
                    <input
                        type="text"
                        pattern="\d{12}"
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
                        pattern="^\s*([^\s]\s*){0,100}$"
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
                        accept="image/*"
                        // onChange={(e) => {
                        //   console.log(e.target.files[0]);
                        // }}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                    <input
                        id="cardBack"
                        type="file"
                        accept="image/*"
                        // onChange={(e) => {
                        //   console.log(e.target.files[0]);
                        // }}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                    <p className={styles.textBlue}>Account Infomation</p>
                    <input
                        className={styles.inputEP}
                        type="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        value={username}
                        onChange={(e) => handleInputChange(e)}
                        id="userName"
                        placeholder="Username"
                        required
                    ></input>
                    <div>
                        <input
                            className={styles.inputEP}
                            type={passwordShown1 ? "text" : "password"}
                            pattern="^\s*(?:\S\s*){8,}$"
                            value={password}
                            onChange={(e) => handleInputChange(e)}
                            id="password"
                            placeholder="Password"
                            required
                        ></input>
                        <i onClick={togglePasswordVisibility}>{eye}</i>
                    </div>
                    <div>
                        <input
                            className={styles.inputEP}
                            type={passwordShown2 ? "text" : "password"}
                            value={rePassword}
                            onChange={(e) => handleInputChange(e)}
                            id="rePassword"
                            placeholder="Re-eneter the password"
                            required
                        ></input>
                        <i onClick={toggleRePasswordVisibility}>{eye}</i>
                    </div>
                    <label style={{ color: "red" }}>{message}</label>
                    <input type="submit" className={styles.ipsubmit} value="SIGN UP"></input>
                </form>
            </div>
            <Footer />
            <FooterCopy />
        </>
    );
};

export default Register;
