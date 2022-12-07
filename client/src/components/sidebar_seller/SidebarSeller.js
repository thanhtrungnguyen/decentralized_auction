import styles from "../../styleCss/stylesComponents/sidebar_seller.module.css";

import { Outlet, Link } from "react-router-dom";

const SidebarSeller = () => {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>Property</p>
                <Link to="/myProperty" className={styles.txt}>
                    My Properties
                </Link>
                <br />
                <Link to="/addProperty" className={styles.txt}>
                    Add New Property
                </Link>{" "}
                <br />
                <p className={styles.title}>Auction</p>
                <Link to="/myAuctions" className={styles.txt}>
                    Auction List
                </Link>{" "}
                <br />
                <Link to="/" className={styles.txt}>
                    Add New Auction
                </Link>{" "}
                <br />
                <p className={styles.title}>Finance</p>
                <Link to="/" className={styles.txt}>
                    My Income
                </Link>{" "}
                <br />
                <Link to="/" className={styles.txt}>
                    My Balance
                </Link>{" "}
                <br />
                <Link to="/" className={styles.txt}>
                    Payment Setting
                </Link>{" "}
                <br />
                <p className={styles.title}>Data</p>
                <Link to="/" className={styles.txt}>
                    Business Insights
                </Link>{" "}
                <br />
                <Link to="/" className={styles.txt}>
                    Account Health
                </Link>{" "}
                <br />
                <p className={styles.title}>Help</p>
            </div>
        </>
    );
};

export default SidebarSeller;
