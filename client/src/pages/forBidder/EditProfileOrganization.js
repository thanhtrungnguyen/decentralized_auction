import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../../components/loading/Loading";

import { useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import HeaderUser from "../../components/header/HeaderUser";
import PageName from "../../components/header/PageName";
import FooterCopy from "../../components/footer/FooterCopy";
import { useNavigate } from "react-router-dom";
import useLocationForm from "../register/useLocationForm";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

// import "../../styleCss/stylesPages/forBidder/ProfileOrganization.css";
import styles from "../../styleCss/stylesPages/forBidder/editProfile.module.css";
const EditProfileOrganization = () => {
    const axios = useAxiosPrivate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [role, setRole] = useState();

    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);
    const [cB, setCB] = useState(null);
    const [cF, setCF] = useState(null);
    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

    const [organizationName, setOrganizationName] = useState(null);
    const [taxCode, setTaxCode] = useState(null);
    const [taxCodeGrantedDate, setTaxCodeGrantedDate] = useState(null);
    const [taxCodeGrantedPlace, setTaxCodeGrantedPlace] = useState(null);
    const [specificAddressOrganization, setSpecificAddressOrganization] = useState(null);
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
    const [disable, setDisable] = useState(false);
    const [checkCity, setCheckCity] = useState(true);
    const [checkDistrict, setCheckDistrict] = useState(true);
    const [checkWard, setCheckWard] = useState(true);
    const baseURL = `/organization/getByUserId/${id}`;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                console.log(resp);
                setOrganizationName(resp.data.result.name);
                setTaxCode(resp.data.result.taxCode);
                setTaxCodeGrantedDate(resp.data.result.taxCodeGrantedDate);
                setTaxCodeGrantedPlace(resp.data.result.taxCodeGrantedPlace);
                setSpecificAddressOrganization(resp.data.result.addressOrganization);
                setFirstName(resp.data.result.individual.firstName);
                setLastName(resp.data.result.individual.lastName);
                setGender(resp.data.result.individual.gender);
                setDateOfBirth(resp.data.result.individual.dateOfBirth);
                setEmail(resp.data.result.individual.email);
                setPhone(resp.data.result.individual.phone);
                setSpecificAddress(resp.data.result.individual.address);
                setCardNumber(resp.data.result.individual.cardNumber);
                setCardGrantedPlace(resp.data.result.individual.cardGrantedPlace);
                setDateRangeCard(resp.data.result.individual.cardGrantedDate);
                setCardFront(resp.data.result.individual.frontSideImage);
                setCardBack(resp.data.result.individual.backSideImage);
                setData(resp.data.result);
            });

            setLoading(false);
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "organizationName") {
            setOrganizationName(value);
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
            setCF(e.target.files[0]);
        }
        if (id === "cardBack") {
            setCardBack(e.target.files[0]);
            setCB(e.target.files[0]);
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
    const handleSubmit = (event) => {
        let cityId = selectedCity.value;
        let districtId = selectedDistrict.value;
        let wardId = selectedWard.value;
        const fsizeBack = cardBack.size;
        const fileBack = Math.round(fsizeBack / 1024);
        const fsizeFront = cardFront.size;
        const fileFront = Math.round(fsizeFront / 1024);
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
        } else {
            setDisable(true);

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
            if (!checkCity) {
                formData.append("cityId", cityId);
                formData.append("city", selectedCity.label);
            } else {
                formData.append("cityId", data.individual.cityId);
                formData.append("city", data.individual.city);
            }
            if (!checkDistrict) {
                formData.append("districtId", districtId);
                formData.append("district", selectedDistrict.label);
            } else {
                formData.append("districtId", data.individual.districtId);
                formData.append("district", data.individual.district);
            }
            if (!checkWard) {
                formData.append("wardsId", wardId);
                formData.append("wards", selectedWard.label);
            } else {
                formData.append("wardsId", data.individual.wardsId);
                formData.append("wards", data.individual.wards);
            }
            formData.append("address", specificAddress.trim());
            formData.append("cardNumber", cardNumber.trim());
            formData.append("cardGrantedDate", dateRangeCard.trim());
            formData.append("cardGrantedPlace", cardGrantedPlace.trim());
            formData.append("frontSideImage", cardFront);
            formData.append("backSideImage", cardBack);

            axios
                .patch(
                    `/organization/update/bidder/${id}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    setDisable(false);

                    alert("Edit profile successfully!!!");
                    navigate(`/profileOrganization/${id}`);
                })
                .catch((err) => {
                    setDisable(false);

                    alert(`🦄 Failed: ${err.response.data.message} , ${err}`);
                });
        }
        event.preventDefault();
    };

    const Cancel = () => {
        navigate(`/profileOrganization/${id}`);
    };
    return loading ? (
        <Loading />
    ) : (
        <>
            <Header />
            <NavBar />
            <PageName pageName={"Edit Profile"} link={`editProfile/${id}`} home={"homePage"} />
            <form onSubmit={handleSubmit}>
                <div className={styles.container2}>
                    <div className={styles.content}>
                        <div className={styles.add2}>
                            <p className={styles.textCreate}>Edit Profile</p>
                            <br />
                            <br />
                            <br />
                            <br />
                            <p className={styles.textBlue}>Organization information</p>
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
                                <option value="Male" selected={gender === "Male" ? true : false}>
                                    Male
                                </option>
                                <option value="Female" selected={gender === "Female" ? true : false}>
                                    Female
                                </option>
                                <option value="Other" selected={gender === "Other" ? true : false}>
                                    Other
                                </option>
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
                            {/* <br />
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
                            ></input> */}
                            <br />
                            <br />
                            <p className={styles.textRed}>Address</p>
                            <Select
                                className={styles.select}
                                name="cityId"
                                key={`cityId_${selectedCity?.value}`}
                                isDisabled={cityOptions.length === 0}
                                options={cityOptions}
                                onChange={(option) => {
                                    onCitySelect(option);
                                    setCheckCity(false);
                                    setCheckDistrict(false);
                                    setCheckWard(false);
                                }}
                                placeholder="Tỉnh/Thành"
                                defaultValue={checkCity == true ? { value: data.individual.cityId, label: data.individual.city } : selectedCity}
                            />
                            <br />
                            <br />
                            <Select
                                className={styles.select}
                                name="districtId"
                                key={`districtId_${selectedDistrict?.value}`}
                                isDisabled={districtOptions.length === 0}
                                options={districtOptions}
                                onChange={(option) => {
                                    onDistrictSelect(option);
                                    setCheckDistrict(false);
                                    setCheckWard(false);
                                }}
                                placeholder="Quận/Huyện"
                                defaultValue={
                                    checkDistrict == true ? { value: data.individual.districtId, label: data.individual.district } : selectedDistrict
                                }
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
                                onChange={(option) => {
                                    onWardSelect(option);
                                    setCheckWard(false);
                                }}
                                defaultValue={checkWard == true ? { value: data.individual.wardsId, label: data.individual.wards } : selectedWard}
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
                            />
                            <input
                                id="cardBack"
                                type="file"
                                // onChange={(e) => {
                                //   console.log(e.target.files[0]);
                                // }}
                                onChange={(e) => handleInputChange(e)}
                            />
                            <div className={styles.fl}>
                                <div className={styles.l}>
                                    {cardFront && <img src={cF ? URL.createObjectURL(cardFront) : cardFront} className={styles.img} alt="Thumb" />}
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
                                    {cardBack && <img src={cB ? URL.createObjectURL(cardBack) : cardBack} className={styles.img} alt="Thumb" />}
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <input
                                className={styles.btnAdd}
                                type="submit"
                                value="Save"
                                style={disable ? { backgroundColor: "red" } : { backgroundColor: "violet" }}
                                disabled={disable}
                            ></input>
                            <button
                                className={styles.btnCancel}
                                onClick={() => {
                                    navigate(`/profileOrganization/${id}`);
                                }}
                                disabled={disable}
                            >
                                Cancel
                            </button>
                        </div>
                        <Footer />
                        <FooterCopy />
                    </div>
                </div>
            </form>
            {/* <div className="con">
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
                        <input className="ipImg" id="cardFront" type="file" accept="image/*" onChange={(e) => handleInputChange(e)} />
                        <input className="ipImg2" id="cardBack" type="file" accept="image/*" onChange={(e) => handleInputChange(e)} />
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
            </div> */}
        </>
    );
};
export default EditProfileOrganization;
