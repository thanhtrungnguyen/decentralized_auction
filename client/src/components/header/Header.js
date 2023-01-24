import styles from "../../styleCss/stylesComponents/header.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { LogoutButton } from "../buttons/LogoutButton";
const Header = () => {
    const [type, setType] = useState("CONTACT");
    const [id, setId] = useState();

    const navigate = useNavigate();

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
                    <LogoutButton />
                </div>
                <hr />
            </div>
        </>
    );
};

export default Header;
