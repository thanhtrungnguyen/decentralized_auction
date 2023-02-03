import styles from "../../styleCss/login.module.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import { ToastContainer, toast } from "react-toastify";

import Footer from "../../components/footer/Footer";
const ForgotPassword = () => {
    const axios = useAxiosPrivate();

    const [username, setUsername] = useState("");
    const [message, setMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const handleSubmit = async (event) => {
        if (!username.trim()) {
            setErrorMessage("Username is require");
        } else {
            axios
                .post("/user/forgotPassword", { username })
                .then((response) => {
                    if (response.status === 201) {
                        setMessage(response?.data?.message);
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

    useEffect(() => {
        setErrorMessage("");
    }, [username]);

    return (
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
                            <p className={styles.txtLogin}>Forgot Password</p>
                            <p className={styles.text}>Please enter your Username to reset password </p>
                            <input
                                type="text"
                                className={styles.textField}
                                placeholder="Username "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            ></input>
                            <p className={errorMessage ? styles.errorMessage : styles.offscreen}>{errorMessage}</p>
                            <p className={styles.txtLogin}>{message}</p>
                            <br />
                            <br />
                            <br />
                            <input className={styles.btnSignIn} type="submit" value="Continue" />
                            <p className={styles.text}>Don’t have an Account?Create account </p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ForgotPassword;
