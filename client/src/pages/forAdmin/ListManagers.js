import styles from "../../styleCss/stylesPages/forAdmin/listManager.module.css";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import BanedManager from "../../components/popups/forAdmin/BanManager";
import ActiveManager from "../../components/popups/forAdmin/ActiveManager";
import Loading from "../../components/loading/Loading";
import { useFetchData, useFetchPagination } from "../../hooks/useFetch";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { AiFillEye, AiTwotoneEdit } from "react-icons/ai";
import FooterCopy from "../../components/footer/FooterCopy";
import Time from "../../components/time/Time";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const ListForManagers = () => {
    const axios = useAxiosPrivate();
    const [page, setPage] = React.useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [email2, setEmail2] = useState("");
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const [role, setRole] = useState();
    const baseURL = `/user/users/manager/${page}/${status}/${email}`;
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
        if (email2.trim() === "") {
            //alert("Please enter email")
            setEmail2("");
            setEmail(null);
        } else setEmail(email2.trim());
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
                        <td>
                            <AiFillEye
                                className={styles.iconView}
                                onClick={() => {
                                    navigate(`/viewManager/${item._id}`);
                                }}
                            />
                            <AiTwotoneEdit
                                className={styles.iconView}
                                onClick={() => {
                                    navigate(`/editManager/${item._id}`);
                                }}
                            />
                            {item.user.status === true ? (
                                <Popup
                                    className={styles.fl}
                                    trigger={
                                        <label style={{ color: "red" }} className={styles.linkBlue}>
                                            Deactivate
                                        </label>
                                    }
                                    position="right center"
                                >
                                    <BanedManager idManager={item.user._id} />
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
                                    <ActiveManager idManager={item.user._id} />
                                </Popup>
                            )}
                        </td>
                    </tr>
                ))}
            </>
        );
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
            {/* {(() => {
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar /> */}
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
                            <button
                                className={styles.btn2}
                                onClick={() => {
                                    navigate("/addManager");
                                }}
                            >
                                + New Manager
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
            {/* <FooterCopy /> */}

            {/* <form onSubmit={handleSubmit}>
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
export default ListForManagers;
