import styles from "../../styleCss/stylesPages/forAdmin/addSeller.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Select from "react-select";
import useLocationForm from "../register/useLocationForm";
import Loading from "../../components/loading/Loading";

const AddSeller = () => {
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);
    const navigate = useNavigate();
    const [ro, setRo] = useState();
    const [loading, setLoading] = useState(true);

    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

    const [organizationName, setOrganizationName] = useState(null);
    const [taxCode, setTaxCode] = useState(null);
    const [taxCodeGrantedDate, setTaxCodeGrantedDate] = useState(null);
    const [taxCodeGrantedPlace, setTaxCodeGrantedPlace] = useState(null);
    const [specificAddressOrganization, setSpecificAddressOrganization] = useState(null);
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
    const [role, setRole] = useState("SELLER");
    const [usertype] = useState("ACCOUNT");
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
        formData.append("userName", userName);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("usertype", usertype);

        axios
            .post("http://localhost:8800/api/auth/registerSeller", formData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                navigate("/listSellers");
            });
        event.preventDefault();
    };
    const Cancel = () => {
        navigate("/listSellers");
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
            setRo(getUser().role);
        } else {
            setRo("");
        }
        setLoading(false);
    }, []);
    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (ro === "BIDDER" || ro === "SELLER" || ro === "MANAGER" || ro === "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}{" "}
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <div className={styles.content}>
                        <div className={styles.add}>
                            <p className={styles.textCreate}>Create Seller account</p>
                            <br />
                            <p className={styles.textBlue}>Organization information</p>
                            <br />
                            <br />
                            <br />
                            <p className={styles.textRed}>Basic information</p>
                            <input
                                className={styles.inputT}
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                placeholder="Organization name"
                                value={organizationName}
                                onChange={(e) => handleInputChange(e)}
                                id="organizationName"
                                required
                            ></input>
                            <br />
                            <br />
                            <input
                                className={styles.inputT}
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
                                placeholder="Tax code"
                                value={taxCode}
                                onChange={(e) => handleInputChange(e)}
                                id="taxCode"
                                required
                            ></input>
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
                                pattern="^\s*([^\s]\s*){0,100}$"
                                placeholder="Tax code granted place"
                                value={taxCodeGrantedPlace}
                                onChange={(e) => handleInputChange(e)}
                                id="taxCodeGrantedPlace"
                                required
                            ></input>
                            <br />
                            <br />
                            <br />
                            <input
                                className={styles.inputT}
                                type="text"
                                pattern="^\s*([^\s]\s*){0,300}$"
                                placeholder="Specific address"
                                value={specificAddressOrganization}
                                onChange={(e) => handleInputChange(e)}
                                id="specificAddressOrganization"
                                required
                            ></input>
                            <p className={styles.textBlue}>Representative Information</p>
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
                            <select id="gender" className={styles.dropdown} onChange={(e) => handleInputChange(e)} placeholder="Gender">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <p className={styles.txtBlack}>Date of birth</p>
                            <input
                                type="date"
                                className={styles.ipdate}
                                value={dateOfBirth}
                                onChange={(e) => handleInputChange(e)}
                                id="dateOfBirth"
                            ></input>
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
                                pattern="[0]\d{9}"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => handleInputChange(e)}
                                id="phone"
                                maxLength={10}
                                required
                            ></input>
                            <input
                                className={styles.inputT}
                                type="text"
                                pattern="^\s*([^\s]\s*){0,100}$"
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
                            <input
                                type="date"
                                className={styles.ip3}
                                value={dateRangeCard}
                                onChange={(e) => handleInputChange(e)}
                                id="dateRangeCard"
                            ></input>
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
                                type="password"
                                pattern="^\s*(?:\S\s*){8,}$"
                                value={password}
                                onChange={(e) => handleInputChange(e)}
                                id="password"
                                placeholder="Password"
                                required
                            ></input>
                            <input
                                className={styles.inputEP}
                                type="password"
                                value={rePassword}
                                onChange={(e) => handleInputChange(e)}
                                id="rePassword"
                                placeholder="Re-eneter the password"
                                required
                            ></input>
                            <input type="submit" className={styles.ipsubmit} value="CREATE"></input>
                            <br />
                            <br />
                            <input type="button" className={styles.ipCancel} value="CANCEL" onClick={Cancel}></input>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default AddSeller;
