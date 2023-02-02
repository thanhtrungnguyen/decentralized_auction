import styles from "../../styleCss/stylesPages/forAdmin/addSeller.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SidebarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";

import Select from "react-select";
import useLocationForm from "../register/useLocationForm";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useFetchSession } from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const ChangePasswordAdmin = () => {
    const axios = useAxiosPrivate();
    const navigate = useNavigate();
    const { loading: loading2, data: data2, error } = useFetchSession("/session");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);
    const [passwordShown3, setPasswordShown3] = useState(false);
    const toggleOldPasswordVisibility = () => {
        setPasswordShown1(passwordShown1 ? false : true);
    };
    const toggleNewPasswordVisibility = () => {
        setPasswordShown2(passwordShown2 ? false : true);
    };
    const toggleRePasswordVisibility = () => {
        setPasswordShown3(passwordShown3 ? false : true);
    };
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
        } else if (newPassword.trim().length < 8) {
            notify("🦄 newPassword is must be more than 8 character");
        } else {
            const formData = new FormData();

            formData.append("oldPassword", oldPassword.trim());
            formData.append("password", newPassword.trim());
            formData.append("passwordConfirmation", rePassword.trim());
            axios
                .post(`/user/changePassword/${data2.user._id}`, formData, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    alert("Change password successfully!!!");
                    navigate(`/profileAdmin/${data2?.user._id}`);
                })
                .catch((err) => {
                    // console.error(err.response.data.message);
                    notify(`🦄 Change password Failed: ${err.response.data.message}`);
                });
        }
        event.preventDefault();
    };
    const Cancel = () => {
        navigate("/listSellers");
    };
    return loading2 ? (
        <Loading />
    ) : (
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
                                value={data2?.user.username}
                                onChange={(e) => handleInputChange(e)}
                                id="userName"
                                placeholder="Username"
                                //required
                                readOnly
                            ></input>
                            <br />
                            <br />
                            <p className={styles.textBlue}>Old password</p>
                            <div>
                                <input
                                    className={styles.inputEP}
                                    type={passwordShown1 ? "text" : "password"}
                                    //pattern="^\s*(?:\S\s*){8,}$"
                                    value={oldPassword}
                                    onChange={(e) => handleInputChange(e)}
                                    id="oldPassword"
                                    placeholder="Old Password"
                                //required
                                ></input>
                                <i onClick={toggleOldPasswordVisibility}>{eye}</i>
                            </div>

                            <br />
                            <br />
                            <p className={styles.textBlue}>New Password</p>
                            <div>
                                <input
                                    className={styles.inputEP}
                                    type={passwordShown2 ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => handleInputChange(e)}
                                    id="newPassword"
                                    placeholder="Enter the new password"
                                //required
                                ></input>
                                <i onClick={toggleNewPasswordVisibility}>{eye}</i>
                            </div>
                            <br />
                            <br />
                            <p className={styles.textBlue}>Confirm new Password</p>
                            <div>
                                <input
                                    className={styles.inputEP}
                                    type={passwordShown3 ? "text" : "password"}
                                    value={rePassword}
                                    onChange={(e) => handleInputChange(e)}
                                    id="rePassword"
                                    placeholder="Confirm new Password"
                                //required
                                ></input>
                                <i onClick={toggleRePasswordVisibility}>{eye}</i>
                            </div>
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
