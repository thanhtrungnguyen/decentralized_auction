// import styles from "../../styleCss/login.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
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
// import { useFetch } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";
import { useFetch } from "../../hook/useFetch";

const ViewNews = () => {
    const { id } = useParams();
    const baseURL = `http://localhost:8800/api/news/getById/${id}`;
    // const { data, loading, error } = useFetch(baseURL);
    // const navigate = useNavigate();
    const { data, loading } = useFetch(baseURL);
    const [role, setRole] = useState();

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
            {(() => {
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
                    return <HeaderUser userName={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />
            <div>{data.content}</div>
            <Footer />
            <FooterCopy />
        </>
    );
};

export default ViewNews;
