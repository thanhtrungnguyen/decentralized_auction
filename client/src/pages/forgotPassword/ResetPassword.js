import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const ResetPassword = () => {
    const axios = useAxiosPrivate();
    const { userId, passwordResetCode } = useParams();

    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [passwordShown1, setPasswordShown1] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown1(passwordShown1 ? false : true);
    };
    const toggleRePasswordVisibility = () => {
        setPasswordShown2(passwordShown2 ? false : true);
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
        setErrorMessage();
        setMessage();
        if (password.trim().length < 8) {
            setErrorMessage("Password is must be more than 8 character");
        } else if (rePassword !== password) {
            setErrorMessage("Password and confirm password does not match");
        } else {
            axios
                .post(`/user/resetPassword/${userId}/${passwordResetCode}`, { password: password, passwordConfirmation: rePassword })
                .then((response) => {
                    if (response.status === 201) {
                        setMessage(response?.data?.message);
                        navigate("/resetPasswordDone");
                    }
                })
                .catch((error) => {
                    console.log(error?.response);
                    if (!error?.response) {
                        setErrorMessage("No server response");
                    } else if (error.response?.status === 422) {
                        setErrorMessage("Unprocessable Entity");
                    } else if (error.response?.status === 401 || 403 || 404) {
                        setErrorMessage(error.response?.data?.message);
                    } else {
                        setErrorMessage("Reset password failed");
                    }
                });
        }

        event.preventDefault();
    };

    return (
        <>
            <Header />
            <NavBar />
            <div>
                <form onSubmit={handleSubmit}>
                    {" "}
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
                    <ToastContainer />
                    <div className={styles.group3}>
                        <div className={styles.group2}>
                            <p className={styles.txtLogin}>Forgot Password</p>
                            <p className={styles.text}>Please enter code chagne password we send your email </p>
                            <div className={styles.hide}>
                                <input
                                    type={passwordShown1 ? "text" : "password"}
                                    className={styles.textField}
                                    placeholder="Enter New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                ></input>
                                <i onClick={togglePasswordVisibility}>{eye}</i>
                            </div>
                            <div className={styles.hide}>
                                <input
                                    type={passwordShown2 ? "text" : "password"}
                                    className={styles.textField}
                                    placeholder="Re-Enter New Password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                    required
                                ></input>
                                <i onClick={toggleRePasswordVisibility}>{eye}</i>
                            </div>
                            <label style={{ color: "blue" }}>{message}</label>
                            <label style={{ color: "red" }}>{errorMessage}</label>

                            <br />
                            <br />
                            <br />
                            <input className={styles.btnSignIn} type="submit" value="Save change" />
                            <p className={styles.text}>Don’t have an Account?Create account </p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ResetPassword;
