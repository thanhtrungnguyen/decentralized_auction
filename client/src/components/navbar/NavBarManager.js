import styles from "../../styleCss/stylesComponents/navbar.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import img from "../../imgs/logo.png";

const NavBar = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <img className={styles.logo} src={img} />

                    <label className={styles.dap}>DAP</label>
                    <div className={styles.right}>
                        <Link className={styles.home} to="/autionsListForManager">
                            Manager Center
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
