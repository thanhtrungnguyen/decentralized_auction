import styles from "../../styleCss/stylesComponents/header.module.css"
import { Outlet, Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <select id="language" className={styles.select}>
                    <option value="english">English</option>
                    <option value="vietnamese">Tiếng Việt</option>
                </select>
                <Link className={styles.link} to="/login">
                    Login
                </Link>
                <Link className={styles.link} to="/register">
                    Register
                </Link>
            </div>
        </>
    )
}

export default Header
