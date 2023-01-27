import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import { ToastContainer, toast } from "react-toastify";

import Footer from "../../components/footer/Footer";
const EnterEmail = () => {
    const axios = useAxiosPrivate();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
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
        if (!userName.trim()) {
            notify("🦄 userName is empty");
        } else {
            axios
                .post("/auth/forgotPassword", { userName }, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    navigate("/homePage");
                })
                .catch((err) => {
                    alert(`🦄 Failed: ${err.response.data.message} , ${err}`);
                });
            // alert("Please check your email !!!");
        }
        event.preventDefault();
    };

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
                            <p className={styles.text}>Please enter your email to reset password </p>
                            <input
                                type="email"
                                className={styles.textField}
                                placeholder="Email Address"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            ></input>
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

export default EnterEmail;
