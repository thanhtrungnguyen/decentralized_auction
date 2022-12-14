import styles from "../../styleCss/stylesComponents/navbar.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
const NavBar = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <label className={styles.dap}>DAP</label>
                    <Link className={styles.home} to="/listManagers">
                        Admin Center
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBar;
