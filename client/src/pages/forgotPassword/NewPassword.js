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
const NewPassword = () => {
    const axios = useAxiosPrivate();
    const { userId, token } = useParams();

    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
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
        if (rePassword !== password) {
            notify("🦄 Please enter match the password");
        } else if (!password.trim()) {
            notify("🦄 password is empty");
        } else if (!rePassword.trim()) {
            notify("🦄 rePassword is empty");
        } else if (password.trim().length < 8) {
            notify("🦄 newPassword is must be more than 8 character");
        } else {
            await axios
                .post("/auth/reset-password", { password1: password, password2: rePassword, userId: userId, token: token }, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    // alert(res.data.message);
                    navigate(`/login`);
                })
                .catch((err) => {
                    alert(`🦄 Failed: ${err.response.data.message} , ${err}`);
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
                    {/* Same as */}
                    <ToastContainer />
                    <div className={styles.group3}>
                        <div className={styles.group2}>
                            <p className={styles.txtLogin}>Forgot Password</p>
                            <p className={styles.text}>Please enter code chagne password we send your email </p>
                            <div>
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
                            <div>
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
                            <label style={{ color: "red" }}>{message}</label>

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

export default NewPassword;
