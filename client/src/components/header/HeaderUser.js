import styles from "../../styleCss/stylesComponents/header.module.css";
import { BiMessageDetail, BiBell } from "react-icons/bi";
import { Outlet, Link } from "react-router-dom";

const Header = ({ username }) => {
    return (
        <>
            <div className={styles.header}>
                <select id="language" className={styles.select}>
                    <option value="english">English</option>
                    <option value="vietnamese">Tiếng Việt</option>
                </select>
                <label className={styles.txt}>{username}</label>
                <Link className={styles.link} to="/login">
                    Log out
                </Link>
                <BiMessageDetail className={styles.icon} />
                <BiBell className={styles.icon2} />
            </div>
        </>
    );
};

export default Header;
