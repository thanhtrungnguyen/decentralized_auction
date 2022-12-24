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
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import io from "socket.io-client";
import Loading from "../../components/loading/Loading";

const AuctionList = () => {
    const [page, setPage] = React.useState(1);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const socket = io.connect("http://localhost:8800");
    //const baseURL = "http://localhost:8800/api/auction/";
    const [status, setStatus] = useState(null);
    const [sort, setSort] = useState(1);
    const [price, setPrice] = useState(null);
    const [name, setName] = useState(null);
    const [name2, setName2] = useState(null);
    const [checkedState, setCheckedState] = useState([false, false, false])
    const baseURLAuction = `http://localhost:8800/api/auction/filter/${page}/${status}/${price}/${sort}/${name}`;
    const statusList = [
        { name: "Auction Upcoming", value: 2 },
        { name: "Auction Bidding", value: 3 },
        { name: "Auction Closed", value: 4 },
    ]
    // useEffect(() => {
    //     axios.get(baseURL).then((resp) => {
    //         console.log(resp.data);
    //         console.log("axios get");
    //         setData(resp.data);
    //         socket.off();
    //     });
    // }, [status]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURLAuction).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setData(resp.data);
            });
            setLoading(false);
        }
        fetchData();

    }, [baseURLAuction]);
    socket.on("data", (item) => {
        if (item != status) {
            setStatus(data);
            console.log(item);
        }
    })
    const handleSubmit = (event) => {
        name2 === '' ? setName(null):setName(name2);
        setPage(1);
        event.preventDefault();
    };
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleChangeStatus = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        const total = updatedCheckedState.reduce(
            (sum, currentState,index) => {
                if (currentState === true) {
                    return sum + statusList[index].value;
                }
                return sum;
            },
            null
        )
        setStatus(total);
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
                if (getUser().role == "BIDDER") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}
            <NavBar />

            <div className={styles.nav}>
                <label className={styles.txtTitle}>Artwork & Upcoming Auction</label>
                <div className={styles.floatRight}>
                    <label className={styles.txtBlue}>Sort by:</label>
                    <select id="language" className={styles.select} onChange={(e) => setSort(e.target.value)}>
                        <option value="1" selected={sort === '1'}>All</option>
                        <option value="2" selected={sort === '2'}>Starting Price: Low to High</option>
                        <option value="3" selected={sort === '3'}>Starting Price: High to Low</option>

                    </select>
                    <label className={styles.txtBlue}>Search:</label>
                    <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search" className={styles.ip} value={name2} onChange={(e) => setName2(e.target.value)} />
                    <button className={styles.btnSearch} type='submit'>Search</button>
                    </form>
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
                    <p className={styles.txtBlueBold}>Filter By Status</p>
                    <hr className={styles.hr} />
                    <form>
                        <div>
                            {statusList.map(({ name, value }, index) => {
                                return (
                                    <>
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={name}
                                                value={value}
                                                checked={checkedState[index]}
                                                onChange={() => handleChangeStatus(index)}
                                            />
                                            <label htmlFor={`custom-checkbox-${index}`} className={styles.txtNormal}>{name}</label>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </form>
                    <p className={styles.txtBlueBold}>Filter By Starting Price</p>
                    <hr className={styles.hr} />
                    <form>
                        <div>
                            <input type="checkbox" name="type" id="1price" value={'1'} checked={price==='1'} onChange={((e)=>price===e.target.value?setPrice(null):setPrice(e.target.value))}/>
                            <label for="1price" className={styles.txtNormal}>
                                0 ETH - 0.25 ETH
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="2price" value={'2'} checked={price==='2'} onChange={((e)=>price===e.target.value?setPrice(null):setPrice(e.target.value))} />
                            <label for="2price" className={styles.txtNormal}>
                                0.25 ETH - 0.5 ETH
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="3price" value={'3'} checked={price==='3'} onChange={((e)=>price===e.target.value?setPrice(null):setPrice(e.target.value))} />
                            <label for="3price" className={styles.txtNormal}>
                                0.5 ETH - 0.75 ETH
                            </label>
                        </div>
                        <div>
                            <input type="checkbox" name="type" id="4price" value={'4'} checked={price==='4'} onChange={((e)=>price===e.target.value?setPrice(null):setPrice(e.target.value))} />
                            <label for="4price" className={styles.txtNormal}>
                                0.75 ETH+
                            </label>
                        </div>
                    </form>
                </div>
            </section>
            <section id="products">
                <div className={styles.products}>
                    {data.auctionlist.map((auction) => (
                        <div className={styles.product}>
                            <div>
                                <img className={styles.img} src="https://image.thanhnien.vn/w1024/Uploaded/2022/ywfsm/2019_09_07/10_xfvb.jpg" />
                            </div>
                            <div>
                                <p className={styles.txtBlueB}>{auction.Auctions1__r.records[0].Name}</p>

                                <p className={styles.txtDes}>{auction.Auctions1__r.records[0].Status__c}</p>

                                <div>
                                    <p className={styles.txtBlueB}>{auction.Property_Information__c}</p>
                                    <div>
                                        <label className={styles.txtBlueB}>Starting Price:</label>
                                        <label className={styles.txtBlueB}>{auction.Start_Bid__c}</label>
                                    </div>
                                    <br />
                                    <div>
                                        <Link className={styles.link} to={`/auctiondetail/${auction.Auctions1__r.records[0].Id}/${auction.Id}`}>
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div>
                        <Pagination className={styles.pagi} count={Math.floor(data.total / 5) + 1} page={page} onChange={handleChange} hidden={data.total===0}/>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AuctionList;
