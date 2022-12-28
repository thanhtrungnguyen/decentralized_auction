import styles from "../../styleCss/stylesPages/forAdmin/addManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
// import { Outlet, Link } from "react-router-dom";
// import sPagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import FooterCopy from "../../components/footer/FooterCopy";
import Loading from "../../components/loading/Loading";

const AddManager = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
        if (id === "userName") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    };
    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append("userName", userName);
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
    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
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
                                pattern="[a-zA-Z]{1,50}"
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
                                type="password"
                                pattern="^\s*(?:\S\s*){8,}$"
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
                    <FooterCopy />
                </div>
            </form>
        </>
    );
};
export default AddManager;
