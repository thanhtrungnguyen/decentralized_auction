import styles from "../../styleCss/registerForO.module.css";
import "react-dropdown/style.css";
import useLocationForm from "./useLocationForm";
import Select from "react-select";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import { BsFillPersonFill, BsBank2 } from "react-icons/bs";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const eye = <FontAwesomeIcon icon={faEye} />;
const Register = () => {
    const axios = useAxiosPrivate();
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

    const [organizationName, setOrganizationName] = useState(null);
    const [taxCode, setTaxCode] = useState(null);
    const [taxCodeGrantedDate, setTaxCodeGrantedDate] = useState(null);
    const [taxCodeGrantedPlace, setTaxCodeGrantedPlace] = useState(null);
    const [specificAddressOrganization, setSpecificAddressOrganization] = useState(null);
    //const [companyCertificate, setCompanyCertificate] = useState(null);
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
    const role = "bidder";
    const userType = "organization";
    const [isExist, setIsExit] = useState(false);
    const [fileBack, setFileBack] = useState(null);
    const [fileFront, setFileFront] = useState(null);
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
            // const fsizeFront = cardFront.size;
            // setFileFront(Math.round(fsizeFront / 1024));
        }
        if (id === "cardBack") {
            setCardBack(e.target.files[0]);
            // const fsizeBack = cardBack.size;
            // setFileBack(Math.round(fsizeBack / 1024));
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
    // const [listUsername, setListUsername] = useState([]);
    // const baseURL = `/user/users`;
    const handleSubmit = (event) => {
        const fsizeBack = cardBack.size;
        const fileBack = Math.round(fsizeBack / 1024);
        const fsizeFront = cardFront.size;
        const fileFront = Math.round(fsizeFront / 1024);
        // axios.get(baseURL, { withCredentials: true }).then((resp) => {
        //     setListUsername(resp.data.users);
        //     listUsername.map((item) => {
        //         if (item.username === userName) {
        //             setIsExit(true);
        //             console.log(item.username);
        //         } else {
        //             setIsExit(false);
        //         }
        //     });
        // });
        let cityId = selectedCity.value;

        let districtId = selectedDistrict.value;

        let wardId = selectedWard.value;
        if (!organizationName.trim()) {
            notify("🦄 organizationName is empty");
        } else if (!taxCode.trim()) {
            notify("🦄 taxCode is empty");
        } else if (!taxCodeGrantedDate.trim()) {
            notify("🦄 taxCodeGrantedDate is empty");
        } else if (!taxCodeGrantedPlace.trim()) {
            notify("🦄 taxCodeGrantedPlace is empty");
        } else if (!specificAddressOrganization.trim()) {
            notify("🦄 specificAddressOrganization is empty");
        } else if (!firstName.trim()) {
            notify("🦄 FirstName is empty");
        } else if (!lastName.trim()) {
            notify("🦄 LastName is empty");
        } else if (!gender) {
            notify("🦄 Gender is empty");
        } else if (!dateOfBirth.trim()) {
            notify("🦄 Date Of Birth is empty");
        } else if (!email.trim()) {
            notify("🦄 Email is empty");
        } else if (!phone.trim()) {
            notify("🦄 phone is empty");
        } else if (!position.trim()) {
            notify("🦄 position is empty");
        } else if (!cityId) {
            notify("🦄 city is empty");
        } else if (!districtId) {
            notify("🦄 district is empty");
        } else if (!wardId) {
            notify("🦄 ward is empty");
        } else if (!specificAddress.trim()) {
            notify("🦄 specificAddress is empty");
        } else if (!cardNumber.trim()) {
            notify("🦄 cardNumber is empty");
        } else if (!dateRangeCard.trim()) {
            notify("🦄 dateRangeCard is empty");
        } else if (!cardGrantedPlace.trim()) {
            notify("🦄 cardGrantedPlace is empty");
        } else if (!cardFront) {
            notify("🦄 cardFront is empty");
        } else if (!cardBack) {
            notify("🦄 cardBack is empty");
        } else if (fileBack > 2048) {
            notify("🦄 File card back, please select a file less than 2mb");
        } else if (fileFront > 2048) {
            notify("🦄 File card front, please select a file less than 2mb");
        } else if (!userName.trim()) {
            notify("🦄 username is empty");
        } else if (!password.trim()) {
            notify("🦄 password is empty");
        } else if (!rePassword.trim()) {
            notify("🦄 rePassword is empty");
        } else if (isExist) {
            notify("🦄 Username is exist");
        } else if (rePassword != password) {
            notify("🦄 rePassword is not same password");
        } else {
            const formData = new FormData();

            formData.append("name", organizationName.trim());
            formData.append("taxCode", taxCode.trim());
            formData.append("taxCodeGrantedDate", taxCodeGrantedDate.trim());
            formData.append("taxCodeGrantedPlace", taxCodeGrantedPlace.trim());
            formData.append("addressOrganization", specificAddressOrganization.trim());

            formData.append("firstName", firstName.trim());
            formData.append("lastName", lastName.trim());
            formData.append("gender", gender);
            formData.append("dateOfBirth", dateOfBirth.trim());
            formData.append("email", email.trim());
            formData.append("phone", phone.trim());
            formData.append("position", position.trim());
            formData.append("cityId", cityId);
            formData.append("city", selectedCity.label);
            formData.append("districtId", districtId);
            formData.append("district", selectedDistrict.label);
            formData.append("wardsId", wardId);
            formData.append("wards", selectedWard.label);
            formData.append("address", specificAddress.trim());
            formData.append("cardNumber", cardNumber.trim());
            formData.append("cardGrantedDate", dateRangeCard.trim());
            formData.append("cardGrantedPlace", cardGrantedPlace.trim());
            formData.append("frontSideImage", cardFront);
            formData.append("backSideImage", cardBack);
            formData.append("username", userName.trim());
            formData.append("password", password.trim());
            formData.append("role", role);
            formData.append("type", userType);

            axios
                .post(
                    "/organization/create",
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
                })
                .catch((err) => {
                    notify(`🦄 Register Failed: ${err.response.data.message}, ${err}`);
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
                    <p className={styles.textCreate}>Create your DAP account</p>
                    <Link to="/login" className={styles.textAd}>
                        Already have an account? Login
                    </Link>
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
                        pattern="^\s*([^\s]\s*){0,100}$"
                        placeholder="Organization name"
                        value={organizationName}
                        onChange={(e) => handleInputChange(e)}
                        id="organizationName"
                        required
                    ></input>
                    <p className={styles.txtBlack}></p>
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
                    <p className={styles.txtBlack}></p>
                    <p className={styles.txtBlack}>Tax code granted date</p>
                    <input
                        type="date"
                        className={styles.ipdate}
                        value={taxCodeGrantedDate}
                        onChange={(e) => handleInputChange(e)}
                        id="taxCodeGrantedDate"
                        required
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
                        pattern="^\s*([^\s]\s*){0,100}$"
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
                        type="text"
                        pattern="?=.{8,20}$"
                        value={userName}
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
        </>
    );
};

export default Register;
