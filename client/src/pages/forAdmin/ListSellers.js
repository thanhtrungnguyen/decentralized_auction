import styles from "../../styleCss/stylesPages/forAdmin/listManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SidebarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
// import { BsFillCheckSquareFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Popup from "reactjs-popup";
import BanedSeller from "../../components/popups/forAdmin/BanSeller";
import ActiveSeller from "../../components/popups/forAdmin/ActiveSeller";
import { useFetchPagination } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { AiFillEye, AiTwotoneEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import Time from "../../components/time/Time";
const ListSellers = () => {
    const [page, setPage] = React.useState(1);
    const [role, setRole] = useState();

    const [email, setEmail] = useState(null);
    const [email2, setEmail2] = useState(null);
    const [status, setStatus] = useState(null);
    // const navigate = useNavigate();
    const baseURL = `http://localhost:8800/api/user/getAll/SELLER/${page}/${status}/${email}`;

    const { data, loading } = useFetchPagination(baseURL, page);

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
        //     .get("http://localhost:8800/api/seller", formData, {
        //         withCredentials: true,
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         console.log(res.data);
        //         alert(res.data.message);
        //         //setData(res.data);

        //         navigate("/listSellers");
        //     });
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
                            <button className={styles.btn}>All</button>
                            <button className={styles.btn}>Activate</button>
                            <button className={styles.btn}>Deactivate</button>
                            <input className={styles.ip} type="text" placeholder="Enter Name"></input>
                            <button className={styles.btn}>Search</button>
                            <button
                                className={styles.btn}
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
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>abc@gmail.com</td>
                                <td>09000999000</td>
                                <td>Thach That, Ha Noi, Viet Nam</td>
                                <td>Activate</td>
                                <td>
                                    <Popup
                                        trigger={
                                            <label style={{ color: "red" }} className={styles.linkBlue}>
                                                Deactivate
                                            </label>
                                        }
                                        position="right center"
                                    >
                                        <BanedSeller idManager="" />
                                    </Popup>
                                </td>
                                <td>
                                    {/* <AiTwotoneEdit
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate("/viewSeller");
                                        }}
                                    /> */}
                                    <AiFillEye
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate("/viewSeller");
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>abc@gmail.com</td>
                                <td>09000999000</td>
                                <td>Thach That, Ha Noi, Viet Nam</td>
                                <td>Deactivate</td>
                                <td>
                                    {" "}
                                    <Popup trigger={<label className={styles.linkBlue}>Activate</label>} position="right center">
                                        <ActiveSeller idManager="" />
                                    </Popup>
                                </td>
                                <td>
                                    <AiTwotoneEdit className={styles.iconView} />
                                    <AiFillEye className={styles.iconView} />
                                </td>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>abc@gmail.com</td>
                                <td>09000999000</td>
                                <td>Thach That, Ha Noi, Viet Nam</td>
                                <td>Activate</td>
                                <td>Deactivate</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>abc@gmail.com</td>
                                <td>09000999000</td>
                                <td>Thach That, Ha Noi, Viet Nam</td>
                                <td>Activate</td>
                                <td>Deactivate</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>abc@gmail.com</td>
                                <td>09000999000</td>
                                <td>Thach That, Ha Noi, Viet Nam</td>
                                <td>Activate</td>
                                <td>Deactivate</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>abc@gmail.com</td>
                                <td>09000999000</td>
                                <td>Thach That, Ha Noi, Viet Nam</td>
                                <td>Activate</td>
                                <td>Deactivate</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>abc@gmail.com</td>
                                <td>09000999000</td>
                                <td>Thach That, Ha Noi, Viet Nam</td>
                                <td>Activate</td>
                                <td>Deactivate</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Classic Bathrobe</td>
                                <td>abc@gmail.com</td>
                                <td>09000999000</td>
                                <td>Thach That, Ha Noi, Viet Nam</td>
                                <td>Activate</td>
                                <td>Deactivate</td>
                                <td></td>
                            </tr>
                        </table>
                        <hr />
                        <div>
                            <Pagination
                                className={styles.Pagination}
                                // count={data.total % 10 > 0 ? Math.floor(data.total / 10) + 1 : data.total / 10}
                                // page={page}
                                // onChange={handleChange}
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
