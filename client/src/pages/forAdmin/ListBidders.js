import styles from "../../styleCss/stylesPages/forAdmin/listManager.module.css";

import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import BanedBidder from "../../components/popups/forAdmin/BanBidder";
import ActiveBidder from "../../components/popups/forAdmin/ActiveBidder";
import Loading from "../../components/loading/Loading";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { AiFillEye, AiTwotoneEdit } from "react-icons/ai";
import Time from "../../components/time/Time";
import { useNavigate } from "react-router-dom";

const ListBidders = () => {
    const [page, setPage] = React.useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [email2, setEmail2] = useState(null);
    const [status, setStatus] = useState(null);
    //const [filter,setFilter] = useState("");
    // const navigate = useNavigate();
    const baseURL = `http://localhost:5000/api/user/users/bidder/${page}/${status}/${email}`;
    const [role, setRole] = useState();

    //const { data, loading, error } = useFetchPagination(baseURL, page);
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
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
        setPage(1);
    };
    const handleSubmit = (event) => {
        email2 === "" ? setEmail(null) : setEmail(email2);
        setPage(1);
        event.preventDefault();
    };
    const navigate = useNavigate();

    const handleChange = (event, value) => {
        setPage(value);
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
        return <>
            {data.listUser.map((item) =>
                <tr>
                    <td>{item.firstName} {item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.user.status === true ? 'Activate' : 'Deactivate'}</td>
                    <td>

                    </td>
                    <td>
                        <AiFillEye className={styles.iconView} />
                        {item.user.status === true ?
                            <Popup trigger={
                                <label style={{ color: "red" }} className={styles.linkBlue}>
                                    Deactivate
                                </label>
                            }
                                position="right center">
                                <BanedBidder idManager="" />
                            </Popup> :
                            <Popup trigger={
                                <label style={{ color: "blue" }} className={styles.linkBlue}>
                                    Activate
                                </label>}
                                position="right center">
                                <ActiveBidder idManager="" />
                            </Popup>}
                    </td>
                </tr>
            )}
        </>
    }
    return loading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.container}>
                <SideBarAdmin />
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
                        </div>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Full Name</th>
                                <th className={styles.th}>Email</th>
                                <th className={styles.th}>Phone</th>
                                <th className={styles.th}>Address</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}></th>
                                <th className={styles.th}>Action</th>
                            </tr>
                            {exportData(data)}
                        </table>
                        <hr />
                        <div>
                            <Pagination
                                className={styles.Pagination}
                                hidden={data.count === 0 ? true : false}
                                count={Math.ceil(data.count / 8)}
                                page={page} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
            {/* {(() => {
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
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
                                // required
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
                                Activate{" "}
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
                            <p className={styles.txtBold}>Total Bidder: {data.totalUser}</p>

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
                                            {item.User_Id__r.Type__c === 'CONTACT' ?
                                                <Link className={styles.linkBlue} to={`/bidderDetail/${item.User_Id__c}`}>
                                                    View
                                                </Link> :
                                                <Link className={styles.linkBlue} to={`/bidderOrganizationDetail/${item.User_Id__c}`}>
                                                    View
                                                </Link>}
                                            {(() => {
                                                if (item.User_Id__r.Status__c === "Activate") {
                                                    return (
                                                        <Popup
                                                            trigger={
                                                                <label style={{ color: "red" }} className={styles.linkBlue}>
                                                                    Deactivate
                                                                </label>
                                                            }
                                                            position="right center"
                                                        >
                                                            <BanedBidder idBidder={item.User_Id__c} />
                                                        </Popup>
                                                    );
                                                } else {
                                                    return (
                                                        <Popup trigger={<label className={styles.linkBlue}>Activate</label>} position="right center">
                                                            <ActiveBidder idBidder={item.User_Id__c} />
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
export default ListBidders;
