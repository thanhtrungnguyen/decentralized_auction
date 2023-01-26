import styles from "../../styleCss/stylesComponents/header.module.css";
import { BiMessageDetail, BiBell } from "react-icons/bi";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { BsFillPersonFill } from "react-icons/bs";

const Header = ({ username }) => {
    const navigate = useNavigate();

    const [type, setType] = useState("");
    const [id, setId] = useState();
    useEffect(() => { }, []);
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

                    {/* <select id="language" className={styles.select}>
                        <option value="english">EN</option>
                        <option value="vietnamese">VN</option>
                    </select> */}
                </div>
                <hr />
            </div>
        </>
    );
};

export default Header;
