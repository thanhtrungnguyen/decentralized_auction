import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
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

const ListForManagers = () => {
    const [page, setPage] = React.useState(1);

    const [email, setEmail] = useState(null);
    const [status, setStatus] = useState("Active");
    const [status2, setStatus2] = useState("Baned");
    const navigate = useNavigate();
    const baseURL = `http://localhost:8800/api/user/MANAGER/${page}`;

    const {data, loading, error } = useFetchPagination(baseURL, page)

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
        }
    };
    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append("email", email);

        axios
            .get("http://localhost:8800/api/auction", formData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                // setData(res.data);

                navigate("/autionsListForManager");
            });
        event.preventDefault();
    };
    const handleChange = (event, value) => {
        setPage(value);
    };

    return loading ? (
        <Loading/>
    ) : (
        <>
            <Header />
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
                                    value={email}
                                    onChange={(e) => handleInputChange(e)}
                                    required
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
                            <Link className={styles.bold} to="/listManagers">
                                All
                            </Link>
                            <Link className={styles.link} to="/">
                                Activite{" "}
                            </Link>
                            <Link className={styles.link} to="/">
                                Baned
                            </Link>

                            <hr />
                            <p className={styles.txtBold}>Total MANAGER: {data.total}</p>
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
                                {data.listUser.map((item) => (
                                    <tr>
                                        <td className={styles.td}>{item.User_DAP__r.Name}</td>
                                        <td className={styles.td}>{item.User_DAP__r.Status__c }</td>
                                        <td className={styles.td}>
                                            <Link className={styles.linkBlue} to={`/editManager/${item.User_DAP__r.id}`}>
                                                View
                                            </Link>
                                            {(() => {
                                                if (item.User_DAP__r.Status__c === "Activate") {
                                                    return (
                                                        <Popup trigger={<label className={styles.linkBlue}>Deactivate</label>} position="right center">
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
                            </table>
                            <div>
                                <Pagination className={styles.pagi} count={Math.floor(data.total/10)+1} page={page} onChange={handleChange} />
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
