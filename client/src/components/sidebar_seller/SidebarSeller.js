import styles from "../../styleCss/stylesComponents/sidebar_seller.module.css";
import { BiBookHeart, BiDizzy, BiDonateHeart, BiNews } from "react-icons/bi";

import { Outlet, Link } from "react-router-dom";

const SidebarSeller = () => {
    return (
        <>
            <div className={styles.container}>
                <img
                    className={styles.avt}
                    src="https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"
                />
                <p className={styles.txt2}>Seller</p>
                <p className={styles.txt2}>mark zuckerberg</p>
                <br />
                <br />
                <BiBookHeart className={styles.icon} />
                <Link to="/myProperty" className={styles.txt}>
                    My Properties
                </Link>
                <br />
                <br />
                <BiDizzy className={styles.icon} />
                <Link to="/addProperty" className={styles.txt}>
                    Add New Property
                </Link>
                <br />
                <br />
                <BiDonateHeart className={styles.icon} />
                <Link to="/myAuctions" className={styles.txt}>
                    Auction List
                </Link>
            </div>
        </>
    );
};

export default SidebarSeller;
