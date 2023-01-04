import styles from "../../styleCss/stylesComponents/header.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
const Header = () => {
    const getUser = () => {
        var users = null;
        const token = Cookies.get("access_token");
        if (!token) {
            console.log("Not authenticated");
        }
        jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
            users = user;
        });
        return users;
    };
    const [type, setType] = useState("");
    const [id, setId] = useState();
    useEffect(() => {
        if (getUser() != null) {
            setType(getUser().type);
            setId(getUser().id);
        } else {
            setType("");
        }
    }, []);
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    {(() => {
                        if (type === "CONTACT") {
                            return (
                                <>
                                    <Link className={styles.link} to={`/profile/${id}`}>
                                        My Profile
                                    </Link>
                                    <BsFillPersonFill className={styles.icon} />
                                </>
                            );
                        } else if (type === "ACCOUNT") {
                            return (
                                <>
                                    <Link className={styles.link} to={`/profileOrganization/${id}`}>
                                        My Profile
                                    </Link>
                                    <BsFillPersonFill className={styles.icon} />
                                </>
                            );
                        } else {
                            return <></>;
                        }
                    })()}

                    <select id="language" className={styles.select}>
                        <option value="english">EN</option>
                        <option value="vietnamese">VN</option>
                    </select>
                </div>
                <hr />
            </div>
        </>
    );
};

export default Header;
