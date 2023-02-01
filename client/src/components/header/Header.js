import styles from "../../styleCss/stylesComponents/header.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LogoutButton } from "../buttons/LogoutButton";
import useAuth from "../../hooks/useAuth";
import { useFetchSession } from "../../hooks/useFetch";
const Header = () => {
    //const [type, setType] = useState("CONTACT");
    const [id, setId] = useState();

    const navigate = useNavigate();
    const { loading: loading2, data: data2, error } = useFetchSession("/session");
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    {(() => {
                        if (data2?.user.type === "individual") {
                            return (
                                <>
                                    <Link className={styles.link} to={`/profile/${data2?.user._id}`}>
                                        My Profile
                                    </Link>
                                    <BsFillPersonFill className={styles.icon} />
                                    <LogoutButton />
                                </>
                            );
                        } else if (data2?.user.type === "organization") {
                            return (
                                <>
                                    <Link className={styles.link} to={`/profileOrganization/${data2?.user._id}`}>
                                        My Profile
                                    </Link>
                                    <BsFillPersonFill className={styles.icon} />
                                    <LogoutButton />
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <Link className={styles.label3} to="/login">
                                        Login
                                    </Link>
                                    <Link className={styles.label2} to="/register">
                                        Register
                                    </Link>
                                </>
                            );
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
