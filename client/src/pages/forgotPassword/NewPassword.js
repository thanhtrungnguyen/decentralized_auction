import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";

const NewPassword = () => {
    const { userId, token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handleSubmit = async (event) => {
        navigate(`/login`);

        event.preventDefault();
        axios
            .post(
                "http://localhost:8800/api/auth/reset-password",
                { password1: password, password2: rePassword, userId: userId, token: token },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                // alert(res.data.message);
            });
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
                            <p className={styles.text}>Please enter code chagne password we send your email </p>
                            <input
                                type="password"
                                className={styles.textField}
                                placeholder="Enter New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></input>
                            <input
                                type="password"
                                className={styles.textField}
                                placeholder="Re-Enter New Password"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
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

export default NewPassword;
