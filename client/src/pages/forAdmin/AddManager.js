import styles from "../../styleCss/stylesPages/forAdmin/addManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const AddManager = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "userName") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    };
    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append("userName", username);
        formData.append("password", password);
        console.log(formData.get("userName"));
        axios
            .post(
                "http://localhost:8800/api/auth/registerManager",
                { userName, password },

                { withCredentials: true }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                navigate("/listManagers");
            });
        event.preventDefault();
    };
    const cancel = () => {
        navigate("/listManagers");
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
    return (
        <>
            {(() => {
                if (getUser().role == "ADMIN") {
                    return <HeaderUser userName={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <div className={styles.content}>
                        <div className={styles.add}>
                            <label className={styles.title}>Add a New Manager</label>
                            <br />
                            <label className={styles.txt}>Username</label>
                            <input
                                id="userName"
                                type="text"
                                className={styles.input}
                                value={userName}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            <label></label>
                            <br />
                            <br />
                            <br />
                            <label className={styles.txt}>Password</label>
                            <input
                                id="password"
                                type="text"
                                className={styles.input}
                                value={password}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            <br />
                            <input type="button" value="Cancel" className={styles.btnCancel} onClick={cancel}></input>
                            <input type="submit" value="Add Manager" className={styles.btnSubmit}></input>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default AddManager;
