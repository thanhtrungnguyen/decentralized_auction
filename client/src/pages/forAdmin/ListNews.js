import styles from "../../styleCss/stylesPages/forAdmin/listManager.module.css";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import PublishNews from "../../components/popups/forAdmin/PublishNews";
import PrivateNews from "../../components/popups/forAdmin/PrivateNews";
import Loading from "../../components/loading/Loading";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { AiFillEye, AiTwotoneEdit } from "react-icons/ai";
import Time from "../../components/time/Time";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
const ListNews = () => {
    const axios = useAxiosPrivate();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState(null);
    const [title2, setTitle2] = useState(null);
    const [status, setStatus] = useState(null);
    // const [searchData, setSearchData] = useState("");
    // const navigate = useNavigate();
    const [role, setRole] = useState();
    const navigate = useNavigate();

    var baseURL = `news/news/${page}/${status}/${title}`;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get("/session").then((resp) => {
                // console.log("axios get");
                // setData(resp.data.news);
                console.log(resp);
            });
            await axios.get(baseURL).then((resp) => {
                // console.log("axios get");
                setData(resp.data.news);
                console.log(resp);
            });

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "title") {
            setTitle2(value);
        }
    };

    const handleSubmit = (event) => {
        title2 === "" ? setTitle(null) : setTitle(title2);
        setPage(1);
        event.preventDefault();
    };
    const handleChange = (event, page) => {
        setPage(page);
    };
    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
        setPage(1);
        // data = data.listNews.filter(news => news.Status__c.includes(`${filter}`))
    };
    function exportData(data) {
        return (
            <>
                {data.listNews.map((item) => (
                    <tr>
                        <td>{item.title}</td>
                        <td>
                            {moment(item.createdAt).format("L")} - {moment(item.createdAt).format("LTS")}{" "}
                        </td>
                        <td>{item.status === "Activate" ? "Activate" : "Deactivate"}</td>
                        <td>

                        </td>
                        <td>
                            <AiTwotoneEdit
                                className={styles.iconView}
                                onClick={() => {
                                    navigate(`/editNews/${item._id}`);
                                }}
                            />
                            <AiFillEye
                                className={styles.iconView}
                                onClick={() => {
                                    navigate(`/viewNewsForAdmin/${item._id}`);
                                }}
                            />
                            {item.status === "Activate" ? (
                                <Popup
                                    trigger={
                                        <label style={{ color: "red" }} className={styles.linkBlue}>
                                            Deactivate
                                        </label>
                                    }
                                    position="right center"
                                >
                                    <PrivateNews idNews={item._id} />
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
                                    <PublishNews idNews={item._id} />
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
                <SideBarAdmin />
                <Time />
                <div className={styles.r}>
                    <div className={styles.con}>
                        <div className={styles.btns}>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="null">
                                All
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="activate">
                                Activate
                            </button>
                            <button className={styles.btn} onClick={(e) => handleChangeStatus(e)} value="deactivate">
                                Deactivate
                            </button>
                            <form onSubmit={handleSubmit}>
                                <input
                                    className={styles.ip}
                                    type="text"
                                    placeholder="Enter Title"
                                    id="title"
                                    value={title2}
                                    onChange={(e) => handleInputChange(e)}
                                ></input>
                                <button className={styles.btn} type="submit">
                                    Search
                                </button>
                            </form>
                            <button
                                className={styles.btn2}
                                onClick={() => {
                                    navigate("/addNew");
                                }}
                            >
                                + New News
                            </button>
                        </div>
                        <table className={styles.table}>
                            <tr>
                                <th className={styles.th}>Title</th>
                                <th className={styles.th}>Created At</th>

                                <th className={styles.th}>Status</th>
                                <th className={styles.th}></th>
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
            {/* {(() => {
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
            </form> */}
        </>
    );
};
export default ListNews;
