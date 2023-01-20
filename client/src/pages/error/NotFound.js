import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import HeaderUser from "../../components/header/HeaderUser";
import FooterCopy from "../../components/footer/FooterCopy";
import PageName from "../../components/header/PageName";
import "../../styleCss/error.css";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const ErrorPage = ({ error }) => {
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {}, []);
    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (role == "BIDDER" || role == "SELLER" || role == "MANAGER" || role == "ADMIN") {
                    return <HeaderUser username={"fixing"} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />
            <PageName pageName={"Error"} link={"/"} home={"homePage"} />

            {/* <h1>{error.code}</h1>
            <h2>{error.message}</h2> */}
            <img
                className="imgg"
                src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
                alt="images"
            />
            <p className="oop">OOP!!! This page doesn't exist</p>
            <Footer />
            <FooterCopy />
        </>
    );
};

export default ErrorPage;
