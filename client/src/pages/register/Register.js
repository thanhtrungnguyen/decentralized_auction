import styles from "../../styleCss/register.module.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import useLocationForm from "./useLocationForm";
import Select from "react-select";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(true);
  const navigate = useNavigate();

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  const [firstName, setFirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [gender, setgender] = useState(null);
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [sepecificAddress, setSepecificAddress] = useState(null);
  const [cardNumber, setcardNumber] = useState(null);
  const [dateRangeCard, setdateRangeCard] = useState(null);
  const [cardGrantedPlace, setCardGrantedPlace] = useState(null);
  const [cardFront, setCardFront] = useState(null);
  const [cardBack, setCardBack] = useState(null);
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [role, setRole] = useState("BIDDER");

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
    if (id === "sepecificAddress") {
      setSepecificAddress(value);
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
  };
  const handleSubmit = (event) => {
    let cityId = selectedCity.value;
    let districtId = selectedDistrict.value;
    let wardId = selectedWard.value;
    let cardfront = cardFront.name;
    let cardback = cardBack.name;
    axios
      .post("http://localhost:8800/api/auth/register", {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        email,
        phone,
        cityId,
        districtId,
        wardId,
        sepecificAddress,
        cardNumber,
        dateRangeCard,
        cardGrantedPlace,
        cardfront,
        cardback,
        userName,
        password,
        role,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(res.data.message);
        navigate("/login");
      });
    alert(
      "infomation: " +
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
        sepecificAddress +
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
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <p className={styles.textCreate}>Create your DAP account</p>
        <p className={styles.textAd}>Already have an account? Login</p>
        <div className={styles.divImg}>
          <div className={styles.divI}></div>
          <p className={styles.textFor}>For personal</p>
        </div>
        <div className={styles.divImg2}>
          <div className={styles.divI}></div>
          <p className={styles.textFor}>For organization</p>
        </div>
        <p className={styles.textBlue}>Personal Infomation</p>
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
        <select
          id="gender"
          className={styles.dropdown}
          onChange={(e) => handleInputChange(e)}
          placeholder="Gender"
        >
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
          // pattern="/(8|0)\d{9}/"
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
          placeholder="Specific address"
          value={sepecificAddress}
          onChange={(e) => handleInputChange(e)}
          id="sepecificAddress"
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
        <input
          type="date"
          className={styles.ip3}
          value={dateRangeCard}
          onChange={(e) => handleInputChange(e)}
          id="dateRangeCard"
        ></input>
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
        <p className={styles.textBlue}>Account Infomation</p>
        <input
          className={styles.inputEP}
          type="text"
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
        <input
          type="submit"
          className={styles.ipsubmit}
          value="SIGN IN"
        ></input>
      </div>
    </form>
  );
};

export default Register;
