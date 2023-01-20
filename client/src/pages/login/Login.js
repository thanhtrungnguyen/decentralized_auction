import styles from "../../styleCss/login.module.css";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { useNotification } from "web3uikit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";

const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {
    // debugger;
    const { setAuth } = useAuth();
    const dispatch = useNotification();
    const navigate = useNavigate();
    const location = useLocation();

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMassage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword ? false : true);
    };

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMassage("");
    }, [username, password]);

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
                console.log("there");
                if (response.status === 201) {
                    const user = response.data.user;
                    const accessToken = response.data.accessToken;
                    const refreshToken = response.data.refreshToken;
                    setAuth({ user, accessToken, refreshToken });
                    setUsername("");
                    setPassword("");

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
                if (!error?.response) {
                    setErrorMassage("No server response");
                } else if (error.response?.status === 422) {
                    setErrorMassage("Unprocessable Entity");
                } else if (error.response?.status === 401) {
                    setErrorMassage(error.response?.data?.message);
                } else {
                    setErrorMassage("Login Failed");
                }
                errorRef.current.focus();
                console.log(errorMessage);
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
                        <p className={styles.use}>Username</p>
                        <input
                            className={styles.ip}
                            type="text"
                            id="username"
                            ref={usernameRef}
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        ></input>
                        <p className={styles.use}>Password</p>
                        <input
                            className={styles.ip}
                            type={showPassword ? "text" : "password"}
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
                        <p ref={errorRef} className={errorMessage ? styles.errorMessage : styles.offscreen} aria-live="assertive">
                            {errorMessage}
                        </p>
                        <input className={styles.btn} type="submit" value="Sign in" />
                        <p>
                            <Link className={styles.forget} to="/enterEmail">
                                Forget password?
                            </Link>
                        </p>
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
