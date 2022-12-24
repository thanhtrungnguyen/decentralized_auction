import styles from "../../styleCss/stylesComponents/header.module.css";
import { BiMessageDetail, BiBell } from "react-icons/bi";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ username }) => {
    const navigate = useNavigate();

    const Logout = () => {
        eraseCookie("access_token");
        navigate("/login");
    };
    function eraseCookie(name) {
        document.cookie = name + "=; Max-Age=-99999999;";
    }
    return (
        <>
            <div className={styles.header}>
                <select id="language" className={styles.select}>
                    <option value="english">English</option>
                    <option value="vietnamese">Tiếng Việt</option>
                </select>
                <label className={styles.txt}>{username}</label>
                {/* <Link className={styles.link} to="/login">
                    Log out
                </Link> */}
                <label className={styles.link} onClick={Logout}>
                    Log Out
                </label>
                <BiMessageDetail className={styles.icon} />
                <BiBell className={styles.icon2} />
            </div>
        </>
    );
};

export default Header;
