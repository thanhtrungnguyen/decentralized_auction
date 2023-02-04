import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/auctionDetail.module.css";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import BidModalButton from "../biddingFeatures/components/BidModalButton";
import PageName from "../../components/header/PageName";
import FooterCopy from "../../components/footer/FooterCopy";
import moment from "moment";
import "moment/locale/vi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const AuctionDetail = () => {
    const axios = useAxiosPrivate();
    // const [auction, setAuction] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const baseURL = `/auction/${id}`;
    const { data } = useFetch(baseURL);
    const [dataAuction, setDataAuction] = useState([]);
    const [role, setRole] = useState();
    let img1 = "https://unboxph3a1e0.zapwp.com/q:intelligent/r:0/wp:1/w:1/u:https://unbox.ph/wp-content/uploads/2011/09/Nike-Air-Mag-3-1200x742.jpeg";
    let img2 = "https://footwearnews.com/wp-content/uploads/2017/10/nike-mag-heritage-auctions7.jpg?w=700&h=437&crop=1";
    let img3 = "https://myshoes.vn/image/catalog/blog/25.12/giay-nike-air-mag.jpg";
    const [img, setImg] = useState(null);
    const setShow = (e) => {
        const { id, src } = e.target;
        if (id === "img1") setImg(src);
        if (id === "img2") setImg(src);
        if (id === "img3") setImg(src);
    };

    // const [openModal, setOpenModal] = useState(() => {
    //     return false;
    // });
    const baseURLAuction = `/auction/auctions/bidder?page=${1}&status=&search=null&sort=0&category=&minValue=0&maxValue=100`
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURLAuction).then((resp) => {
                //console.log(resp.data);
                // console.log("axios get");
                setDataAuction(resp.data.auctions.listAuction);
            });
            setLoading(false);
        };
        fetchData();
    }, [baseURLAuction]);
    return loading ? (
        <Loading />
    ) : (
        <>
            <Header />
            <NavBar />
            <PageName pageName={"Auction Detail"} link={"auctionDetail"} home={"homePage"} />

            <div className={styles.container}>
                <div className={styles.con}>
                    <div className={styles.info}>
                        <div className={styles.media}>
                            {img == null && <img src={`${data.auction.property.mediaUrl[0]}`} alt="thumb" className={styles.show}></img>}
                            {img != null && <img src={img} alt="thumb" className={styles.show}></img>}
                            <div className={styles.choose}>
                                <img
                                    id="img1"
                                    src={`${data.auction.property.mediaUrl[0]}`}
                                    alt="thumb"
                                    className={styles.img}
                                    onClick={(e) => setShow(e)}
                                ></img>
                                <img
                                    id="img2"
                                    src={`${data.auction.property.mediaUrl[1]}`}
                                    alt="thumb"
                                    className={styles.img}
                                    onClick={(e) => setShow(e)}
                                ></img>
                                <img
                                    id="img3"
                                    src={`${data.auction.property.mediaUrl[2]}`}
                                    className={styles.img}
                                    alt="thumb"
                                    onClick={(e) => setShow(e)}
                                ></img>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <p className={styles.title}>{data.auction.name}</p>
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <p className={styles.price}>{data.auction.property.startBid} ETH</p>
                            <p className={styles.time}>
                                Start Registration Time : {moment(data.auction.startRegistrationTime).format("L")} -{" "}
                                {moment(data.auction.startRegistrationTime).format("LTS")}{" "}
                            </p>
                            <p className={styles.time}>
                                End Registration Time : {moment(data.auction.endRegistrationTime).format("L")} -{" "}
                                {moment(data.auction.endRegistrationTime).format("LTS")}{" "}
                            </p>
                            <p className={styles.time}>
                                {" "}
                                Auction Start Time : {moment(data.auction.startAuctionTime).format("L")} -{" "}
                                {moment(data.auction.startAuctionTime).format("LTS")}
                            </p>
                            <p className={styles.time}>
                                {" "}
                                Auction End Time : {moment(data.auction.endAuctionTime).format("L")} -{" "}
                                {moment(data.auction.endAuctionTime).format("LTS")}
                            </p>
                            <br />
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <br />
                            <br />
                            <BidModalButton auctionId={data.auction._id} propertyId={data.auction.property._id} />
                            {/* <button className={styles.btn}>Place Bid</button> */}
                        </div>
                    </div>
                    <div className={styles.video}>
                        <video
                            className={styles.video}
                            src={`${data.auction.property.mediaUrl[3]}`}
                            playing={true}
                            controls={true}
                            loop={true}
                            muted={true}
                            playsinline={true}
                            // onReady={true}
                            width="85%"
                            height="90%"
                        />
                    </div>
                </div>
                <div className={styles.des}>
                    <br />
                    <p className={styles.price}>Description</p>
                    <hr />
                    <p className={styles.text}>{data.auction.property.description}</p>
                </div>

                <p className={styles.related}>RECOMMEND AUCTIONS</p>
                <div className={styles.auctions}>
                    {dataAuction?.map((auction) => (
                        <div className={styles.auction}>
                            <img id="img1" alt="thumb" className={styles.image} src={auction?.property.mediaUrl[0]} ></img>
                            <p className={styles.t}>{auction?.name}</p>
                            <p className={styles.price2}> Starting price : {auction?.property.startBid} ETH</p>
                            <button className={styles.btn2} onClick={() => {
                                navigate(`/auctionDetail/${auction?._id}`)
                                window.location.reload()
                            }}>Place Bid</button>
                            {/* <Link className={styles.btn2} to={`/auctionDetail/${auction?._id}`}>
                                Place Bid
                            </Link> */}
                        </div>

                    ))}


                    {/* <div className={styles.auction}>
                        <img id="img1" src={img3} alt="thumb" className={styles.image} onClick={(e) => setShow(e)}></img>
                        <p className={styles.t}>Nike Air Max 270 React</p>
                        <p className={styles.price2}>299,43 ETH</p>
                        <button className={styles.btn2}>Place Bid</button>
                    </div>
                    <div className={styles.auction}>
                        <img id="img1" src={img1} alt="thumb" className={styles.image} onClick={(e) => setShow(e)}></img>
                        <p className={styles.t}>Nike Air Max 270 React</p>
                        <p className={styles.price2}>299,43 ETH</p>
                        <button className={styles.btn2}>Place Bid</button>
                    </div> */}
                </div>
            </div>
            <Footer />
            <FooterCopy />
            {/* <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.col3}>
                        <div className={styles.row}>
                            <img
                                className={styles.img}
                                src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[0].Name}`}
                                alt="images"
                            />
                        </div>
                        <div className={styles.row}>
                            <img
                                className={styles.img}
                                src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[1].Name}`}
                                alt="images"
                            />
                        </div>
                        <div className={styles.row}>
                            <img
                                className={styles.img}
                                src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[2].Name}`}
                                alt="images"
                            />
                        </div>
                    </div>

                    <div className={styles.col4}>
                        <ReactPlayer
                            className={styles.video}
                            url={`${data.Properties_Media__r.records[3].Name}`}
                            playing={true}
                            controls={true}
                            loop={true}
                            muted={true}
                            playsinline={true}
                            // onReady={true}
                            width="85%"
                            height="90%"
                        />
                    </div>
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

                    <BidModalButton auctionId={id} propertyId={propertyId} propertyObject={data} />
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
            </div> */}
        </>
    );
};

export default AuctionDetail;
