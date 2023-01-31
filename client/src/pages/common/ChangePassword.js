import styles from "../../styleCss/login.module.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

import FooterCopy from "../../components/footer/FooterCopy";
import HeaderUser from "../../components/header/HeaderUser";
// import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import { ToastContainer, toast } from "react-toastify";
// import bcrypt from "bcryptjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useFetchData, useFetchSession } from "../../hooks/useFetch";
const eye = <FontAwesomeIcon icon={faEye} />;
const ChangePassword = () => {
    const axios = useAxiosPrivate();
    const navigate = useNavigate();
    const { loading: loading2, data: data2, error } = useFetchSession("/session");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);
    const [passwordShown3, setPasswordShown3] = useState(false);
    //const [match, setMatch] = useState(null);

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
    const handleSubmit = async (event) => {
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
                    // console.log(res);
                    // console.log(res.data);
                    alert("Change password successfully!!!");
                    navigate(`/profile/${data2?.user._id}`);
                })
                .catch((err) => {
                    //console.error(err.response.data.message);
                    notify(`🦄 Change password Failed: ${err.response.data.message} , ${err}`);
                });
        }
        event.preventDefault();
        // const formData = new FormData();
        // if (rePassword !== password) {
        //     setMessage("Please enter match the password");
        // } else {
        //     await axios
        //         .put(
        //             "http://localhost:8800/api/auth/changePassword",
        //             {
        //                 oldPassword: oldPassword,
        //                 newPassword: password,
        //                 rePassword: rePassword,
        //                 userName: getUser().userName,
        //             },
        //             { withCredentials: true }
        //         )
        //         .then((res) => {
        //             // console.log(res);
        //             // console.log(res.data);
        //             alert("Change password successfully!!!");
        //             navigate(`/homePage`);
        //         })
        //         .catch((error) => {
        //             alert("Change password Failure!!!");
        //             navigate(`/changePassword/${id}`);
        //         });
        //     event.preventDefault();
        // }
    };

    return loading2 ? (
        <Loading />
    ) : (
        <>
            <Header />
            <NavBar />
            <div>
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
                    <div className={styles.group3}>
                        <div className={styles.group2}>
                            <p className={styles.txtLogin}>Change Password</p>
                            <div className={styles.hide}>
                                <input
                                    id="oldPassword"
                                    type={passwordShown1 ? "text" : "password"}
                                    className={styles.textField}
                                    placeholder="Enter Old Password"
                                    value={oldPassword}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                                <i className={styles.ce} onClick={toggleOldPasswordVisibility}>
                                    {eye}
                                </i>
                            </div>
                            <div className={styles.hide}>
                                <input
                                    id="newPassword"
                                    type={passwordShown2 ? "text" : "password"}
                                    className={styles.textField}
                                    placeholder="Enter New Password"
                                    value={newPassword}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                                <i className={styles.ce} onClick={toggleNewPasswordVisibility}>
                                    {eye}
                                </i>
                            </div>

                            <div className={styles.hide}>
                                <input
                                    id="rePassword"
                                    type={passwordShown3 ? "text" : "password"}
                                    className={styles.textField}
                                    placeholder="Re-Enter New Password"
                                    value={rePassword}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                                <i className={styles.ce} onClick={toggleRePasswordVisibility}>
                                    {eye}
                                </i>
                            </div>
                            {/* <label style={{ color: "red" }}>{message}</label> */}
                            <br />
                            <br />
                            <br />
                            {/* <input className={styles.btnSignIn} type="submit" value="Continue" /> */}
                            <Button className={styles.btnSignIn} onClick={handleSubmit}>
                                Continue
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
            <FooterCopy />
        </>
    );
};

export default ChangePassword;
