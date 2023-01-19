import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { useNotification } from "web3uikit";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
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
    const dispatch = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios
            .post(
                "/session",
                { username, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )
            .then((response) => {
                if (response.status === 201) {
                    if (response.data.user.role === "bidder") {
                        navigate("/homePage");
                    }
                    if (response.data.user.role === "admin") {
                        navigate("/listManagers");
                    }
                    if (response.data.user.role === "seller") {
                        navigate("/myProperty");
                    }
                    if (response.data.user.role === "manager") {
                        navigate("/auctionListForManager");
                    }
                }
            })
            .catch((error) => {
                dispatch({
                    type: "error",
                    title: error.response.statusText,
                    message: error.response.data.message,
                    position: "topR",
                    icon: <AiOutlineClose />,
                });
            });
    };

    return (
        <>
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
        </>
    );
};

export default Login;
