import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post("http://localhost:8800/api/auth/login", { userName, password }, { withCredentials: true }).then((res) => {
            console.log(res);
            if(res.data.role == "BIDDER"){
                navigate("/homePage");
            }
            if(res.data.role == "ADMIN"){
                navigate("/listManagers");
            }
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
                            <p className={styles.txtLogin}>Login</p>
                            <p className={styles.text}>Please login using account detail bellow.</p>
                            <input
                                type="text"
                                className={styles.textField}
                                placeholder="Email Address"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            ></input>
                            <input
                                type="password"
                                className={styles.textField}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></input>
                            <p className={styles.text}>
                                <Link to="/enterEmail" className={styles.text}>
                                    Forgot your password?
                                </Link>
                            </p>

                            <input className={styles.btnSignIn} type="submit" value="Sign in" />
                            <p className={styles.text}>Don’t have an Account?Create account </p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;
