import styles from "../../styleCss/login.module.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
// import { Button } from "@mui/material";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import FooterCopy from "../../components/footer/FooterCopy";
import HeaderUser from "../../components/header/HeaderUser";
// import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import { useFetch } from "../../hooks/useFetch";
import createDOMPurify from "dompurify";
// import { JSDOM } from "jsdom";
const ViewNews = () => {
    const axios = useAxiosPrivate();
    // const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify();

    const { id } = useParams();
    const baseURL = `/news/getById/${id}`;
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
                setTitle(resp.data.Name);
                setContent(resp.data.Content__c);
                setData(resp.data);
                // console.log(resp.data);
                // console.log("axios get");
                // onCitySelect(sCity);
                // onDistrictSelect(sDistrict);
                // onWardSelect(sWard);
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
    //const [match, setMatch] = useState(null);
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

    return loading ? (
        <Loading />
    ) : (
        <>
            <Header />
            <NavBar />
            <div className={styles.box}>
                <h1>{data.Name}</h1>
                <br />
                <br />
                <br />
                {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.Content__c) }} />}
            </div>

            <Footer />
            <FooterCopy />
        </>
    );
};

export default ViewNews;
