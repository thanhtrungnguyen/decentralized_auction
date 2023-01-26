import styles from "../../styleCss/stylesPages/forAdmin/addSeller.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Select from "react-select";
import useLocationForm from "../register/useLocationForm";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const AddSeller = () => {
    const axios = useAxiosPrivate();
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;
    const [isExist, setIsExit] = useState(false);

    const [organizationName, setOrganizationName] = useState(null);
    const [taxCode, setTaxCode] = useState(null);
    const [taxCodeGrantedDate, setTaxCodeGrantedDate] = useState(null);
    const [taxCodeGrantedPlace, setTaxCodeGrantedPlace] = useState(null);
    const [specificAddressOrganization, setSpecificAddressOrganization] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [gender, setGender] = useState("Male");
    const [dateOfBirth, setdateOfBirth] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [specificAddress, setSpecificAddress] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [dateRangeCard, setdateRangeCard] = useState(null);
    const [cardGrantedPlace, setCardGrantedPlace] = useState(null);
    const [cardFront, setCardFront] = useState(null);
    const [cardBack, setCardBack] = useState(null);
    const [userName, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [position, setPosition] = useState(null);
    const role = "seller";
    const userType = "organization";
    const [fileBack, setFileBack] = useState(0);
    const [fileFront, setFileFront] = useState(0);
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
            setCardNumber(value);
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
            const fsizeBack = cardBack.size;
            // setFileBack(Math.round(fsizeBack / 1024));
            // console.log(fileBack);
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
    const [listUsername, setListUsername] = useState([]);
    const baseURL = `http://localhost:5000/api/user/users`;
    const handleSubmit = (event) => {
        const fsizeBack = cardBack.size;
        const fileBack = Math.round(fsizeBack / 1024);
        const fsizeFront = cardFront.size;
        const fileFront = Math.round(fsizeFront / 1024);
        axios.get(baseURL, { withCredentials: true }).then((resp) => {
            setListUsername(resp.data.users);
            listUsername.map((item) => {
                if (item.username === userName) {
                    setIsExit(true);
                    console.log(item.username);
                } else {
                    setIsExit(false);
                }
            });
        });
        let cityId = selectedCity.value;
        let city = selectedCity.label;
        let districtId = selectedDistrict.value;
        let district = selectedDistrict.label;
        let wardId = selectedWard.value;
        let ward = selectedWard.label;
        let cardfront = cardFront.name;
        let cardback = cardBack.name;
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
            formData.append("password", password).trim();
            formData.append("role", role.trim());
            formData.append("type", userType.trim());
            axios
                .post(
                    "/organization/create",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    },
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    alert("Add seller successfully!!!");
                    navigate("/listSellers");
                })
                .catch((err) => {
                    console.error(err.response.data.message);
                    notify(`🦄 Register Failed: ${err.response.data.message} , ${err}`);
                });
        }
        event.preventDefault();
    };
    const Cancel = () => {
        navigate("/listSellers");
    };
    // const getUser = () => {
    //     var users = null;
    //     const token = Cookies.get("access_token");
    //     if (!token) {
    //         console.log("Not authenticated");
    //     }
    //     jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
    //         users = user;
    //     });
    //     return users;
    // };
    // useEffect(() => {
    //     console.log(getUser());

    //     // console.log(getUser().type);
    //     if (getUser() != null) {
    //         setRo(getUser().role);
    //     } else {
    //         setRo("");
    //     }
    //     setLoading(false);
    // }, []);
    return loading ? (
        <Loading />
    ) : (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <Time />
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
                            <br />
                            <br />
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
                            <p className={styles.txtBlack}></p>
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
                            <p className={styles.txtBlack}></p>
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
                            <br />
                            <br />
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
                            <br />
                            <br />
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
                            <br />
                            <br />
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
                            <br />
                            <br />
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
                            <br />
                            <br />
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
                            <br />
                            <br />
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
                            <br />
                            <br />
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
                            <br />
                            <br />
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
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    {cardFront && <img src={URL.createObjectURL(cardFront)} className={styles.img} alt="Thumb" />}
                                    {/* <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/C%C4%83n_c%C6%B0%E1%BB%9Bc_c%C3%B4ng_d%C3%A2n_g%E1%BA%AFn_ch%C3%ADp_m%E1%BA%B7t_tr%C6%B0%E1%BB%9Bc.jpg/640px-C%C4%83n_c%C6%B0%E1%BB%9Bc_c%C3%B4ng_d%C3%A2n_g%E1%BA%AFn_ch%C3%ADp_m%E1%BA%B7t_tr%C6%B0%E1%BB%9Bc.jpg"
                                        className={styles.img}
                                    ></img> */}
                                </div>
                                <div className={styles.r}>
                                    {/* <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/C%C4%83n_c%C6%B0%E1%BB%9Bc_c%C3%B4ng_d%C3%A2n_g%E1%BA%AFn_ch%C3%ADp_m%E1%BA%B7t_tr%C6%B0%E1%BB%9Bc.jpg/640px-C%C4%83n_c%C6%B0%E1%BB%9Bc_c%C3%B4ng_d%C3%A2n_g%E1%BA%AFn_ch%C3%ADp_m%E1%BA%B7t_tr%C6%B0%E1%BB%9Bc.jpg"
                                        className={styles.img}
                                    ></img> */}
                                    {cardBack && <img src={URL.createObjectURL(cardBack)} className={styles.img} alt="Thumb" />}
                                </div>
                            </div>
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
                            <br />
                            <br />
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
                            <br />
                            <br />
                            <input
                                className={styles.inputEP}
                                type="password"
                                value={rePassword}
                                onChange={(e) => handleInputChange(e)}
                                id="rePassword"
                                placeholder="Re-eneter the password"
                                required
                            ></input>
                            <br />
                            <br />
                            <input className={styles.btnAdd} type="submit" value="Add"></input>
                            <button
                                className={styles.btnCancel}
                                onClick={() => {
                                    navigate("/listSellers");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddSeller;
