import styles from "../../styleCss/stylesPages/forAdmin/listManager.module.css";

import SidebarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";

import Popup from "reactjs-popup";
import BanedSeller from "../../components/popups/forAdmin/BanSeller";
import ActiveSeller from "../../components/popups/forAdmin/ActiveSeller";
import { useFetchPagination } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { AiFillEye, AiTwotoneEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import Time from "../../components/time/Time";
import axios from "../../config/axiosConfig";
const ListSellers = () => {
    const [page, setPage] = React.useState(1);
    const [role, setRole] = useState();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [email2, setEmail2] = useState(null);
    const [status, setStatus] = useState(null);
    // const navigate = useNavigate();
    const baseURL = `/user/users/seller/${page}/${status}/${email}`;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                // console.log("axios get");
                setData(resp.data.user);
                console.log(resp);
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
        if (id === "email") {
            setEmail2(value);
        }
    };
    const handleSubmit = (event) => {
        email2 === "" ? setEmail(null) : setEmail(email2);
        setPage(1);
        event.preventDefault();
    };
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
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
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
    }, []);
    const navigate = useNavigate();
    function exportData(data) {
        return (
            <>
                {data.listUser.map((item) => (
                    <tr>
                        <td>
                            {item.firstName} {item.lastName}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.user.status === true ? "Activate" : "Deactivate"}</td>
                        <td></td>
                        <td>
                            <AiFillEye className={styles.iconView} onClick={() => {
                                navigate(`/viewSeller/${item._id}`);
                            }} />
                            {item.user.status === true ? (
                                <Popup
                                    trigger={
                                        <label style={{ color: "red" }} className={styles.linkBlue}>
                                            Deactivate
                                        </label>
                                    }
                                    position="right center"
                                >
                                    <BanedSeller idSeller={item.user._id} />
                                </Popup>
                            ) : (
                                <Popup
                                    trigger={
                                        <label style={{ color: "blue" }} className={styles.linkBlue}>
                                            Activate
                                        </label>
                                    }
                                    position="right center"
                                >
                                    <ActiveSeller idSeller={item.user._id} />
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
                <SidebarAdmin />
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
                                    className={styles.ip}
                                    type="text"
                                    placeholder="Enter Email"
                                    id="email"
                                    value={email2}
                                    onChange={(e) => handleInputChange(e)}
                                ></input>
                                <button className={styles.btn} type="submit">
                                    Search
                                </button>
                            </form>
                            <button
                                className={styles.btn2}
                                onClick={() => {
                                    navigate("/addSeller");
                                }}
                            >
                                + New Seller
                            </button>
                        </div>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Full Name</th>
                                <th className={styles.th}>Email</th>
                                <th className={styles.th}>Phone</th>
                                <th className={styles.th}>Address</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Action</th>
                                <th className={styles.th}></th>
                            </tr>
                            {exportData(data)}
                        </table>
                        <hr />
                        <div>
                            <Pagination
                                className={styles.Pagination}
                                hidden={data.count === 0 ? true : false}
                                count={Math.ceil(data.count / 8)}
                                page={page}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SidebarAdmin />
                    <Time />
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
                                className={styles.link}
                                value="Activate"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Activate
                            </button>
                            <button
                                className={styles.link}
                                value="Deactivate"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Deactivate
                            </button>

                            <hr />
                            <p className={styles.txtBold}>Total SELLER: {data.totalUser}</p>
                            <Link className={styles.btnAdd} to="/addSeller">
                                Add a New Seller
                            </Link>
                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Full Name</th>
                                    <th className={styles.th}>Email</th>
                                    <th className={styles.th}>Phone</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {data.listUser.map((item) => (
                                    <tr>
                                        <td className={styles.td}>{item.Name}</td>
                                        <td className={styles.td}>{item.Email__c}</td>
                                        <td className={styles.td}>{item.Phone__c}</td>
                                        <td className={styles.td} style={item.User_Id__r.Status__c === "Activate" ? {} : { color: "red" }}>
                                            {item.User_Id__r.Status__c}
                                        </td>
                                        <td className={styles.td}>
                                            <Link className={styles.linkBlue} to={`/viewSeller/${item.User_Id__c}`}>
                                                View
                                            </Link>
                                            {(() => {
                                                if (item.User_Id__r.Status__c === "Activate") {
                                                    return (
                                                        <Popup
                                                            trigger={
                                                                <label className={styles.linkBlue} style={{ color: "red" }}>
                                                                    Deactivate
                                                                </label>
                                                            }
                                                            position="right center"
                                                        >
                                                            <BanedSeller idSeller={item.User_Id__c} />
                                                        </Popup>
                                                    );
                                                } else {
                                                    return (
                                                        <Popup trigger={<label className={styles.linkBlue}>Activate</label>} position="right center">
                                                            <ActiveSeller idSeller={item.User_Id__c} />
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
            </form> */}
        </>
    );
};
export default ListSellers;
