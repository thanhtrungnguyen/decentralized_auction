import styles from "../../styleCss/stylesComponents/header.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { LogoutButton } from "../buttons/LogoutButton";
import useAuth from "../../hooks/useAuth";
import { useFetchData } from "../../hooks/useFetch";
const Header = () => {
    //const [type, setType] = useState("CONTACT");
    const [id, setId] = useState();

    const navigate = useNavigate();
    const { loading: loading2, data: data2, error } = useFetchData("/session");
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
                                </>
                            );
                        } else if (data2?.user.type === "organization") {
                            return (
                                <>
                                    <Link className={styles.link} to={`/profileOrganization/${data2?.user._id}`}>
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
                    <LogoutButton />
                </div>
                <hr />
            </div>
        </>
    );
};

export default Header;
