import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
const EnterEmail = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios
            .post("/auth/forgotPassword", { userName }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                console.log(res.data);
            })
            .catch((err) => {
                alert(`🦄 Failed: ${err.response.data.message} , ${err}`);
            });
        alert("Please check your email !!!");
        navigate("/homePage");
    };

    return (
        <>
            <Header />
            <NavBar />
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.group3}>
                        <div className={styles.group2}>
                            <p className={styles.txtLogin}>Forgot Password</p>
                            <p className={styles.text}>Please enter your email to reset password </p>
                            <input
                                type="text"
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
