import styles from "../../styleCss/stylesPages/forAdmin/addManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SidebarManager from "../../components/sidebar_manager/SidebarManager";
// import { Outlet, Link } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";

import Loading from "../../components/loading/Loading";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Time from "../../components/time/Time";

const ProfileManager = () => {
    const { managerId } = useParams();

    const baseURL = `/informationOperator/getByUserId/${managerId}`;
    const navigate = useNavigate();
    const { data, loading } = useFetch(baseURL);

    const cancel = () => {
        navigate("/auctionListForManager");
    };

    const [role, setRole] = useState();

    return loading ? (
        <Loading />
    ) : (
        <>
            <form>
                <div className={styles.container}>
                    <SidebarManager />
                    <Time />
                    <div className={styles.content}>
                        <div className={styles.add}>
                            <br />
                            <br />
                            <label className={styles.title}>Manager Account Information</label>
                            <br />
                            <br />

                            <p className={styles.if}>Basic Information</p>
                            <br />

                            <p className={styles.txt}>First Name: </p>
                            <p className={styles.txt}>{data.result.firstName}</p>
                            <p className={styles.txt}>Last Name:</p>
                            <p className={styles.txt}>{data.result.lastName}</p>
                            <p className={styles.txt}>Gender:</p>
                            <p className={styles.txt}>{data.result.gender}</p>

                            <p className={styles.txt}>Email:</p>
                            <p className={styles.txt}>{data.result.email}</p>
                            <p className={styles.txt}>Phone:</p>
                            <p className={styles.txt}>{data.result.phone}</p>
                            <p className={styles.txt}>Address:</p>
                            <p className={styles.txt}>{data.result.address}</p>
                            <br />

                            <br />

                            {/* <p className={styles.if}>Account Information</p>
                            <br />

                            <p className={styles.txt}>Username:</p>
                            <p className={styles.txt}>abcxyz</p> */}
                            {/* <p className={styles.txt}>Password:</p>
                            <p className={styles.txt}>**********</p> */}

                            <br />
                            <br />
                            <br />
                            <br />
                            <input
                                type="button"
                                value="Change Password"
                                className={styles.btnChange}
                                onClick={() => {
                                    navigate("/changePasswordManager");
                                }}
                            ></input>

                            <input type="button" value="Back" className={styles.btnCancel} onClick={cancel}></input>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default ProfileManager;
