import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import PublishNews from "../../components/popups/forAdmin/PublishNews";
import PrivateNews from "../../components/popups/forAdmin/PrivateNews";
import { useFetchPagination } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const ListNews = () => {
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState(null);
    const [title2, setTitle2] = useState(null);
    const [status, setStatus] = useState(null);
    const [searchData, setSearchData] = useState("");
    const navigate = useNavigate();
    const [role, setRole] = useState();

    var baseURL = `http://localhost:8800/api/news/getAll/${page}/${status}/${title}`;
    // var totalURL = `http://localhost:8800/api/news/countNews`;

    var { data, loading, error } = useFetchPagination(baseURL, page);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "title") {
            setTitle2(value);
        }
    };

    const handleSubmit = (event) => {
        // const formData = new FormData();

        // formData.append("title", title);
        // //var { data, loading, error } = useFetchPagination(baseURL, page);
        // axios
        //     .get("http://localhost:8800/api/news/search", {title}, {
        //         withCredentials: true,
        //     })
        //     .then((res) => {
        //         // console.log(res);
        //         // console.log(res.data);
        //         // alert(res.data.message);
        //         setSearchData(res.data);

        //         navigate("/listNews");
        //     });
        title2 === "" ? setTitle(null) : setTitle(title2);
        setPage(1);
        event.preventDefault();
    };
    const handleChange = (event, page) => {
        setPage(page);
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
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
        setPage(1);
        // data = data.listNews.filter(news => news.Status__c.includes(`${filter}`))
    };
    function search(data) {
        return (
            <>
                {data.listNews.map((item) => (
                    <tr>
                        <td className={styles.td}>{item.Name}</td>
                        <td className={styles.td}>{Moment(item.LastModifiedDate).format("DD/MM/yyy - H:mm")}</td>
                        <td className={styles.td}>{item.Status__c}</td>
                        <td className={styles.td}>
                            {(() => {
                                if (item.Status__c === "Published") {
                                    return (
                                        <Popup trigger={<label className={styles.linkBlue}>Private</label>} position="right center">
                                            <PrivateNews idNews={item.Id} />
                                        </Popup>
                                    );
                                } else {
                                    return (
                                        <Popup trigger={<label className={styles.linkBlue}>Publish</label>} position="right center">
                                            <PublishNews idNews={item.Id} />
                                        </Popup>
                                    );
                                }
                            })()}
                            <Link className={styles.linkBlue} to={`/viewNews/${item.Id}`}>
                                View
                            </Link>
                            <Link className={styles.linkBlue} to={`/editNews/${item.Id}`}>
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
            </>
        );
    }
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
    }, []);
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
                    <SideBarAdmin />
                    <div className={styles.content}>
                        <div className={styles.search}>
                            <div className={styles.floatLeft}>
                                <p className={styles.title}>Search</p>
                                <input
                                    id="title"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Title"
                                    value={title2}
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
                                value="Published"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Published
                            </button>
                            <button
                                className={styles.link}
                                value="Private"
                                onClick={(e) => {
                                    handleChangeStatus(e);
                                }}
                            >
                                Private
                            </button>

                            <hr />
                            <p className={styles.txtBold}>Total News: {data.totalNews}</p>
                            <Link className={styles.btnAdd} to="/addNew">
                                Add News
                            </Link>
                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Title</th>
                                    <th className={styles.th}>Last modified</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {search(data)}
                            </table>
                            <div>
                                <Pagination
                                    className={styles.pagi}
                                    size="large"
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
export default ListNews;
