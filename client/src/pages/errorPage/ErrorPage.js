import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import HeaderUser from "../../components/header/HeaderUser";
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
            {/* <h1>{error.code}</h1>
            <h2>{error.message}</h2> */}
            <h3>ErrorPage</h3>
            <Footer />
        </>
    );
};

export default ErrorPage;
