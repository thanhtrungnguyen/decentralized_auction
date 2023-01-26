import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import HeaderUser from "../../components/header/HeaderUser";
import FooterCopy from "../../components/footer/FooterCopy";
import PageName from "../../components/header/PageName";
import "../../styleCss/stylesPages/common/AboutUs.css";
import Loading from "../../components/loading/Loading";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const AboutUs = () => {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();


    return loading ? (
        <Loading />
    ) : (
        <>
            <Header />
            <NavBar />
            <PageName pageName={"About Us"} link={"/aboutUs"} home={"homePage"} />
            <p className="t">DAP is Decentralized Auction Platform</p>
            <p className="c">
                "Online auction platforms are becoming more and more popular as a result of quick developments in e-commerce and shifting customer
                tastes. Customers can benefit from online platforms in a number of ways, including more product variety, price discounts, and reduced
                regional restrictions. However, current auction systems are centralized and rely on third-party middlemen to settle transactions. As a
                result, because prospective bidders must have faith in the organizer to ensure that bids are legitimate, online platforms present
                serious questions about data integrity, security, transparency, and traceability. Therefore, employing blockchain technology to adopt
                a decentralized strategy can alter the auction process by getting rid of middlemen, ensuring transparency, and lowering transaction
                costs."
            </p>
            <Footer />
            <FooterCopy />
        </>
    );
};

export default AboutUs;
