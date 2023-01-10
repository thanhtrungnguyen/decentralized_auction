import styles from "../../styleCss/stylesComponents/sidebar_seller.module.css";

import { Outlet, Link } from "react-router-dom";
import { BiBookHeart, BiDizzy, BiDonateHeart, BiNews } from "react-icons/bi";

const SidebarManager = () => {
    return (
        <>
            <div className={styles.container}>
                <img
                    className={styles.avt}
                    src="https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"
                />
                <p className={styles.txt2}>Manager</p>
                <p className={styles.txt2}>mark zuckerberg</p>
                <br />
                <br />
                <BiBookHeart className={styles.icon} />
                <Link to="/autionsListForManager" className={styles.txt}>
                    Manage Auction
                </Link>
                <br />
                <br />
                <BiDizzy className={styles.icon} />
                <Link to="/managerCategorys" className={styles.txt}>
                    Manage Category
                </Link>
            </div>
        </>
    );
};

export default SidebarManager;
