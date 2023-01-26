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
// import bcrypt from "bcryptjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const ChangePassword = () => {
    const axios = useAxiosPrivate();
    const { id } = useParams();
    // const baseURL = `http://localhost:8800/api/user/${id}`;
    // const { data, loading, error } = useFetch(baseURL);
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();
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
        if (id === "password") {
            setPassword(value);
        }
        if (id === "rePassword") {
            setRePassword(value);
        }
    };
    const handleSubmit = async (event) => {
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

    return loading ? (
        <Loading />
    ) : (
        <>
            <Header />
            <NavBar />
            <div>
                <form onSubmit={handleSubmit}>
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
                                    id="password"
                                    type={passwordShown2 ? "text" : "password"}
                                    className={styles.textField}
                                    placeholder="Enter New Password"
                                    value={password}
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
                            <label style={{ color: "red" }}>{message}</label>
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
