import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import HeaderUser from "../../components/header/HeaderUser";

import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/stylesPages/hompage.module.css";

import { useEffect, useState } from "react";

import Loading from "../../components/loading/Loading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import FooterCopy from "../../components/footer/FooterCopy";
const HomePage = () => {
    const axios = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState([]);
    const [price, setPrice] = useState(null);
    const [sort, setSort] = useState(0);
    const [role, setRole] = useState();
    const [name, setName] = useState(null);
    const [dataAuction, setDataAuction] = useState([]);
    const [dataNews, setDataNews] = useState([]);
    const [minValue2, set_minValue2] = useState(0);
    const [maxValue2, set_maxValue2] = useState(100);
    const [search, setSearch] = useState(null);
    const [filterCategories, setFilterCategories] = useState([]);
    const perPage = 4;
    var statusNews = "Published";
    var title = null;
    var baseURL = `/news/news/${page}/Activate/null`;
    const baseURLAuction = `/auction/auctions/bidder?page=${page}&status=${status}&search=${search}&sort=${sort}&category=${filterCategories}&minValue=${minValue2}&maxValue=${maxValue2}`

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURLAuction).then((resp) => {
                //console.log(resp.data);
                // console.log("axios get");
                setDataAuction(resp.data.auctions.listAuction);
            });
            await axios.get(baseURL).then((resp) => {
                console.log(resp.data);
                // console.log("axios get");
                setDataNews(resp.data.news);
            });
            setLoading(false);
        };
        fetchData();
    }, [baseURLAuction]);
    console.log(dataNews)
    function exportAuction(data) {
        return (
            <>

            </>
        );
    }
    function exportNews(data) {
        return (
            <>
                {data?.listNews.map((item) => (
                    <div className={styles.col}>
                        <img className={styles.img2} src={item.avatar} alt="images" />
                        <p className={styles.txtImg}>{item.title}</p>
                        {/* <p className={styles.txtImgS}>More off this less hello samlande lied much over tightly circa horse taped mightly</p> */}
                        <Link className={styles.Link} to={`/viewNews/${item._id}`}>
                            Read more
                        </Link>
                    </div>
                ))}
            </>
        );
    }

    return loading ? (
        <Loading />
    ) : (
        <>
            {(() => {
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
                    return <HeaderUser username={""} />;
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

                        {/* {exportAuction(dataAuction)} */}
                        {dataAuction?.map((auction) => (
                            <div className={styles.col}>
                                <img
                                    className={styles.img2}
                                    src={auction?.property.mediaUrl[0]}
                                    alt="images"
                                />
                                <p className={styles.txtImg}>{auction?.name}</p>
                                <p className={styles.txtImgS}>Starting price : ${auction?.property.startBid}</p>
                                <Link className={styles.btnF} to={`/auctionDetail/${auction?._id}`}>
                                    Auction Now
                                </Link>
                            </div>
                        ))}
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
                        <div className={styles.tb}>{exportNews(dataNews)}</div>
                    </div>
                </div>
            </div>
            <Footer />
            <FooterCopy />
        </>
    );
};

export default HomePage;
