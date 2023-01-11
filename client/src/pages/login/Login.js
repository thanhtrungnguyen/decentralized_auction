import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AiFillHome } from "react-icons/ai";
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [message, setMassage] = useState("");
    const togglePasswordVisibility = () => {
        setPasswordShown1(passwordShown1 ? false : true);
    };
    const [passwordShown1, setPasswordShown1] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // axios
        //     .post("http://localhost:8800/api/auth/login", { username, password }, { withCredentials: true })
        //     .then((res) => {
        //         console.log(res);
        //         if (res.data.success === "false") {
        //             alert(res.data.message);
        //         } else {
        //             if (res.data.role === "BIDDER") {
        //                 navigate("/homePage");
        //             }
        //             if (res.data.role === "ADMIN") {
        //                 navigate("/listManagers");
        //             }
        //             if (res.data.role === "SELLER") {
        //                 navigate("/myProperty");
        //             }
        //             if (res.data.role === "MANAGER") {
        //                 navigate("/autionsListForManager");
        //             }
        //         }
        //     })
        //     .catch((reason) => {
        //         alert("Incorrect username or Password!!!");
        //         console.log(reason);
        //     });
        axios.post("/session", { username, password }).then((response) => {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
        });

        // localStorage.setItem(
        //     "accessToken",
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JkODUzMWNjOWQ3NWNkODc4MDQ1NGMiLCJ1c2VybmFtZSI6InNlbGxlcjZAZnB0LmVkdS52biIsInZlcmlmaWNhdGlvbkNvZGUiOiI5NzJkZWZlNC01MTQzLTQxOTYtYWZkMC05YzZhZDdmNDUxNWMiLCJ2ZXJpZmllZCI6ZmFsc2UsInN0YXR1cyI6dHJ1ZSwicm9sZSI6InNlbGxlciIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTBUMTU6MzM6MDUuNDE2WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTBUMTU6MzM6MDUuNDE2WiIsInNlc3Npb24iOiI2M2JlMzc5NDcwMGE1NjVkYTA1MTY0NTQiLCJpYXQiOjE2NzM0MTA0NTIsImV4cCI6MTcwNDk2ODA1Mn0.cAPsFf_FBja4BQp5wFmcQsVwUah5s-9ZyQISXJcf47Q"
        // );
    };

    return (
        <>
            {/* <Header />

            <NavBar />
            <PageName pageName={"Login"} link={"login"} home={"homePage"} />
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            <p className={styles.text}>
                                <Link to="/register" className={styles.text}>
                                    Don’t have an Account?Create account{" "}
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
            <FooterCopy /> */}
            <div className={styles.col}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.col1}>
                        <p className={styles.wel}>WELCOME BACK!</p>
                        <p className={styles.don}>
                            Don’t have an Account?{" "}
                            <Link className={styles.sig} to="/register">
                                Sign up{" "}
                            </Link>
                        </p>
                        <p className={styles.use}>username</p>
                        <input
                            className={styles.ip}
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        ></input>
                        <p className={styles.use}>Password</p>
                        <input
                            className={styles.ip}
                            type={passwordShown1 ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                        <i className={styles.eye} onClick={togglePasswordVisibility}>
                            {eye}
                        </i>
                        <br />
                        <br />
                        <p>
                            <Link className={styles.forget} to="/enterEmail">
                                Forget password?
                            </Link>
                        </p>
                        <br />
                        <br />
                        <input className={styles.btn} type="submit" value="Sign in" />
                    </div>
                    <div className={styles.col2}>
                        <div className={styles.conLink}>
                            <Link to="/" className={styles.L}>
                                Help
                            </Link>
                            <Link to="/aboutUs" className={styles.L}>
                                Contact us
                            </Link>
                            <Link to="/register" className={styles.L}>
                                Sign Up
                            </Link>
                            <Link to="/" className={styles.L}>
                                <AiFillHome className={styles.i} />
                            </Link>
                        </div>
                        <img
                            className={styles.img}
                            src="https://assets.theedgemarkets.com/CC8_PropertiesAuction_TEM1360_20210309141323_theedgemarkets.jpg?s4zjV1d2tX8f3s3TAw4hfjvyDyJM21mP"
                            alt="img"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
