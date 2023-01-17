import styles from "../../styleCss/stylesPages/forAdmin/addManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
// import { Outlet, Link } from "react-router-dom";
// import sPagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import FooterCopy from "../../components/footer/FooterCopy";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";

const AddManager = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState("Male");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specificAddress, setSpecificAddress] = useState('');
    const [message, setMessage] = useState('');
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
        setLoading(false);
    }, []);
    const handleInputChange = (e) => {
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
            setPhone(value);
        }
        if (id === "specificAddress") {
            setSpecificAddress(value);
        }
    };
    const handleSubmit = (event) => {
        if (rePassword !== password) {
            setMessage("Please enter match the password");
        } else {
            axios
                .post(
                    "/informationOperator/create",
                    {
                        username: username,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        email: email,
                        gender: gender,
                        address: specificAddress,
                        role: 'manager'
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    alert("Add manager successfully!!!");
                    navigate("/listManagers");
                });
        }

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
    return loading ? (
        <Loading />
    ) : (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <Time />

                    <div className={styles.add}>
                        <p className={styles.title}>Add New Manager</p>
                        <p className={styles.if}>Basic Information</p>
                        <p className={styles.txt}>First Name</p>
                        <input className={styles.ip} type="text" onChange={(e) => handleInputChange(e)} id="firstName"></input>
                        <p className={styles.txt}>Last Name</p>
                        <input className={styles.ip} type="text" onChange={(e) => handleInputChange(e)} id="lastName"></input>
                        <p className={styles.txt}>Gender</p>
                        <select id="gender" className={styles.ip} onChange={(e) => handleInputChange(e)} placeholder="Gender" defaultValue="Male">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <p className={styles.txt}>Email</p>
                        <input className={styles.ip} type="text" onChange={(e) => handleInputChange(e)} id="email"></input>
                        <p className={styles.txt}>Phone</p>
                        <input className={styles.ip} type="text" onChange={(e) => handleInputChange(e)} id="phone"></input>
                        <p className={styles.txt}>Address</p>
                        <input className={styles.ip} type="text" onChange={(e) => handleInputChange(e)} id="specificAddress"></input>
                        <p className={styles.if}>Account Information</p>
                        <p className={styles.txt}>Username</p>
                        <input className={styles.ip} type="text" onChange={(e) => handleInputChange(e)} id="username"></input>
                        <p className={styles.txt}>Password</p>
                        <input className={styles.ip} type="password" onChange={(e) => handleInputChange(e)} id="password"></input>
                        <p className={styles.txt}>Re-Password</p>
                        <input className={styles.ip} type="password" onChange={(e) => handleInputChange(e)} id="rePassword"></input>
                        <label style={{ color: "red" }}>{message}</label>
                        <br />
                        <br />
                        <br />
                        <br />
                        <input className={styles.btnAdd} type="submit" value="Add"></input>
                        <button
                            className={styles.btnCancel}
                            onClick={() => {
                                navigate("/listManagers");
                            }}
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
