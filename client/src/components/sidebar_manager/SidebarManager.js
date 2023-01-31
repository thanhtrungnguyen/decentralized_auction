import styles from "../../styleCss/stylesComponents/sidebar_seller.module.css";

import { Link, useNavigate } from "react-router-dom";
import { BiBookHeart, BiDizzy } from "react-icons/bi";

import { useFetchSession } from "../../hooks/useFetch";
const SidebarManager = () => {
    const navigate = useNavigate();
    const { loading: loading2, data: data2, error } = useFetchSession("/session");
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
                        navigate(`/profileManager/${data2?.user._id}`);
                    }}
                >
                    {data2?.user.username}
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
