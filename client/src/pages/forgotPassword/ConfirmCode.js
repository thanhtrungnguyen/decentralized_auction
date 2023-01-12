import styles from "../../styleCss/login.module.css";
import { useState } from "react";
// import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";

const ConfirmCode = () => {
    const { email } = useParams();

    const navigate = useNavigate();

    const [code, setCode] = useState("");

    const handleSubmit = async (event) => {
        navigate(`/newPassword/${email}`);

        event.preventDefault();
        // axios
        //   .post(
        //     "/auth/login",
        //     { code },
        //     { withCredentials: true }
        //   )
        //   .then((res) => {
        //     console.log(res);
        //     console.log(res.data);
        //     // alert(res.data.message);
        //     navigate(`/newPassword/${email}`);
        //   });
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
                                type="text"
                                className={styles.textField}
                                placeholder="Enter code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
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

export default ConfirmCode;
