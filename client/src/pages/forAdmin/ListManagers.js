import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import BanedManager from "../../components/popups/forAdmin/BanManager";
import ActiveManager from "../../components/popups/forAdmin/ActiveManager";
import Loading from "../../components/loading/Loading";
import { useFetchPagination } from "../../hook/useFetch";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const ListForManagers = () => {
    const [page, setPage] = React.useState(1);

    const [email, setEmail] = useState(null);
    const [email2, setEmail2] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const baseURL = `http://localhost:8800/api/user/getAll/MANAGER/${page}/${status}/${email}`;

    const { data, loading, error } = useFetchPagination(baseURL, page);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail2(value);
        }
    };
    const handleSubmit = (event) => {
        // const formData = new FormData();

        // formData.append("email", email);

        // axios
        //     .get("http://localhost:8800/api/auction", formData, {
        //         withCredentials: true,
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         console.log(res.data);
        //         alert(res.data.message);
        //         // setData(res.data);

        //         navigate("/autionsListForManager");
        //     });
        email2 == '' ? setEmail(null):setEmail(email2);
        setPage(1);
        event.preventDefault();
    };
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleChangeStatus = (e)=>{
        setStatus(e.target.value)
        setPage(1);
    }
    function exportData(data){
        return <>
        {data.listUser.map((item) => (
                                    <tr>
                                        <td className={styles.td}>{item.User_DAP__r.Name}</td>
                                        <td className={styles.td}>{item.User_DAP__r.Status__c}</td>
                                        <td className={styles.td}>
                                            <Link className={styles.linkBlue} to={`/viewManager/${item.User_DAP__r.Id}`}>
                                                View
                                            </Link>
                                            {(() => {
                                                if (item.User_DAP__r.Status__c === "Activate") {
                                                    return (
                                                        <Popup
                                                            trigger={<label className={styles.linkBlue}>Deactivate</label>}
                                                            position="right center"
                                                        >
                                                            <BanedManager idBidder={item.User_DAP__r.Id} />
                                                        </Popup>
                                                    );
                                                } else {
                                                    return (
                                                        <Popup trigger={<label className={styles.linkBlue}>Activate</label>} position="right center">
                                                            <ActiveManager idBidder={item.User_DAP__r.Id} />
                                                        </Popup>
                                                    );
                                                }
                                            })()}
                                        </td>
                                    </tr>
                                ))}
        
        </>
    }
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
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <div className={styles.content}>
                        <div className={styles.search}>
                            <div className={styles.floatLeft}>
                                <p className={styles.title}>Search</p>
                                <input
                                    id="email"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Email"
                                    value={email2}
                                    onChange={(e) => handleInputChange(e)}
                                    //required
                                ></input>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <input className={styles.btn} type="submit" value="Search"></input>
                            <input className={styles.btnReset} type="button" value="Reset"></input>
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <button className={styles.bold} value='null' onClick={(e)=>{handleChangeStatus(e)}}>
                                All
                            </button>
                            <button className={styles.link} value='Activate' onClick={(e)=>{handleChangeStatus(e)}}>
                                Activate
                            </button>
                            <button className={styles.link} value='Deactivate' onClick={(e)=>{handleChangeStatus(e)}}>
                                Deactivate
                            </button>

                            <hr />
                            <p className={styles.txtBold}>Total MANAGER: {data.totalUser}</p>
                            <Link className={styles.btnAdd} to="/addManager">
                                Add a New Manager
                            </Link>
                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>User Name</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {exportData(data)}
                            </table>
                            <div>
                                <Pagination className={styles.pagi} count={Math.floor(data.total / 10) + 1} page={page} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default ListForManagers;
