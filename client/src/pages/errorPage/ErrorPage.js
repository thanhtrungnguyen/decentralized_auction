import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import HeaderUser from "../../components/header/HeaderUser";
import FooterCopy from "../../components/footer/FooterCopy";
import PageName from "../../components/header/PageName";
import style from "../../styleCss/error.css";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const ErrorPage = ({ error }) => {
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
    return (
        <>
            {(() => {
                if (getUser().role == "BIDDER" || getUser().role == "SELLER" || getUser().role == "MANAGER" || getUser().role == "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
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
