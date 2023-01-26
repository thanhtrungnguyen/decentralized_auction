import styles from "../../styleCss/stylesComponents/sidebar_seller.module.css";

import { Outlet, Link, useNavigate } from "react-router-dom";
import { BiBookHeart, BiDizzy, BiDonateHeart, BiNews } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
const SidebarManager = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    return (
        <>
            <div className={styles.container}>
                <img
                    className={styles.avt}
                    src="https://img.freepik.com/free-icon/user_318-875902.jpg"
                    alt="img"
                />
                <p className={styles.txt2}>Manager</p>
                <p
                    className={styles.txt2}
                    onClick={() => {
                        navigate(`/profileManager/${auth.user._id}`);
                    }}
                >
                    {auth.user.username}
                </p>
                <br />
                <br />
                <BiBookHeart className={styles.icon} />
                <Link to="/auctionListForManager" className={styles.txt}>
                    Manage Auction
                </Link>
                <br />
                <br />
                <BiDizzy className={styles.icon} />
                <Link to="/managerCategories" className={styles.txt}>
                    Manage Category
                </Link>
            </div>
        </>
    );
};

export default SidebarManager;
