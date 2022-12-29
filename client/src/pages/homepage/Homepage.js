import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import HeaderUser from "../../components/header/HeaderUser";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/stylesPages/hompage.module.css";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../../components/loading/Loading";
import axios from "axios";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(5);
    const [price, setPrice] = useState(null);
    const [sort, setSort] = useState(1);
    const [role, setRole] = useState();
    const [name, setName] = useState(null);
    const [dataAuction, setDataAuction] = useState([]);
    const [dataNews, setDataNews] = useState([]);
    const perPage = 4;
    var statusNews = 'Published';
    var title = null;
    var baseURL = `http://localhost:8800/api/news/getAll/${page}/${statusNews}/${title}/${perPage}`;
    const baseURLAuction = `http://localhost:8800/api/auction/filter/${page}/${status}/${price}/${sort}/${name}`;


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURLAuction).then((resp) => {
                // console.log(resp.data);
                // console.log("axios get");
                setDataAuction(resp.data);
            });
            await axios.get(baseURL).then((resp) => {
                // console.log(resp.data);
                // console.log("axios get");
                setDataNews(resp.data);
            });
            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }
            setLoading(false);
        };
        fetchData();
    }, [baseURLAuction]);
    function exportAuction(data) {
        return <>
            {/* {data.auctionlist.map((auction) => (
                <div className={styles.col}>
                    <img className={styles.img2} src={`http://localhost:8800/api/auction/images/${auction.Properties_Media__r.records[0].Name}`} alt="images" />
                    <p className={styles.txtImg}>{auction.Auctions1__r.records[0].Name}</p>
                    <p className={styles.txtImgS}>Starting price : ${auction.Start_Bid__c}</p>
                    <Link className={styles.btnF} to={`/auctiondetail/${auction.Auctions1__r.records[0].Id}/${auction.Id}`}>
                        Auction Now
                    </Link>
                </div>
            ))} */}

        </>
    }
    function exportNews(data) {
        return <>
            {
            data.listNews.map((item) => (
                <div className={styles.col}>
                    {/* <img className={styles.img2} src={`http://localhost:8800/api/auction/images/${item.Avatar__c}`} alt="images" />
                    <p className={styles.txtImg}>{item.Name}</p>
                    {/* <p className={styles.txtImgS}>More off this less hello samlande lied much over tightly circa horse taped mightly</p> */}
                    <Link className={styles.Link} to={`/viewNews/${item.Id}`}>
                        Read more
                    </Link> 
                </div>
            ))
            }

        </>
    }

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

    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            {/* {getUser().role == "BIDDER" && <HeaderUser username={getUser().userName} />}
            {getUser().role != "BIDDER" && <Header />} */}

            <NavBar />
            <div>
                <div className={styles.banner}>
                    <div className={styles.col1}>
                        <p className={styles.txtRed}>Best recommendation for your collection....</p>
                        <p className={styles.txtTitle}>Latest collection trends 2022 </p>
                        <p className={styles.txtNormal}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                        </p>
                        <br />
                        <Link className={styles.btn} to="/auctionList">
                            Auction Now
                        </Link>
                    </div>
                    <div className={styles.col2}>
                        <img className={styles.img} src="https://antique.vn/wp-content/uploads/2021/03/IMG_20210223_162255-scaled.jpg" alt="images" />
                    </div>
                </div>
                <div className={styles.featured}>
                    <p className={styles.titleBule}>Featured Auctions</p>
                    <div className={styles.RelatedAuctions}>
                        <div className={styles.tb}>
                            {exportAuction(dataAuction)}
                        </div>
                    </div>
                </div>
                <div className={styles.banner2}>
                    <div className={styles.colL}>
                        <img className={styles.imgB} src="https://baodanang.vn/dataimages/202007/original/images1569003_12_1.jpg" alt="images" />
                    </div>
                    <div className={styles.colR}>
                        <p className={styles.titleBule}>
                            Unique Features Of leatest & <br />
                            Trending Auctions
                        </p>
                        <p className={styles.txtN}>- All frames constructed with hardwood solids and laminates</p>
                        <p className={styles.txtN}>- Reinforced with double wood dowels, glue, screw - nails corner blocks and machine nails </p>
                        <p className={styles.txtN}>- Arms, backs and seats are structurally reinforced </p>
                        <br />
                        <Link className={styles.btnF} to="/auctionList">
                            Auction Now
                        </Link>
                    </div>
                </div>
                <div className={styles.LeatestNew}>
                    <p className={styles.titleBule}>Leatest News</p>
                    <div className={styles.RelatedAuctions}>
                        <div className={styles.tb}>
                            {exportNews(dataNews)}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;
