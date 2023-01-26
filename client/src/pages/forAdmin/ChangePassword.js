import styles from "../../styleCss/stylesPages/forAdmin/addSeller.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SidebarAdmin from "../../components/sidebar_admin/SidebarAdmin";
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
import useAuth from "../../hooks/useAuth";
const ChangePasswordAdmin = () => {
    const axios = useAxiosPrivate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth();
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "oldPassword") {
            setOldPassword(value);
        }
        if (id === "newPassword") {
            setNewPassword(value);
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

    const handleSubmit = (event) => {
        if (!oldPassword.trim()) {
            notify("🦄 oldPassword is empty");
        } else if (!newPassword.trim()) {
            notify("🦄 newPassword is empty");
        } else if (!rePassword.trim()) {
            notify("🦄 rePassword is empty");
        } else if (rePassword !== newPassword) {
            notify("🦄 rePassword is not same password");
        } else {
            const formData = new FormData();

            formData.append("oldPassword", oldPassword.trim());
            formData.append("password", newPassword.trim());
            formData.append("passwordConfirmation", rePassword.trim());
            axios
                .post(`/user/changePassword/${auth.user._id}`, formData, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    alert("Change password successfully!!!");
                    navigate("/profileAdmin");
                })
                .catch((err) => {
                    console.error(err.response.data.message);
                    notify(`🦄 Change password Failed: ${err.response.data.message}`);
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
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.container2}>
                    <SidebarAdmin />
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
                        <div className={styles.add2}>
                            <p className={styles.textCreate}>Change Password</p>
                            <br />
                            <br />
                            <br />
                            <br />

                            <p className={styles.textBlue}>Username</p>
                            <input
                                className={styles.inputEP}
                                type="text"
                                pattern="?=.{8,20}$"
                                value={auth.user.username}
                                onChange={(e) => handleInputChange(e)}
                                id="userName"
                                placeholder="Username"
                                //required
                                readOnly
                            ></input>
                            <br />
                            <br />
                            <p className={styles.textBlue}>Old password</p>

                            <input
                                className={styles.inputEP}
                                type="oldPassword"
                                //pattern="^\s*(?:\S\s*){8,}$"
                                value={oldPassword}
                                onChange={(e) => handleInputChange(e)}
                                id="oldPassword"
                                placeholder="Old Password"
                                //required
                            ></input>
                            <br />
                            <br />
                            <p className={styles.textBlue}>New Password</p>

                            <input
                                className={styles.inputEP}
                                type="password"
                                value={newPassword}
                                onChange={(e) => handleInputChange(e)}
                                id="newPassword"
                                placeholder="Enter the new password"
                                //required
                            ></input>
                            <br />
                            <br />
                            <p className={styles.textBlue}>Confirm new Password</p>

                            <input
                                className={styles.inputEP}
                                type="password"
                                value={rePassword}
                                onChange={(e) => handleInputChange(e)}
                                id="rePassword"
                                placeholder="Confirm new Password"
                                //required
                            ></input>
                            <br />
                            <br />
                            <input className={styles.btnAdd} type="submit" value="Save"></input>
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
                </div>
            </form>
        </>
    );
};
export default ChangePasswordAdmin;
