import styles from "../../styleCss/stylesPages/forAdmin/addManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";
import { useFetch } from "../../hook/useFetch";
import { useParams } from "react-router-dom";

const ViewSeller = () => {
    const { id } = useParams();

    const baseURL = `http://localhost:8800/api/admin/sellerdetail/${id}`;

    const navigate = useNavigate();
    const { data, loading, error } = useFetch(baseURL);

    const cancel = () => {
        navigate("/listSellers");
    };
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
    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (getUser().role == "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />
            <form>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <div className={styles.content}>
                        <div className={styles.add}>
                            <label className={styles.title}>Seller Account Information</label>
                            <br />
                            <label className={styles.txt}>Username</label>
                            <input id="username" type="text" className={styles.input} value={data.username} readOnly></input>
                            <label></label>
                            <br />
                            <br />
                            <br />
                            <label className={styles.txt}>Password</label>
                            <input id="password" type="text" className={styles.input} value={data.password} readOnly></input>
                            <br />
                            <br />
                            <input type="button" value="Return" className={styles.btnCancel} onClick={cancel}></input>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default ViewSeller;
