import styles from "../../styleCss/login.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

const ResetPasswordDone = () => {
    return (
        <>
            <Header />
            <NavBar />
            <div>
                <div className={styles.group3}>
                    <div className={styles.resetDone}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <p className={styles.txtLogin}>Your password has changed!</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResetPasswordDone;
