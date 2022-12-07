import styles from "../../styleCss/stylesComponents/sidebar_seller.module.css";

import { Outlet, Link } from "react-router-dom";

const SidebarAdmin = () => {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>Manager User</p>
                <Link to="/listManagers" className={styles.txt}>
                    Managers
                </Link>
                <br />
                <br />
                <Link to="/listSellers" className={styles.txt}>
                    Sellers
                </Link>
                <br />
                <br />
                <Link to="/listBidders" className={styles.txt}>
                    Bidders
                </Link>
                <br />
                <br />
                <p className={styles.title}>Manager News</p>
                <Link to="/listNews/1" className={styles.txt}>
                    News
                </Link>{" "}
                <br />
                <p className={styles.title}>Data</p>
                <Link to="/dashboard" className={styles.txt}>
                    Dashboard
                </Link>{" "}
                <br />
            </div>
        </>
    );
};

export default SidebarAdmin;
