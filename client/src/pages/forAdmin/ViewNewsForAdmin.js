import styles from "../../styleCss/stylesPages/forAdmin/sellerDetail.module.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

import FooterCopy from "../../components/footer/FooterCopy";
import HeaderUser from "../../components/header/HeaderUser";
// import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import { useFetch } from "../../hooks/useFetch";
import createDOMPurify from "dompurify";
import Time from "../../components/time/Time";
// import { JSDOM } from "jsdom";
const ViewNewsForAdmin = () => {
    const axios = useAxiosPrivate();
    // const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify();

    const { id } = useParams();
    const baseURL = `/news/${id}`;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [role, setRole] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                // setTitle(resp.data.news.title);
                // setContent(resp.data.news.content);
                setData(resp.data);
            });
            setLoading(false);
        };
        fetchData();
    }, [baseURL]);
    //const [match, setMatch] = useState(null);

    return loading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.container}>
                <SideBarAdmin />
                <Time />
                <div className={styles.content}>
                    <div style={{ marginLeft: "10px" }} className={styles.box}>
                        <h1 style={{ textAlign: "center" }}>{data.news.title}</h1>
                        <br />
                        <br />
                        <br />
                        {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.news.content) }} />}
                        <button
                            className={styles.btn}
                            onClick={() => {
                                navigate("/listNews");
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewNewsForAdmin;
