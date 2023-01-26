import styles from "../../styleCss/login.module.css";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ConfirmCode = () => {
    const axios = useAxiosPrivate();
    const { email } = useParams();

    const navigate = useNavigate();

    const [code, setCode] = useState("");
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
        if (!code.trim()) {
            notify("🦄 code is empty");
        } else {
            navigate(`/newPassword/${email.trim()}`);
        }
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
