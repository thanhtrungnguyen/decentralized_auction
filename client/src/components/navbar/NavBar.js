import styles from "../../styleCss/stylesComponents/navbar.module.css";
import { Outlet, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import img from "../../imgs/logo.png";
const NavBar = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <img className={styles.logo} src={img} />
                    <label className={styles.dap}>DAP</label>

                    <div className={styles.right}>
                        <Link className={styles.home} to="/homePage">
                            HOME
                        </Link>

                        <Link className={styles.link} to="/auctionList">
                            AUCTIONS
                        </Link>
                        <Link className={styles.link} to="/news">
                            NEWS
                        </Link>
                        <Link className={styles.link} to="/aboutUs">
                            ABOUT US
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
