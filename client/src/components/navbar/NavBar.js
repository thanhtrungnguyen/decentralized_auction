import styles from "../../styleCss/stylesComponents/navbar.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

const NavBar = () => {
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
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <label className={styles.dap}>DAP</label>
                    <Link className={styles.home} to="/">
                        Home
                    </Link>

                    <Link className={styles.link} to="/auctionList">
                        Auctions
                    </Link>
                    <Link className={styles.link} to="/news">
                        News
                    </Link>
                    <Link className={styles.link} to="/aboutUs">
                        About us
                    </Link>

                    {/* <Link className={styles.link} to="/fakeAuctionDetail">
                        FakeAuctionDetail
                    </Link> */}

                    {(() => {
                        if (type === "CONTACT") {
                            return (
                                <Link className={styles.link} to={`/profile/${id}`}>
                                    Profile
                                </Link>
                            );
                        } else if (type === "ACCOUNT") {
                            return (
                                <Link className={styles.link} to={`/profileOrganization/${id}`}>
                                    Profile
                                </Link>
                            );
                        } else {
                            return <></>;
                        }
                    })()}

                    <div className={styles.flright}>
                        <input className={styles.ip} type="text"></input>
                        <BsSearch className={styles.icon} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
