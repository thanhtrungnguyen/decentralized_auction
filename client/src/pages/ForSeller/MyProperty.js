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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { Button } from "@mui/material";
import HeaderUser from "../../components/header/HeaderUser";

// import { useFetch, useFetchPagination } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import DeleteProperty from "../../components/popups/forSeller/DeleteProperty";
import RequestAddProperty from "../../components/popups/forSeller/RequestAddProperty";
import useAuth from "../../hooks/useAuth";
import { useFetchData } from "../../hooks/useFetch";
const MyProperty = () => {
    const axios = useAxiosPrivate();
    const [page, setPage] = React.useState(1);
    const [category, setCategory] = useState(null);
    const [category2, setCategory2] = useState(null);
    const [search, setSearch] = useState(null);
    const [search2, setSearch2] = useState(null);
    const [status, setStatus] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [listProperty, setListProperty] = useState([]);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();
    //const baseURLCategory = "http://localhost:8800/api/category/";
    const baseURLProperty = `/property/myProperty/${page}/${status}/${search}`;
    // const requestAuction = "http://localhost:8800/api/auction/request/";
    const [role, setRole] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // await axios.get(baseURLCategory).then((resp) => {
            //     console.log(resp.data);
            //     console.log("axios get");
            //     setListCategory(resp.data);
            // });
            await axios.get(baseURLProperty, { withCredentials: true }).then((resp) => {
                // console.log(resp.data);
                // console.log("axios get");
                setListProperty(resp.data.properties);
            });

            setLoading(false);
        };
        fetchData();
    }, [baseURLProperty]);

    // const RequestAuction = (propertyId) => {
    //     setLoading(true);
    //     axios.post(requestAuction + propertyId, { withCredentials: true }).then((resp) => {
    //         console.log(resp.data);
    //         console.log("axios get");
    //         setListProperty(resp.data);
    //     });

    //     setLoading(false);
    //     window.location.reload(false);
    //     alert("Request add successful");
    // };

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
        if (id === "search") {
            setSearch2(value);
        }
    };
    const handleSubmit = (event) => {
        if (search2.trim() === "") {
            setSearch2("");
            setSearch(null);
        } else setSearch(search2.trim());
        setPage(1);
        event.preventDefault();
    };

    const navigate = useNavigate();
    function exportData(data) {
        return (
            <>
                {data.listProperty.map((item) => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.category.name}</td>
                        <td>{item.startBid}</td>
                        <td>{item.status}</td>
                        <td>
                            {item.status === "Created" ? (
                                <>
                                    <AiTwotoneEdit
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate(`/editProperty/${item._id}`);
                                        }}
                                    />

                                    <AiFillEye
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate("/propertyDetail/" + `${item._id}`);
                                        }}
                                    />
                                    {/* <AiOutlineDelete className={styles.iconView} /> */}
                                    <Popup
                                        trigger={
                                            <label>
                                                {" "}
                                                <AiOutlineDelete className={styles.iconView} />
                                            </label>
                                        }
                                        position="right center"
                                    >
                                        <DeleteProperty idProperty={item._id} />
                                    </Popup>
                                    <Popup trigger={<label className={styles.link}>Request Add</label>} position="right center">
                                        <RequestAddProperty idProperty={`${item._id}`} />
                                    </Popup>
                                </>
                            ) : item.status === "Request" || item.status === "Approved" || item.status === "Bidding" || item.status === "Closed" || item.status === "UpcomingForBid" || item.status === "RegistrationTime" ? (
                                <>
                                    <AiFillEye
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate("/propertyDetail/" + `${item._id}`);
                                        }}
                                    />
                                </>
                            ) : item.status === "Modified" ? (
                                <>
                                    <AiTwotoneEdit
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate("/editProperty/" + `${item._id}`);
                                        }}
                                    />
                                    <AiFillEye
                                        className={styles.iconView}
                                        onClick={() => {
                                            navigate("/propertyDetail/" + `${item._id}`);
                                        }}
                                    />
                                    <Popup trigger={<label className={styles.link}>Request Add</label>} position="right center">
                                        <RequestAddProperty idProperty={`${item._id}`} />
                                    </Popup>
                                    {/* <Popup
                                        trigger={
                                            <label>
                                                {" "}
                                                <AiOutlineDelete className={styles.iconView} />
                                            </label>
                                        }
                                        position="right center"
                                    >
                                        <DeleteProperty idProperty="" />
                                    </Popup> */}
                                </>
                            ) : <>
                                <AiTwotoneEdit
                                    className={styles.iconView}
                                    onClick={() => {
                                        navigate("/editProperty/" + `${item._id}`);
                                    }}
                                />
                                <AiFillEye
                                    className={styles.iconView}
                                    onClick={() => {
                                        navigate("/propertyDetail/" + `${item._id}`);
                                    }}
                                />
                                {/* <Popup
                                        trigger={
                                            <label>
                                                {" "}
                                                <AiOutlineDelete className={styles.iconView} />
                                            </label>
                                        }
                                        position="right center"
                                    >
                                        <DeleteProperty idProperty="" />
                                    </Popup> */}
                            </>}
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
                <SideBarSeller />
                <Time />
                <div className={styles.r}>
                    <h1 style={{ margin: '20px 405px' }}>My Property</h1>
                    <div className={styles.con}>

                        <div className={styles.btns}>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="null">
                                All
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Created">
                                Created
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Modified">
                                Modified
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Request">
                                Request
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Approved">
                                Approved
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="Rejected">
                                Rejected
                            </button>
                            <form onSubmit={handleSubmit}>
                                <input
                                    className={styles.ip}
                                    type="text"
                                    placeholder="Enter Property Name"
                                    id="search"
                                    value={search2}
                                    onChange={(e) => handleInputChange(e)}
                                ></input>
                                <button className={styles.btn} type="submit">
                                    Search
                                </button>
                                <button className={styles.btn2} onClick={() => { navigate("/addProperty"); }}>
                                    + New Property
                                </button>
                            </form>

                        </div>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Property Name</th>
                                <th className={styles.th}>Category</th>
                                <th className={styles.th}>Start Bid</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Action</th>
                            </tr>
                            {exportData(listProperty)}
                        </table>
                        <hr />
                        <div>
                            <Pagination
                                className={styles.Pagination}
                                count={Math.ceil(listProperty.count / 8)}
                                hidden={listProperty.count === 0 ? true : false}
                                page={page}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className={styles.content}>
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
                    </div> */}
            </div>
        </>
    );
};

export default MyProperty;
