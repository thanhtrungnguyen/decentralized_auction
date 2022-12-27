import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";
import Popup from "reactjs-popup";
import ActiveCategory from "../../components/popups/forManager/ActiveCategory";
import PrivateCategory from "../../components/popups/forManager/PrivateCategory";

const ManagerCategorys = () => {
    const [page, setPage] = React.useState(1);
    const [categoryName, setCategory] = useState(null);
    const [categoryName2, setCategory2] = useState(null);
    const [status, setStatus] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const baseURL = `http://localhost:8800/api/category/getAll/${page}/${status}/${categoryName}`;
    const [role, setRole] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setData(resp.data);
            });

            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "categoryName") {
            setCategory2(value);
        }
    };
    const handleSubmit = (event) => {
        categoryName2 === "" ? setCategory(null) : setCategory(categoryName2);
        setPage(1);
        event.preventDefault();
    };
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
        setPage(1);
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
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}{" "}
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarSeller />
                    <div className={styles.content}>
                        <div className={styles.search}>
                            <div className={styles.floatLeft}>
                                <p className={styles.title}>Property Name</p>
                                <input
                                    id="categoryName"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Please input"
                                    value={categoryName2}
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
                            <input className={styles.btnReset} type="button" value="Reset" onClick={(e) => setCategory2("")}></input>
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <button
                                className={styles.bold}
                                value="null"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                All
                            </button>
                            <button
                                className={styles.bold}
                                value="Activate"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Activate
                            </button>
                            <button
                                className={styles.bold}
                                value="Deactivate"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Deactivate
                            </button>

                            <hr />
                            <p className={styles.txtBold}>Total Property: {data.totalCategory}</p>
                            <Link className={styles.btnAdd} to="/addCategory">
                                Add a New Category
                            </Link>
                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}> Name</th>
                                    <th className={styles.th}> Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {data.categories.map((item) => (
                                    <tr>
                                        <td className={styles.td}>{item.Name}</td>
                                        <td className={styles.td} style={item.Status__c === "Activate" ? {} : { color: "red" }}>
                                            {item.Status__c}
                                        </td>
                                        <td className={styles.td}>
                                            <Link className={styles.linkBlue} to={`/editCategory/${item.Id}`}>
                                                Edit
                                            </Link>

                                            {/* <Link className={styles.linkBlue} to={`/deleteCategory/${item.Id}`}>
                                                {item.Status__c === "Activate" ? "Activate" : "Deactivate"}
                                            </Link> */}
                                            {(() => {
                                                if (item.Status__c === "Activate") {
                                                    return (
                                                        <Popup
                                                            trigger={
                                                                <label style={{ color: "red" }} className={styles.linkBlue}>
                                                                    Deactivate
                                                                </label>
                                                            }
                                                            position="right center"
                                                        >
                                                            <PrivateCategory idCategory={item.Id} />
                                                        </Popup>
                                                    );
                                                } else {
                                                    return (
                                                        <Popup trigger={<label className={styles.linkBlue}>Activate</label>} position="right center">
                                                            <ActiveCategory idCategory={item.Id} />
                                                        </Popup>
                                                    );
                                                }
                                            })()}
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <div>
                                <Pagination
                                    className={styles.pagi}
                                    count={data.total % 10 > 0 ? Math.floor(data.total / 10) + 1 : data.total / 10}
                                    page={page}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default ManagerCategorys;
