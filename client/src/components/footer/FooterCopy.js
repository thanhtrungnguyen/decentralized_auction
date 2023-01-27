import { Outlet, Link } from "react-router-dom";
import "../../styleCss/stylesComponents/footerCopy.css";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
const Footer = () => {
    return (
        <>
            <div className="footer">
                <label className="txt">@CopyRight - All Rights Reserved</label>
                <div className="LinkIcon">
                    <a className="icon" href={"https://www.facebook.com/DecentralizedAuctionPlatform"}>
                        <BsFacebook />
                    </a>
                    <a className="icon" href={"https://www.facebook.com/DecentralizedAuctionPlatform"}>
                        <BsInstagram />
                    </a>{" "}
                    <a className="icon" href={"https://www.facebook.com/DecentralizedAuctionPlatform"}>
                        <BsYoutube />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Footer;
