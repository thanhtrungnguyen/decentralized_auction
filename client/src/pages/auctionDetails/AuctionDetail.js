import Header from "../../components/header/HeaderUser";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/auctionDetail.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import PlaceABid from "../../components/popups/PlaceABid";
import { useFetch } from "../../hook/useFetch";
import ReactPlayer from "react-player";
import { Player } from "video-react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import HeaderUser from "../../components/header/HeaderUser";
import Loading from "../../components/loading/Loading";
import BidModal from "../bidder/index";
import BidModalButton from "../bidder/components/BidModalButton";

const AuctionDetail = () => {
    // const [auction, setAuction] = useState(null);
    const { id, propertyId } = useParams();
    const baseURL = `http://localhost:8800/api/auction/auctiondetail/${id}/${propertyId}`;
    const { data, loading, error } = useFetch(baseURL);
    const [role, setRole] = useState();

    console.log(data);
    console.log(loading);
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
    // const [openModal, setOpenModal] = useState(() => {
    //     return false;
    // });

    const [auction, setAuction] = useState([]);
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
            })()}
            <NavBar />
            <div className={styles.container}>
                <div className={styles.col1}>
                    {/* <div className={styles.col1}> */}
                    <div className={styles.col3}>
                        <div className={styles.row}>
                            {/* <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            /> */}
                            {/* <img
                                className={styles.img}
                                src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[0].Name}`}
                                alt="images"
                            /> */}
                        </div>
                        <div className={styles.row}>
                            {/* <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            /> */}
                            {/* <img
                                className={styles.img}
                                src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[1].Name}`}
                                alt="images"
                            /> */}
                        </div>
                        <div className={styles.row}>
                            {/* <img
              className={styles.img}
              src="https://www.w3schools.com/html/pic_trulli.jpg"
              alt="images"
            /> */}
                            {/* <img
                                className={styles.img}
                                src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[2].Name}`}
                                alt="images"
                            /> */}
                        </div>
                    </div>
                    {/* </div> */}
                    {/* <div className={styles.col2}> */}
                    {/* <div className={styles.conI}> */}
                    {/* <img
            className={styles.img}
            src="https://www.w3schools.com/html/pic_trulli.jpg"
            alt="images"
          /> */}
                    <div className={styles.col4}>
                        {/* <img
              className={styles.img2}
              src={`${data.MediaURL[2]}`}
              alt="images"
            /> */}
                        {/* <ReactPlayer
              className={styles.video}
              url="youtube.com/watch?v=LuQ2YQ87ucw"
              width="85%"
              height="90%"
            /> */}
                        <ReactPlayer
                            className={styles.video}
                            url={`${data.Properties_Media__r.records[3].Name}`}
                            playing={true}
                            controls={true}
                            loop={true}
                            muted={true}
                            playsinline={true}
                            onReady={true}
                            width="85%"
                            height="90%"
                        />
                        {/* <Player
              playsInline
              className={styles.video}
              poster={`${data.MediaURL[1]}`}
              ="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              width="85%"
              height="90%"
            /> */}
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                </div>
                <div className={styles.col2}>
                    <p className={styles.title}>{data.Name}</p>
                    <p className={styles.txtBold}>Start Bid : {data.Start_Bid__c}</p>
                    <p className={styles.txt}>
                        Start Registration Time :{" "}
                        {new Date(new Date(data.Auctions1__r.records[0].Start_Registration_Time__c).getTime() - 7 * 60 * 60 * 1000).toLocaleString()}
                    </p>
                    <p className={styles.txt}>
                        End Registration Time :{" "}
                        {new Date(new Date(data.Auctions1__r.records[0].End_Registration_Time__c).getTime() - 7 * 60 * 60 * 1000).toLocaleString()}
                    </p>
                    <p className={styles.txt}>
                        Auction Start Time :{" "}
                        {new Date(new Date(data.Auctions1__r.records[0].Start_Aution_Time__c).getTime() - 7 * 60 * 60 * 1000).toLocaleString()}
                    </p>
                    <p className={styles.txt}>
                        Auction End Time :{" "}
                        {new Date(new Date(data.Auctions1__r.records[0].End_Auction_Time__c).getTime() - 7 * 60 * 60 * 1000).toLocaleString()}
                    </p>
                    {/* </div> */}
                    {/* <Popup trigger={<button className={styles.btn}>Place Bid</button>} position="right center">
                        <PlaceABid sendAuction={data} />

                    </Popup> */}

                    <BidModalButton auctionId={id} propertyId={propertyId} />
                </div>
            </div>
            <br />
            <div className={styles.des}>
                <div className={styles.cont}>
                    <p className={styles.txtDesBold}>Description</p>
                    <label className={styles.area}>{data.Description__c}</label>
                </div>
            </div>
            <div className={styles.RelatedAuctions}>
                <p className={styles.title}>Related Auctions</p>
                <div className={styles.tb}>
                    <div className={styles.col}>
                        <img className={styles.img2} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        <p className={styles.txtImg}>Mens Fashion Wear</p>
                        <p className={styles.txtImgS}>Starting price : $43.00</p>
                    </div>
                    <div className={styles.col}>
                        <img className={styles.img2} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        <p className={styles.txtImg}>Mens Fashion Wear</p>
                        <p className={styles.txtImgS}>Starting price : $43.00</p>
                    </div>
                    <div className={styles.col}>
                        <img className={styles.img2} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        <p className={styles.txtImg}>Mens Fashion Wear</p>
                        <p className={styles.txtImgS}>Starting price : $43.00</p>
                    </div>
                    <div className={styles.col}>
                        <img className={styles.img2} src="https://www.w3schools.com/html/pic_trulli.jpg" alt="images" />
                        <p className={styles.txtImg}>Mens Fashion Wear</p>
                        <p className={styles.txtImgS}>Starting price : $43.00</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AuctionDetail;
