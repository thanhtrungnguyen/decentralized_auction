import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import FooterCopy from "../../components/footer/FooterCopy";
import HeaderUser from "../../components/header/HeaderUser";
// import { useFetch } from "../../hook/useFetch";
// import Loading from "../../components/loading/Loading";
// import bcrypt from "bcryptjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const ChangePassword = () => {
    const { id } = useParams();
    // const baseURL = `http://localhost:8800/api/user/${id}`;
    // const { data, loading, error } = useFetch(baseURL);
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [message, setMessage] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
    //const [match, setMatch] = useState(null);
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "oldPassword") {
            setOldPassword(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "rePassword") {
            setRePassword(value);
        }
    };
    const handleSubmit = async (event) => {
        const formData = new FormData();



        if (rePassword !== password) {
            setMessage("Please enter match the password");
        } else {

            await axios.put('http://localhost:8800/api/auth/changePassword', {
                'oldPassword': oldPassword,
                'newPassword': password,
                'rePassword': rePassword,
                'userName': getUser().userName
            }, { withCredentials: true })
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                alert(res.data);
                navigate(`/homePage`);
            }).catch((error)=>{
                alert(error.response.data);
                navigate(`/changePassword/${id}`);
            });
            event.preventDefault();
            
        }
    };
    const getUser = () => {
        var users = null;
        const token = Cookies.get("access_token");
        if (!token) {
            console.log("Not authenticated");
        }
        jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
            users = user;
        });
        return users;
    };
    return (
        <>
            {(() => {
                if (getUser().role === "BIDDER") {
                    return <HeaderUser userName={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />
            <div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.group3}>
                        <div className={styles.group2}>
                            <p className={styles.txtLogin}>Change Password</p>
                            <div className={'styles.pass-wrapper'}>
                            <input
                                id="oldPassword"
                                type={passwordShown ? "text" : "password"}
                                className={styles.textField}
                                placeholder="Enter Old Password"
                                value={oldPassword}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            <i onClick={togglePasswordVisibility}>{eye}</i>
                            </div>
                            <div className={'styles.pass-wrapper'}>
                            <input
                                id="password"
                                type={passwordShown ? "text" : "password"}
                                className={styles.textField}
                                placeholder="Enter New Password"
                                value={password}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            <i onClick={togglePasswordVisibility}>{eye}</i>
                            </div>
                            
                            <div className={'styles.pass-wrapper'}>
                            <input
                                id="rePassword"
                                type={passwordShown ? "text" : "password"}
                                className={styles.textField}
                                placeholder="Re-Enter New Password"
                                value={rePassword}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            <i onClick={togglePasswordVisibility}>{eye}</i>
                            </div>
                            <label style={{ color: 'red' }}>{message}</label>
                            <br />
                            <br />
                            <br />
                            {/* <input className={styles.btnSignIn} type="submit" value="Continue" /> */}
                            <Button className={styles.btnSignIn} onClick={handleSubmit}>
                                Continue
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
            <FooterCopy />
        </>
    );
};

export default ChangePassword;
