import styles from "../../styleCss/stylesComponents/header.module.css"
import { BiMessageDetail, BiBell } from "react-icons/bi"
import { Outlet, Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <select id="language" className={styles.select}>
                    <option value="english">English</option>
                    <option value="vietnamese">Tiếng Việt</option>
                </select>
                <label className={styles.txt}>Username</label>
                <BiMessageDetail className={styles.icon} />
                <BiBell className={styles.icon2} />
            </div>
        </>
    )
}

export default Header
