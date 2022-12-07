import Header from "../../components/header/HeaderUser";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/auctionList.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import PlaceABid from "../../components/popups/PlaceABid";
import Pagination from "@mui/material/Pagination";

const AuctionList = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const baseURL = "http://localhost:8800/api/auction/";

    useEffect(() => {
        axios.get(baseURL).then((resp) => {
            console.log(resp.data);
            console.log("axios get");
            setData(resp.data);
        });
    }, [baseURL]);
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    //   useEffect(()=>{
    //     const fetchData = async ()=>{
    //         setLoading(true);
    //         try {
    //             const res = await axios.get('http://localhost:8800/api/auction/');
    //             setData(res.data)
    //         } catch (error) {
    //             setError(error);
    //         }
    //         setLoading(false);
    //     };
    //     fetchData();
    //   },[]);

    return (
        <>
            <Header />
            <NavBar />

            <div className={styles.nav}>
                <label className={styles.txtTitle}>Artwork & Upcoming Auction</label>
                <div className={styles.floatRight}>
                    <label className={styles.txtBlue}>Sort by:</label>
                    <select id="language" className={styles.select}>
                        <option value="english">Best match</option>
                        <option value="vietnamese">Best match 1</option>
                        <option value="vietnamese">Best match 2</option>
                        <option value="vietnamese">Best match 3</option>
                    </select>
                    <label className={styles.txtBlue}>Search:</label>

                    <input type="text" placeholder="Search" className={styles.ip} />
                    <button className={styles.btnSearch}>Search</button>
                </div>
            </div>
            <section id="sidebar">
                <div className={styles.sidebar}>
                    <p className={styles.txtBlueBold}>Filter By Asset</p>
                    <hr className={styles.hr} />
                    <form>
                        <div>
                            <input type="checkbox" name="type" id="realestate" />
                            <label for="realestate" className={styles.txtNormal}>
                                Real estate
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="liquidation" />
                            <label for="liquidation" className={styles.txtNormal}>
                                Liquidation Assets
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="artwork" />
                            <label for="artwork" className={styles.txtNormal}>
                                Artwork
                            </label>
                        </div>
                    </form>
                    <p className={styles.txtBlueBold}>Filter By Statuses</p>
                    <hr className={styles.hr} />
                    <form>
                        <div>
                            <input type="checkbox" name="type" id="upcoming" />
                            <label for="upcoming" className={styles.txtNormal}>
                                Upconming
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="current" />
                            <label for="current" className={styles.txtNormal}>
                                Current auction
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="past" />
                            <label for="past" className={styles.txtNormal}>
                                Past auction
                            </label>
                        </div>
                    </form>
                    <p className={styles.txtBlueBold}>Filter By Starting Price</p>
                    <hr className={styles.hr} />
                    <form>
                        <div>
                            <input type="checkbox" name="type" id="1price" />
                            <label for="1price" className={styles.txtNormal}>
                                0 ETH - 10 ETH
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="2price" />
                            <label for="2price" className={styles.txtNormal}>
                                10 ETH - 50 ETH
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="3price" />
                            <label for="3price" className={styles.txtNormal}>
                                50 ETH - 100 ETH
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="4price" />
                            <label for="4price" className={styles.txtNormal}>
                                100 ETH+
                            </label>
                        </div>
                    </form>
                </div>
            </section>
            <section id="products">
                <div className={styles.products}>
                    {data.map((auction) => (
                        <div className={styles.product}>
                            <div>
                                <img className={styles.img} src="https://image.thanhnien.vn/w1024/Uploaded/2022/ywfsm/2019_09_07/10_xfvb.jpg" />
                            </div>
                            <div>
                                <p className={styles.txtBlueB}>{auction.Auctions1__r.records[0].Name}</p>

                                <p className={styles.txtDes}>{auction.Property_Information__c}</p>

                                <div>
                                    <p className={styles.txtBlueB}>Current auction</p>
                                    <div>
                                        <label className={styles.txtBlueB}>Start Bid:</label>
                                        <label className={styles.txtBlueB}>{auction.Auctions1__r.records[0].Start_Bid__c}</label>
                                    </div>
                                    <br />
                                    <div>
                                        <Link className={styles.link} to={`/auctiondetail/${auction.Auctions1__r.records[0].Id}`}>
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div>
                        <Pagination count={10} page={page} onChange={handleChange} />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AuctionList;
