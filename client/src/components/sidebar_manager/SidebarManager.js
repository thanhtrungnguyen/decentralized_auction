import styles from "../../styleCss/stylesComponents/sidebar_seller.module.css";

import { Outlet, Link } from "react-router-dom";

const SidebarSeller = () => {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>Manager Auctions</p>
                <Link to="/autionsListForManager" className={styles.txt}>
                    Auction
                </Link>
                <br />
                <p className={styles.title}>Manager Categories</p>
                <Link to="/managerCategorys" className={styles.txt}>
                    Category
                </Link>{" "}
                <br />
                <Link to="/addCategory" className={styles.txt}>
                    Add New Category
                </Link>{" "}
            </div>
        </>
    );
};

export default SidebarSeller;
