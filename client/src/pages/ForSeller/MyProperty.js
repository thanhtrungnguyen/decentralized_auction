import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarSeller";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Button } from "@mui/material";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
// import { useFetch, useFetchPagination } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";

const MyProperty = () => {
    const [page, setPage] = React.useState(1);
    const [category, setCategory] = useState(null);
    const [category2, setCategory2] = useState(null);
    const [propertyName, setPropertyName] = useState(null);
    const [propertyName2, setPropertyName2] = useState(null);
    const [status, setStatus] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [listProperty, setListProperty] = useState([]);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();
    const baseURLCategory = "http://localhost:8800/api/category/";
    const baseURLProperty = `http://localhost:8800/api/property/getAll/${page}/${status}/${category}/${propertyName}`;
    const requestAuction = "http://localhost:8800/api/auction/request/";
    const [role, setRole] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURLCategory).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setListCategory(resp.data);
            });
            await axios.get(baseURLProperty, { withCredentials: true }).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setListProperty(resp.data);
            });
            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }
            setLoading(false);
        };
        fetchData();
    }, [baseURLProperty]);

    const RequestAuction = (propertyId) => {
        setLoading(true);
        axios.post(requestAuction + propertyId, { withCredentials: true }).then((resp) => {
            console.log(resp.data);
            console.log("axios get");
            setListProperty(resp.data);
        });

        setLoading(false);
        window.location.reload(false);
        alert("Request add successful");
    };

    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
        setPage(1);
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "category") {
            setCategory2(value);
        }
        if (id === "propertyName") {
            setPropertyName2(value);
        }
    };
    const handleSubmit = (event) => {
        // const formData = new FormData();

        // formData.append("propertyName", propertyName);
        // formData.append("category", category);

        // axios
        //     .get("http://localhost:8800/api/property", formData, {
        //         withCredentials: true,
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         console.log(res.data);
        //         alert(res.data.message);
        //         // setData(res.data);

        //         // navigate("/myProperty");
        //     });
        propertyName2 === "" ? setPropertyName(null) : setPropertyName(propertyName2);
        setCategory(category2);
        setPage(1);
        event.preventDefault();
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
                                    id="propertyName"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Please input"
                                    value={propertyName2}
                                    onChange={(e) => handleInputChange(e)}
                                    //required
                                    //required
                                ></input>
                            </div>
                            <p className={styles.title}>Category</p>
                            <select className={styles.select} onChange={(e) => handleInputChange(e)} id="category" placeholder="Category">
                                <option value="null">All</option>
                                {listCategory.map((item) => (
                                    <option value={item.Name} selected={item.Name === category2}>
                                        {item.Name}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <br />
                            <input className={styles.btn} type="submit" value="Search"></input>
                            <input className={styles.btnReset} type="button" value="Reset" onClick={(e) => setPropertyName2("")}></input>
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
                                value="Request"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Request
                            </button>
                            <button
                                className={styles.link}
                                value="Approved"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Approved
                            </button>
                            <button
                                className={styles.link}
                                value="Reject"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Reject
                            </button>
                            <hr />
                            <p className={styles.txtBold}>Total Property: {listProperty.data.totalProperty}</p>
                            <Link className={styles.btnAdd} to="/addProperty">
                                Add a New Property
                            </Link>
                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Property Name</th>
                                    <th className={styles.th}>Category</th>
                                    <th className={styles.th}>Start bid</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {listProperty.data.properties.map((property) => (
                                    <tr>
                                        <td className={styles.td}>{property.Name}</td>
                                        <td className={styles.td}>{property.Category_Id__r.Name}</td>
                                        <td className={styles.td}>{property.Start_Bid__c}</td>
                                        <td className={styles.td}>{property.Status__c}</td>
                                        <td className={styles.td}>
                                            <Link className={styles.linkBlue} to={`/propertyDetail/${property.Id}`}>
                                                View
                                            </Link>
                                            {property.Status__c === "Created" && (
                                                <>
                                                    <Link className={styles.linkBlue} to={`/editProperty/${property.Id}`}>
                                                        Edit
                                                    </Link>
                                                    <Link className={styles.linkBlue} to={`/deleteProperty/${property.Id}`}>
                                                        Delete
                                                    </Link>
                                                    <label className={styles.linkBlue} onClick={() => RequestAuction(`${property.Id}`)}>
                                                        Request Add
                                                    </label>
                                                </>
                                            )}

                                            {property.Status__c === "Rejected" && (
                                                <>
                                                    <Link className={styles.linkBlue} to={`/editProperty/${property.Id}`}>
                                                        Edit
                                                    </Link>
                                                    <Link className={styles.linkBlue} to={`/deleteProperty/${property.Id}`}>
                                                        Delete
                                                    </Link>
                                                    <label className={styles.linkBlue} onClick={() => RequestAuction(`${property.Id}`)}>
                                                        Request Add
                                                    </label>
                                                </>
                                            )}
                                            {property.Status__c === "Fail" && (
                                                <>
                                                    <Link className={styles.linkBlue} to={`/editProperty/${property.Id}`}>
                                                        Edit
                                                    </Link>
                                                    <Link className={styles.linkBlue} to={`/deleteProperty/${property.Id}`}>
                                                        Delete
                                                    </Link>
                                                    <label className={styles.linkBlue} onClick={() => RequestAuction(`${property.Id}`)}>
                                                        Request Add
                                                    </label>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <div>
                                <Pagination
                                    className={styles.pagi}
                                    count={
                                        listProperty.data.total % 10 > 0 ? Math.floor(listProperty.data.total / 10) + 1 : listProperty.data.total / 10
                                    }
                                    // count={
                                    //     listProperty.data.total % 10 > 0 ? Math.floor(listProperty.data.total / 10) + 1 : listProperty.data.total / 10
                                    // }
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

export default MyProperty;
