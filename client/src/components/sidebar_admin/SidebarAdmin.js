import styles from "../../styleCss/stylesComponents/forAdmin/sidebar_admin.module.css";

import { Link, useNavigate } from "react-router-dom";
import { BiBookHeart, BiDizzy, BiDonateHeart, BiNews } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import { useFetchData } from "../../hooks/useFetch";
import Loading from "../loading/Loading";
const SidebarAdmin = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    console.log(auth);
    // const [loading, data, error] = useFetchData('/session')
    const { loading: loading2, data: data2, error } = useFetchData("/session");
    return (
        <>
            <div className={styles.container}>
                <img className={styles.avt} src="https://img.freepik.com/free-icon/user_318-875902.jpg" alt="img" />
                <p className={styles.txt2}>Admin</p>
                <p
                    className={styles.txt2}
                    onClick={() => {
                        navigate(`/profileAdmin/${data2?.user._id}`);
                    }}
                >
                    {data2?.user.username}
                </p>
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
