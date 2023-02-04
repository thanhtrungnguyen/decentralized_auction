import styles from "../../styleCss/stylesPages/forAdmin/addManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
// import { Outlet, Link } from "react-router-dom";
// import sPagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";

import FooterCopy from "../../components/footer/FooterCopy";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const AddManager = () => {
    const axios = useAxiosPrivate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("Male");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState('');
    const [specificAddress, setSpecificAddress] = useState("");
    const [message, setMessage] = useState("");
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(false);
    const type = "operator";
    const navigate = useNavigate();
    const [disable, setDisable] = useState(false);
    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown1(passwordShown1 ? false : true);
    };
    const toggleRePasswordVisibility = () => {
        setPasswordShown2(passwordShown2 ? false : true);
    };
    const handleInputChange = (e) => {
        const regexNumber = /^[0-9\b]+$/;
        const { id, value } = e.target;
        if (id === "username") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "rePassword") {
            setRePassword(value);
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
        if (id === "email") {
            setEmail(value);
        }
        if (id === "phone") {
            if (value === '' || regexNumber.test(value)) setPhone(value);
        }
        if (id === "specificAddress") {
            setSpecificAddress(value);
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
    const [isExist, setIsExit] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
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
                if (item.phone === phone) {
                    setCheckPhone(true);
                    console.log(item.phone);
                } else {
                    setCheckPhone(false);
                }
                if (item.email === email) {
                    setCheckEmail(true);
                    console.log(item.email);
                } else {
                    setCheckEmail(false);
                }
            });
        });
        if (!firstName.trim()) {
            notify("🦄 FirstName is empty");
        } else if (!lastName.trim()) {
            notify("🦄 LastName is empty");
        } else if (!gender) {
            notify("🦄 Gender is empty");
        } else if (!email.trim()) {
            notify("🦄 Email is empty");
        } else if (!phone.trim()) {
            notify("🦄 phone is empty");
        } else if (!specificAddress.trim()) {
            notify("🦄 specificAddress is empty");
        } else if (!username.trim()) {
            notify("🦄 username is empty");
        } else if (!password.trim()) {
            notify("🦄 password is empty");
        } else if (!rePassword.trim()) {
            notify("🦄 rePassword is empty");
        } else if (isExist) {
            notify("🦄 Username is exist");
        } else if (checkPhone) {
            notify("🦄 Phone is exist");
        } else if (checkEmail) {
            notify("🦄 Email is exist");
        } else if (rePassword != password) {
            notify("🦄 rePassword is not same password");
        } else {
            setDisable(true);

            axios
                .post(
                    "/informationOperator/create",
                    {
                        username: username.trim(),
                        password: password.trim(),
                        passwordConfirmation: rePassword.trim(),
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        phone: phone.trim(),
                        email: email.trim(),
                        gender: gender.trim(),
                        address: specificAddress.trim(),
                        role: "manager",
                        type: type,
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    setDisable(false);

                    alert("Add manager successfully!!!");
                    navigate("/listManagers");
                })
                .catch((err) => {
                    setDisable(false);

                    notify(`🦄 Create Failed: ${err.response.data.message}, ${err}`);
                });
        }

        event.preventDefault();
    };

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
                    <div className={styles.add}>
                        <p className={styles.title}>Add New Manager</p>
                        <p className={styles.if}>Basic Information</p>
                        <p className={styles.txt}>First Name</p>
                        <input
                            className={styles.ip}
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            id="firstName"
                            pattern="[a-zA-Z\s]{1,50}"
                            required
                        ></input>
                        <p className={styles.txt}>Last Name</p>
                        <input
                            className={styles.ip}
                            pattern="[a-zA-Z\s]{1,50}"
                            required
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            id="lastName"
                        ></input>
                        <p className={styles.txt}>Gender</p>
                        <select id="gender" className={styles.ip} onChange={(e) => handleInputChange(e)} placeholder="Gender" defaultValue="Male">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <p className={styles.txt}>Email</p>
                        <input
                            className={styles.ip}
                            type="email"
                            onChange={(e) => handleInputChange(e)}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            required
                            id="email"
                        ></input>
                        <p className={styles.txt}>Phone</p>
                        <input
                            className={styles.ip}
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            required
                            value={phone}
                            id="phone"
                            pattern="(0[3|5|7|8|9])+([0-9]{8})\b"
                        ></input>
                        <p className={styles.txt}>Address</p>
                        <input
                            className={styles.ip}
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            required
                            pattern="^\s*([^\s]\s*){0,300}$"
                            id="specificAddress"
                        ></input>
                        <p className={styles.if}>Account Information</p>
                        <p className={styles.txt}>Username</p>
                        <input
                            className={styles.ip}
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            id="username"
                            required
                            pattern="?=.{6,20}$"
                        ></input>
                        <p className={styles.txt}>Password</p>
                        <input
                            className={styles.ip}
                            type={passwordShown1 ? "text" : "password"}
                            value={password}
                            onChange={(e) => handleInputChange(e)}
                            id="password"
                            required
                            pattern="^\s*(?:\S\s*){8,}$"
                        ></input>
                        <i className={styles.i} onClick={togglePasswordVisibility}>
                            {eye}
                        </i>
                        <p className={styles.txt}>Re-Password</p>
                        <input
                            className={styles.ip}
                            type={passwordShown2 ? "text" : "password"}
                            value={rePassword}
                            required
                            onChange={(e) => handleInputChange(e)}
                            id="rePassword"
                            pattern="^\s*(?:\S\s*){8,}$"
                        ></input>
                        <i className={styles.i} onClick={toggleRePasswordVisibility}>
                            {eye}
                        </i>
                        <label style={{ color: "red" }}>{message}</label>
                        <br />
                        <br />
                        <br />
                        <br />
                        <input
                            className={styles.btnAdd}
                            type="submit"
                            value="Add"
                            style={disable ? { backgroundColor: "red" } : { backgroundColor: "violet" }}
                            disabled={disable}
                        ></input>
                        <button
                            className={styles.btnCancel}
                            onClick={() => {
                                navigate("/listManagers");
                            }}
                            disabled={disable}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddManager;
