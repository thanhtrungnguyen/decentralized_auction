import { Outlet, Link } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/stylesPages/news.module.css";
import { BsPencil, BsCalendar3, BsSearch } from "react-icons/bs";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import jwt from "jsonwebtoken";
import { useFetchPagination } from "../../hook/useFetch";
import moment from "moment";
import { Pagination } from "@mui/material";
const News = () => {
    const [role, setRole] = useState();
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState(null);
    const [title2, setTitle2] = useState(null);
    const [status, setStatus] = useState('Published');

    var baseURL = `http://localhost:8800/api/news/getAll/${page}/${status}/${title}`;
    var { data, loading, error } = useFetchPagination(baseURL, page);

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

    function exportData(data) {
        return (
            <>
                {data.listNews.map((item) => (
                    <div className={styles.content}>
                        <img className={styles.img} src={`http://localhost:8800/api/auction/images/${item.Avatar__c}`} alt="Img" />
                        <BsPencil className={(styles.icon, styles.colorPink)} />
                        <label className={styles.lable}>{item.Id}</label>
                        <BsCalendar3 className={(styles.icon, styles.colorYellow)} />
                        <label className={styles.lable}>{moment(`${item.CreatedDate}`).format("MMM Do YY")} </label>
                        <div className={styles.title}>{item.Name}</div>
                        {/* <div className={styles.des}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum
                            eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.
                        </div> */}
                        <Link className={styles.link} to="/">
                            Read More
                        </Link>
                    </div>
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
            {(() => {
                if (role == "BIDDER" || role == "SELLER" || role == "MANAGER" || role == "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}{" "}
            <NavBar />
            <div className={styles.container}>
                <div className={styles.col1}>
                    {exportData(data)}
                    <div className={styles.pagination}>
                    
                                <Pagination
                                    className={styles.pagi}
                                    size="large"
                                    count={(data.total % 10) > 0 ? (Math.floor(data.total / 10) + 1) : (data.total/10) }
                                    page={page}
                                    onChange={handleChange}
                                />
                            
                    </div>
                </div>
                <div className={styles.col2}>
                    <form onSubmit={handleSubmit}>
                        <p className={styles.txtSearch}>Search</p>
                        <div className={styles.conS}>
                            <input
                                id="Title News"
                                className={styles.input}
                                type="text"
                                placeholder="Title"
                                value={title2}
                                onChange={(e) => handleInputChange(e)}
                            //required
                            ></input>
                            <BsSearch className={styles.icon2} />
                        </div>
                    </form>

                    <br />
                    <br />
                    {/* <p className={styles.txtSearch}>Recent Post</p>
                    <div className={styles.post}>
                        <img className={styles.imgSmall} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        <p className={styles.txtRecent}>It is a long established fact</p>
                        <p className={styles.txtTime}>Aug 09 2020</p>
                    </div>
                    <div className={styles.post}>
                        <img className={styles.imgSmall} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        <p className={styles.txtRecent}>It is a long established fact</p>
                        <p className={styles.txtTime}>Aug 09 2020</p>
                    </div>
                    <div className={styles.post}>
                        <img className={styles.imgSmall} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        <p className={styles.txtRecent}>It is a long established fact</p>
                        <p className={styles.txtTime}>Aug 09 2020</p>
                    </div>
                    <div className={styles.post}>
                        <img className={styles.imgSmall} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        <p className={styles.txtRecent}>It is a long established fact</p>
                        <p className={styles.txtTime}>Aug 09 2020</p>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
};
export default News;
