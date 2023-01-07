import styles from "../../styleCss/stylesComponents/forAdmin/sidebar_admin.module.css";

import { Outlet, Link } from "react-router-dom";
import { BiBookHeart, BiDizzy, BiDonateHeart, BiNews } from "react-icons/bi";
const SidebarAdmin = () => {
    return (
        <>
            <div className={styles.container}>
                <img
                    className={styles.avt}
                    src="https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"
                />
                <p className={styles.txt2}>Admin</p>
                <p className={styles.txt2}>mark zuckerberg</p>
                <br />
                <br />
                <BiBookHeart className={styles.icon} />
                <Link to="/listManagers" className={styles.txt}>
                    Manage Managers
                </Link>
                <br />
                <br />
                <BiDizzy className={styles.icon} />
                <Link to="/listSellers" className={styles.txt}>
                    Manage Sellers
                </Link>
                <br />
                <br />
                <BiDonateHeart className={styles.icon} />
                <Link to="/listBidders" className={styles.txt}>
                    Manage Bidders
                </Link>
                <br />
                <br />
                <BiNews className={styles.icon} />
                <Link to="/listNews" className={styles.txt}>
                    Manage News
                </Link>{" "}
                <br />
            </div>
        </>
    );
};

export default SidebarAdmin;
