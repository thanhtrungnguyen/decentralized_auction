import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SidebarManager from "../../components/sidebar_manager/SidebarManager";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
// import { BsFillCheckSquareFill } from "react-icons/bs";
import { AiFillEye, AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";
import Popup from "reactjs-popup";
import ActiveCategory from "../../components/popups/forManager/ActiveCategory";
import PrivateCategory from "../../components/popups/forManager/PrivateCategory";
import Time from "../../components/time/Time";
const ManagerCategory = () => {
    const [page, setPage] = React.useState(1);
    const [categoryName, setCategory] = useState(null);
    const [categoryName2, setCategory2] = useState(null);
    const [status, setStatus] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();
    var baseURL = `/category/categories/${page}/${status}/${categoryName}`;
    const [role, setRole] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                // console.log(resp.data);
                // console.log("axios get");
                setData(resp.data.categories);
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
    const navigate = useNavigate();

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
    function exportData(data) {
        return (
            <>
                {data.listCategory.map((item) => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.status === true ? "Activate" : "Deactivate"}</td>

                        <td>
                            <AiTwotoneEdit
                                className={styles.iconView}
                                onClick={() => {
                                    navigate(`/editCategory/${item._id}`);
                                }}
                            />
                            {/* <Popup trigger={<label><AiOutlineDelete className={styles.iconView} /></label>} position="right center">
                            <DeleteProperty idProperty=""/>
                        </Popup> */}
                            {item.status === true ? (
                                <Popup
                                    trigger={
                                        <label style={{ color: "red" }} className={styles.link}>
                                            {" "}
                                            Deactivate{" "}
                                        </label>
                                    }
                                    position="right center"
                                >
                                    <PrivateCategory idCategory={item._id} />
                                </Popup>
                            ) : (
                                <Popup
                                    trigger={
                                        <label style={{ color: "blue" }} className={styles.link}>
                                            Activate
                                        </label>
                                    }
                                    position="right center"
                                >
                                    <ActiveCategory idCategory={item._id} />
                                </Popup>
                            )}
                        </td>
                    </tr>
                ))}
            </>
        );
    }
    return loading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.container}>
                <SidebarManager />
                <Time />
                <div className={styles.r}>
                    <div className={styles.con}>
                        <div className={styles.btns}>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="null">
                                All
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="true">
                                Activate
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="false">
                                Deactivate
                            </button>
                            <form onSubmit={handleSubmit}>
                                <input
                                    className={styles.ip3}
                                    type="text"
                                    placeholder="Enter Name"
                                    id="categoryName"
                                    value={categoryName2}
                                    onChange={(e) => handleInputChange(e)}
                                ></input>
                                <button className={styles.btn} type="submit">
                                    Search
                                </button>
                            </form>
                            <button
                                className={styles.btn2}
                                onClick={() => {
                                    navigate("/addCategory");
                                }}
                            >
                                + New Category
                            </button>
                        </div>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Category Name</th>

                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Action</th>
                            </tr>
                            {exportData(data)}
                        </table>
                        <hr />
                        <div>
                            <Pagination className={styles.Pagination} count={Math.ceil(data.count / 8)} page={page} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={styles.container}>
                    <SidebarManager />
                    <Time />
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
                </div> */}
        </>
    );
};
export default ManagerCategory;
