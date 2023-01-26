import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/auctionList.module.css";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { Link } from "react-router-dom";
// import Popup from "reactjs-popup";
// import PlaceABid from "../../components/popups/PlaceABid";
import Pagination from "@mui/material/Pagination";
import HeaderUser from "../../components/header/HeaderUser";

import io from "socket.io-client";
import Loading from "../../components/loading/Loading";
import PageName from "../../components/header/PageName";
import { AiOutlineSearch, AiOutlineFieldTime } from "react-icons/ai";
import MultiRangeSlider from "multi-range-slider-react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
const AuctionList = () => {
    const axios = useAxiosPrivate();
    const navigate = useNavigate();
    // const [buttonPopup, setButtonPopup] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const socket = io.connect("http://localhost:5000");
    //const baseURL = "http://localhost:8800/api/auction/";

    const [price, setPrice] = useState(null);
    const [name, setName] = useState(null);
    const [name2, setName2] = useState(null);
    const [checkedState, setCheckedState] = useState([false, false, false]);

    const [change, setChange] = useState(null);

    const [auctions, setAuctions] = useState([]);

    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("all");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState(1);
    const [categories, setCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);
    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(100);

    useEffect(() => {
        axios.get("category/categories").then((resp) => {
            setCategories(resp.data.categories);
        });
    }, []);

    const baseURLAuction = `/auction/auctions/bidder?page=${page}&status=${status}&search=${search}&sort=${sort}&category=${filterCategories}&minValue=${minValue}&maxValue=${maxValue}`;
    const handleInput = (e) => {
        const { id, value } = e.target;
        if (id === "minValue") {
            set_minValue(value);
        }
        if (id === "maxValue") {
            set_maxValue(value);
        }
    };

    const [role, setRole] = useState();

    useEffect(() => {
        if (loading) {
            fetchPostList();
        } else {
            fetchDataStatus();
        }
    }, [baseURLAuction, change]);
    async function fetchPostList() {
        setLoading(true);

        await axios.get(baseURLAuction).then((resp) => {
            setAuctions(resp.data.auctions);
            console.log(resp.data.auctions);
            // socket.off();
        });

        setLoading(false);
    }
    const fetchDataStatus = async () => {
        await axios.get(baseURLAuction).then((resp) => {
            setAuctions(resp.data.auctions);
            console.log(resp.data);
            console.log("axios get");
            // socket.off();
        });
    };
    socket.on("data", (item) => {
        if (item !== change) {
            setChange(item);
        }
    });
    const handleSubmit = (event) => {
        name2 === "" ? setName(null) : setName(name2);
        setPage(1);
        event.preventDefault();
    };
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleChangeStatus = (event) => {
        if (event.target.checked) {
            const state = [...filterCategories, event.target.value];
            setFilterCategories(state);
        } else {
            const state = filterCategories.filter((item) => item !== event.target.value);
            setFilterCategories(state);
        }
    };
    const handleApplyFilter = () => {};

    const handleSort = (e) => {
        setSort(e.target.value);
        setPage(1);
    };
    function exportData(data) {
        return (
            <>
                {data.listAuction.map((item) => (
                    <div className={styles.auction}>
                        <img className={styles.img} src={`${item.property.mediaUrl[0]}`} alt="img" />
                        <p className={styles.name}>{item.name}</p>
                        <p className={styles.price}>{item.property.startBid} ETH</p>
                        <p className={styles.status}>Status: {item.status} </p>
                        <p className={styles.time}>
                            <AiOutlineFieldTime className={styles.i} />
                            <label className={styles.l}>
                                Registration time: {moment(item.startRegistrationTime).format("L")},{" "}
                                {moment(item.startRegistrationTime).format("LTS")} - {moment(item.endRegistrationTime).format("L")},{" "}
                                {moment(item.endRegistrationTime).format("LTS")}
                            </label>
                        </p>
                        <p className={styles.time}>
                            <AiOutlineFieldTime className={styles.i} />
                            <label className={styles.l}>
                                Registration time: {moment(item.startAuctionTime).format("L")}, {moment(item.startAuctionTime).format("LTS")} -{" "}
                                {moment(item.endAuctionTime).format("L")}, {moment(item.endAuctionTime).format("LTS")}
                            </label>
                        </p>
                        <br />
                        <br />
                        <br />

                        <button
                            className={styles.btnDetail}
                            onClick={() => {
                                navigate(`/auctionDetail/${item._id}`);
                            }}
                        >
                            Detail
                        </button>
                    </div>
                ))}
            </>
        );
    }
    return loading ? (
        <Loading />
    ) : (
        <>
            <Header />
            <NavBar />
            <PageName pageName={"Auction List"} link={"auctionList"} home={"homePage"} />

            <div className={styles.container}>
                <div className={styles.nav}>
                    <div className={styles.conSearch}>
                        <input className={styles.ip} type="text" placeholder="Enter keyword" value={search}></input>
                        <AiOutlineSearch className={styles.icon} />
                    </div>
                    <div className={styles.category}>
                        <p className={styles.title}>Category</p>
                        {categories.map((item) => {
                            return (
                                <>
                                    <label className={styles.label}>{item.name}</label>
                                    <input type="checkbox" className={styles.checkbox} value={item.name} onChange={handleChangeStatus} />
                                    {/* <label className={styles.num}>{categories.categories.length}</label> */}
                                    <br />
                                    <br />
                                </>
                            );
                        })}
                    </div>
                    <div className={styles.category}>
                        <p className={styles.title}>Start Bid (ETH)</p>
                        <label className={styles.label}>From: </label>
                        <input
                            id="minValue"
                            value={minValue}
                            type="number"
                            className={styles.ranger}
                            onChange={(e) => {
                                handleInput(e);
                            }}
                        ></input>
                        <label className={styles.label}>To: </label>
                        <input
                            type="number"
                            id="maxValue"
                            value={maxValue}
                            className={styles.ranger}
                            onChange={(e) => {
                                handleInput(e);
                            }}
                        ></input>
                        {/* <p className={styles.label}>
                            Ranger: {minValue}ETH - {maxValue}ETH
                        </p> */}
                        {/* <MultiRangeSlider
                            className={styles.m}
                            min={0}
                            max={100}
                            step={5}
                            minValue={minValue}
                            maxValue={maxValue}
                            onInput={(e) => {
                                handleInput(e);
                            }}
                        /> */}
                        <br />
                    </div>
                    <div className={styles.category}>
                        <p className={styles.title}>Status</p>
                        <label className={styles.label}>Upcoming </label>
                        <input type="checkbox" className={styles.checkbox} value="" />
                        {/* <label className={styles.num}>2</label> */}
                        <br />
                        <br />
                        <label className={styles.label}>Current Auction</label>
                        <input type="checkbox" className={styles.checkbox} value="" />
                        {/* <label className={styles.num}>2</label> */}
                        <br />
                        <br />
                        <label className={styles.label}>Past Auction</label>
                        <input type="checkbox" className={styles.checkbox} value="" />
                        {/* <label className={styles.num}>2</label> */}
                        <br />
                        <br />
                        <label className={styles.label}>All</label>
                        <input type="checkbox" className={styles.checkbox} value="" />
                        {/* <label className={styles.num}>2</label> */}
                        <br />
                        <br />
                    </div>
                    <div className={styles.category}>
                        <button className={styles.btn} onClick={handleApplyFilter}>
                            Apply
                        </button>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.info}>
                        <label className={styles.label2}>13 Items</label>
                        <label className={styles.label3}>Sort By</label>
                        <select className={styles.select} onChange={(e) => handleSort(e)}>
                            <option value="0" selected={sort === "0"}>
                                All
                            </option>
                            <option value="1" selected={sort === "1"}>
                                Start Bid Ascending
                            </option>
                            <option value="2" selected={sort === "2"}>
                                Start Bid Descending
                            </option>
                            {/* <option value="3" selected={sort === "4"}>
                                Registration Time Ascending
                            </option>
                            <option value="3" selected={sort === "5"}>
                                Registration Time Descending
                            </option>
                            <option value="3" selected={sort === "6"}>
                                Newest
                            </option> */}
                        </select>
                    </div>
                    <div className={styles.auctions}>{exportData(auctions)}</div>
                    <Pagination
                        className={styles.pagi}
                        hidden={auctions.count === 0 ? true : false}
                        count={Math.ceil(auctions.count / 5)}
                        page={page}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* <div className={styles.nav}>
                <label className={styles.txtTitle}>Artwork & Upcoming Auction</label>
                <div className={styles.floatRight}>
                    <label className={styles.txtBlue}>Sort by:</label>
                    <select id="language" className={styles.select} onChange={(e) => handleSort(e)}>
                        <option value="1" selected={sort === "1"}>
                            All
                        </option>
                        <option value="2" selected={sort === "2"}>
                            Starting Price: Low to High
                        </option>
                        <option value="3" selected={sort === "3"}>
                            Starting Price: High to Low
                        </option>
                    </select>
                    <label className={styles.txtBlue}>Search:</label>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Search" className={styles.ip} value={name2} onChange={(e) => setName2(e.target.value)} />
                        <button className={styles.btnSearch} type="submit">
                            Search
                        </button>
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
                                            <label htmlFor={`custom-checkbox-${index}`} className={styles.txtNormal}>
                                                {name}
                                            </label>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </form>
                    <p className={styles.txtBlueBold}>Filter By Starting Price</p>
                    <hr className={styles.hr} />
                    <form>
                        <div>
                            <input
                                type="checkbox"
                                name="type"
                                id="1price"
                                value={"1"}
                                checked={price === "1"}
                                onChange={(e) => (price === e.target.value ? setPrice(null) : setPrice(e.target.value))}
                            />
                            <label for="1price" className={styles.txtNormal}>
                                0 ETH - 0.25 ETH
                            </label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="type"
                                id="2price"
                                value={"2"}
                                checked={price === "2"}
                                onChange={(e) => (price === e.target.value ? setPrice(null) : setPrice(e.target.value))}
                            />
                            <label for="2price" className={styles.txtNormal}>
                                0.25 ETH - 0.5 ETH
                            </label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="type"
                                id="3price"
                                value={"3"}
                                checked={price === "3"}
                                onChange={(e) => (price === e.target.value ? setPrice(null) : setPrice(e.target.value))}
                            />
                            <label for="3price" className={styles.txtNormal}>
                                0.5 ETH - 0.75 ETH
                            </label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="type"
                                id="4price"
                                value={"4"}
                                checked={price === "4"}
                                onChange={(e) => (price === e.target.value ? setPrice(null) : setPrice(e.target.value))}
                            />
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
                                <img
                                    src={`http://localhost:8800/api/auction/images/${auction.Properties_Media__r.records[0].Name}`}
                                    className={styles.img}
                                    alt="Thumb"
                                />
                            </div>
                            <div>
                                <p className={styles.txtBlueB}>{auction.Auctions1__r.records[0].Name}</p>

                                <p className={styles.txtDes}>
                                    {auction.Auctions1__r.records[0].Status__c === 'Approved' ? 'Upcoming for Registration Time' :
                                        auction.Auctions1__r.records[0].Status__c === 'RegistrationTime' ? 'Registration Time' :
                                            auction.Auctions1__r.records[0].Status__c === 'UpcomingForBid' ? 'Upcoming for Auction time' :
                                                auction.Auctions1__r.records[0].Status__c === 'Bidding' ? 'Auction time' :
                                                    auction.Auctions1__r.records[0].Status__c === 'Closed' ? 'Auction Ended' :
                                                        'Auction Ended'
                                    }
                                </p>

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
                        <Pagination
                            className={styles.pagi}
                            count={(data.total % 5) > 0 ? (Math.floor(data.total / 5) + 1) : (data.total / 5)}
                            page={page}
                            onChange={handleChange}
                            hidden={data.total === 0}
                        />
                    </div>
                </div>
            </section> */}

            <Footer />
        </>
    );
};

export default AuctionList;
