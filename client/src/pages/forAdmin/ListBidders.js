import styles from "../../styleCss/stylesPages/forAdmin/listManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
// import { BsFillCheckSquareFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import BanedBidder from "../../components/popups/forAdmin/BanBidder";
import ActiveBidder from "../../components/popups/forAdmin/ActiveBidder";
// import { useFetchPagination } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { AiFillEye, AiTwotoneEdit } from "react-icons/ai";
import Time from "../../components/time/Time";

// import { color } from "@mui/system";
const ListBidders = () => {
    const [page, setPage] = React.useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);
    const [email2, setEmail2] = useState(null);
    const [status, setStatus] = useState(null);
    //const [filter,setFilter] = useState("");
    // const navigate = useNavigate();
    const baseURL = `http://localhost:8800/api/user/getAll/BIDDER/${page}/${status}/${email}`;
    const [role, setRole] = useState();

    //const { data, loading, error } = useFetchPagination(baseURL, page);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         await axios.get(baseURL).then((resp) => {
    //             console.log(resp.data);
    //             console.log("axios get");
    //             setData(resp.data);
    //         });

    //         // console.log(getUser().type);
    //         if (getUser() != null) {
    //             setRole(getUser().role);
    //         } else {
    //             setRole("");
    //         }

    //         setLoading(false);
    //     };
    //     fetchData();
    // }, [baseURL]);
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
        // const formData = new FormData();

        // formData.append("email", email);

        // axios
        //     .get("http://localhost:8800/api/bidder", formData, {
        //         withCredentials: true,
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         console.log(res.data);
        //         alert(res.data.message);
        //         // setData(res.data);

        //         navigate("/listBidders");
        //     });
        email2 === "" ? setEmail(null) : setEmail(email2);
        setPage(1);
        event.preventDefault();
    };
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
    return !loading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.container}>
                <SideBarAdmin />
                <Time />
                <div className={styles.r}>
                    <div className={styles.con}>
                        <div className={styles.btns}>
                            <button className={styles.btn}>All</button>
                            <button className={styles.btn}>Activate</button>
                            <button className={styles.btn}>Deactivate</button>
                            <input className={styles.ip} type="text" placeholder="Enter Name"></input>
                            <button className={styles.btn}>Search</button>
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
                                        <BanedBidder idManager="" />
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
                                <td>Deactivate</td>
                                <td>
                                    {" "}
                                    <Popup trigger={<label className={styles.linkBlue}>Activate</label>} position="right center">
                                        <ActiveBidder idManager="" />
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
