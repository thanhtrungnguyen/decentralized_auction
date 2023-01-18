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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const [firstName, setFirstName] = useState("");
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
    const role = "bidder";
    const [isExist, setIsExit] = useState(false);
    const [fileBack, setFileBack] = useState(0);
    const [fileFront, setFileFront] = useState(0);

    //const [usertype] = useState("CONTACT");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value.trim());
        }
        if (id === "lastName") {
            setlastName(value.trim());
        }
        if (id === "gender") {
            setgender(value.trim());
        }
        if (id === "dateOfBirth") {
            setdateOfBirth(value.trim());
        }
        if (id === "email") {
            setEmail(value.trim());
        }
        if (id === "phone") {
            setPhone(value.trim());
        }
        if (id === "specificAddress") {
            setSpecificAddress(value.trim());
        }
        if (id === "cardNumber") {
            setcardNumber(value.trim());
        }
        if (id === "dateRangeCard") {
            setdateRangeCard(value.trim());
        }
        if (id === "cardGrantedPlace") {
            setCardGrantedPlace(value.trim());
        }
        if (id === "cardFront") {
            setCardFront(e.target.files[0]);
            const fsizeFront = cardFront.size;
            setFileFront(Math.round(fsizeFront / 1024));
        }
        if (id === "cardBack") {
            setCardBack(e.target.files[0]);
            const fsizeBack = cardBack.size;
            setFileBack(Math.round(fsizeBack / 1024));
            console.log(fileBack);
        }
        if (id === "userName") {
            setUsername(value.trim());
        }
        if (id === "password") {
            setPassword(value.trim());
        }
        if (id === "rePassword") {
            setRePassword(value.trim());
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
    const [listUsername, setListUsername] = useState([]);
    const baseURL = `/user/users`;

    const handleSubmit = (event) => {
        axios.get(baseURL, { withCredentials: true }).then((resp) => {
            setListUsername(resp.data.users);
            listUsername.map((item) => {
                if (item.username === username) {
                    setIsExit(true);
                    console.log(item.username);
                } else {
                    setIsExit(false);
                }
            });
        });
        let cityId = selectedCity.value;
        let districtId = selectedDistrict.value;
        let wardId = selectedWard.value;

        if (!firstName) {
            notify("🦄 FirstName is empty");
        } else if (!lastName) {
            notify("🦄 LastName is empty");
        } else if (!gender) {
            notify("🦄 Gender is empty");
        } else if (!dateOfBirth) {
            notify("🦄 Date Of Birth is empty");
        } else if (!email) {
            notify("🦄 Email is empty");
        } else if (!phone) {
            notify("🦄 phone is empty");
        } else if (!cityId) {
            notify("🦄 city is empty");
        } else if (!districtId) {
            notify("🦄 district is empty");
        } else if (!wardId) {
            notify("🦄 ward is empty");
        } else if (!specificAddress) {
            notify("🦄 specificAddress is empty");
        } else if (!cardNumber) {
            notify("🦄 cardNumber is empty");
        } else if (!dateRangeCard) {
            notify("🦄 dateRangeCard is empty");
        } else if (!cardGrantedPlace) {
            notify("🦄 cardGrantedPlace is empty");
        } else if (!cardFront) {
            notify("🦄 cardFront is empty");
        } else if (fileBack > 2048) {
            notify("🦄 File card back, please select a file less than 2mb");
        } else if (fileFront > 2048) {
            notify("🦄 File card front, please select a file less than 2mb");
        } else if (!cardBack) {
            notify("🦄 cardBack is empty");
        } else if (!username) {
            notify("🦄 username is empty");
        } else if (!password) {
            notify("🦄 password is empty");
        } else if (!rePassword) {
            notify("🦄 rePassword is empty");
        } else if (isExist) {
            notify("🦄 Username is exist");
        } else if (rePassword != password) {
            notify("🦄 rePassword is not same password");
        } else {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("gender", gender);
            formData.append("dateOfBirth", dateOfBirth);
            formData.append("email", email);
            formData.append("phone", phone);
            //formData.append("position", position);
            formData.append("cityId", cityId);
            formData.append("city", selectedCity.label);
            formData.append("districtId", districtId);
            formData.append("district", selectedDistrict.label);
            formData.append("wardsId", wardId);
            formData.append("wards", selectedWard.label);
            formData.append("address", specificAddress);
            formData.append("cardNumber", cardNumber);
            formData.append("cardGrantedDate", dateRangeCard);
            formData.append("cardGrantedPlace", cardGrantedPlace);
            formData.append("frontSideImage", cardFront);
            formData.append("backSideImage", cardBack);
            formData.append("username", username);
            formData.append("password", password);
            formData.append("role", role);
            axios
                .post(
                    "/individual/create",
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
                .catch(() => {
                    notify("🦄 Register Failed");
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
                    ></input>
                    <p className={styles.txtBlack}></p>
                    <input
                        className={styles.inputT}
                        type="text"
                        pattern="[a-zA-Z]{1,50}"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => handleInputChange(e)}
                        id="lastName"
                        // required
                    ></input>
                    <p className={styles.txtBlack}></p>
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
                        //required
                    ></input>
                    <input
                        className={styles.inputEP}
                        type="text"
                        pattern="[0]\d{9}"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => handleInputChange(e)}
                        id="phone"
                        //required
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
                        //required
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
                        //required
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
                        //required
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
                        //required
                    />
                    <input
                        id="cardBack"
                        type="file"
                        accept="image/*"
                        // onChange={(e) => {
                        //   console.log(e.target.files[0]);
                        // }}
                        onChange={(e) => handleInputChange(e)}
                        //required
                    />
                    <p className={styles.textBlue}>Account Information</p>
                    <input
                        className={styles.inputEP}
                        type="email"
                        // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        pattern="?=.{6,20}$"
                        value={username}
                        onChange={(e) => handleInputChange(e)}
                        id="userName"
                        placeholder="Username"
                        //required
                    ></input>
                    <div className={styles.fl}>
                        <input
                            className={styles.inputEP}
                            type={passwordShown1 ? "text" : "password"}
                            pattern="^\s*(?:\S\s*){8,}$"
                            value={password}
                            onChange={(e) => handleInputChange(e)}
                            id="password"
                            placeholder="Password"
                            //required
                        ></input>
                        <i className={styles.i} onClick={togglePasswordVisibility}>
                            {eye}
                        </i>
                    </div>
                    <div className={styles.fl}>
                        <input
                            className={styles.inputEP}
                            type={passwordShown2 ? "text" : "password"}
                            value={rePassword}
                            onChange={(e) => handleInputChange(e)}
                            id="rePassword"
                            placeholder="Re-eneter the password"
                            //required
                        ></input>
                        <i className={styles.i} onClick={toggleRePasswordVisibility}>
                            {eye}
                        </i>
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
