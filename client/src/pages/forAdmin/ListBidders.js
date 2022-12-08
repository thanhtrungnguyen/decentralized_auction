import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import BanedBidder from "../../components/popups/forAdmin/BanBidder";
import ActiveBidder from "../../components/popups/forAdmin/ActiveBidder";
import { useFetchPagination } from "../../hook/useFetch";
import Loading from "../../components/loading/Loading";

const ListBidders = () => {
    const [page, setPage] = React.useState(1);

    const [email, setEmail] = useState(null);
    const [status, setStatus] = useState("Active");
    const [status2, setStatus2] = useState("Baned");
    const navigate = useNavigate();
    const baseURL = `http://localhost:8800/api/user/BIDDER/${page}`;

    const {data, loading, error } = useFetchPagination(baseURL, page);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
        }
    };
    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append("email", email);

        axios
            .get("http://localhost:8800/api/bidder", formData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                // setData(res.data);

                navigate("/listBidders");
            });
        event.preventDefault();
    };
    const handleChange = (event, value) => {
        setPage(value);
    };

    return loading ? (
        <Loading/>
    ) : (
        <>
            <Header />
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <div className={styles.content}>
                        <div className={styles.search}>
                            <div className={styles.floatLeft}>
                                <p className={styles.title}>Search</p>
                                <input
                                    id="email"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                ></input>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <input className={styles.btn} type="submit" value="Search"></input>
                            <input className={styles.btnReset} type="button" value="Reset"></input>
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <Link className={styles.bold} to="/listSellers">
                                All
                            </Link>
                            <Link className={styles.link} to="/">
                                Activite{" "}
                            </Link>
                            <Link className={styles.link} to="/">
                                Baned
                            </Link>

                            <hr />
                            <p className={styles.txtBold}>Total Bidder: {data.total}</p>

                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Full Name</th>
                                    <th className={styles.th}>Email</th>
                                    <th className={styles.th}>Phone</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {data.listUser.map((item) => (
                                    <tr>
                                        <td className={styles.td}>{item.Name}</td>
                                        <td className={styles.td}>{item.Email__c}</td>
                                        <td className={styles.td}>{item.Phone__c}</td>
                                        <td className={styles.td}>{item.User_Id__r.Status__c }</td>
                                        <td className={styles.td}>
                                            <Link className={styles.linkBlue} to={`/bidderDetail/${item.id}`}>
                                                View
                                            </Link>
                                            {(() => {
                                                if (item.User_Id__r.Status__c === "Activate") {
                                                    return (
                                                        <Popup trigger={<label className={styles.linkBlue}>Deactivate</label>} position="right center">
                                                            <BanedBidder idBidder={item.User_Id__c} />
                                                        </Popup>
                                                    );
                                                } else {
                                                    return (
                                                        <Popup trigger={<label className={styles.linkBlue}>Activate</label>} position="right center">
                                                            <ActiveBidder idBidder={item.User_Id__c} />
                                                        </Popup>
                                                    );
                                                }
                                            })()}
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <div>
                                <Pagination className={styles.pagi} count={Math.floor(data.total/10)+1} page={page} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default ListBidders;
