import styles from "../../styleCss/stylesPages/forAdmin/sellerDetail.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";
import { useFetch } from "../../hook/useFetch";
import { useParams } from "react-router-dom";

const ViewSeller = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const baseURL = `http://localhost:8800/api/user/${id}`;
    const [role, setRole] = useState();

    const navigate = useNavigate();
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
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(baseURL);
                setData(res.data);
            } catch (error) {
                setError(error);
            }

            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);
    const cancel = () => {
        navigate("/listSellers");
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
            <NavBar />
            <form>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <p className={styles.title}>Seller information</p>
                            <p className={styles.bold}>Organization information</p>
                            <p className={styles.txt}>Organization name</p>
                            <p className={styles.txt}>Tax Code</p>
                            <p className={styles.txt}>Tax code granted date</p>
                            <p className={styles.txt}>Tax code granted place</p>
                            <p className={styles.txt}>Specific Address</p>

                            <p className={styles.bold}>Basic Information</p>
                            <p className={styles.txt}>First Name</p>
                            <p className={styles.txt}>Last Name</p>
                            <p className={styles.txt}>Gender</p>
                            <p className={styles.txt}>Date of birth</p>
                            <p className={styles.txt}>Email address</p>
                            <p className={styles.txt}>Phone number</p>
                            <p className={styles.bold}>Address</p>
                            <p className={styles.txt}>Province/City</p>
                            <p className={styles.txt}>District</p>
                            <p className={styles.txt}>Wards</p>
                            <p className={styles.txt}>Specific address</p>
                            <p className={styles.bold}>Identity/Citizen Card</p>
                            <p className={styles.txt}>Card number</p>
                            <p className={styles.txt}>Card granted date</p>
                            <p className={styles.txt}>Card granted place</p>
                            <img
                                className={styles.img}
                                src={`http://localhost:8800/api/auction/images/${data.contact.Font_Side_Image__c}`}
                                alt="images"
                            />
                            {/* <img
              className={styles.img}
              src={`http://localhost:8800/api/auction/images/${data.cardFront}`}
              alt="images"
            /> */}
                            {/* <p className={styles.bold}>Account Information</p>
                            <p className={styles.txt}>Username</p>
                            <p className={styles.txt}>Password</p> */}
                        </div>
                        <div className={styles.right}>
                            <p className={styles.title}>.</p>

                            <p className={styles.bold}>.</p>

                            <p className={styles.txtR}>{data.account.Name}</p>

                            <p className={styles.txtR}>{data.account.Tax_Code__c}</p>

                            <p className={styles.txtR}>{data.account.Tax_Code_Granted_Date__c}</p>

                            <p className={styles.txtR}>{data.account.Tax_Code_Granted_Place__c}</p>

                            <p className={styles.txtR}>{data.account.Specific_Address__c}</p>
                            <p className={styles.bold}>.</p>

                            <p className={styles.txtR}>{data.contact.First_Name__c}</p>

                            <p className={styles.txtR}>{data.contact.Last_Name__c}</p>

                            <p className={styles.txtR}>{data.contact.Gender__c}</p>

                            <p className={styles.txtR}>{data.contact.Date_Of_Birth__c}</p>

                            <p className={styles.txtR}>{data.contact.Email__c}</p>

                            <p className={styles.txtR}>{data.contact.Phone__c}</p>

                            <p className={styles.bold}>.</p>

                            <p className={styles.txtR}>{data.contact.City__c}</p>

                            <p className={styles.txtR}>{data.contact.District__c}</p>

                            <p className={styles.txtR}>{data.contact.Wards__c}</p>

                            <p className={styles.txtR}>{data.contact.Address__c}</p>

                            <p className={styles.bold}>.</p>

                            <p className={styles.txtR}>{data.contact.Card_Number__c}</p>

                            <p className={styles.txtR}>{data.contact.Card_Granted_Date__c}</p>

                            <p className={styles.txtR}>{data.contact.Card_Granted_Place__c}</p>

                            <img
                                className={styles.img2}
                                src={`http://localhost:8800/api/auction/images/${data.contact.Back_Side_Image__c}`}
                                alt="images"
                            />
                            {/* <img
              className={styles.img2}
              src={`http://localhost:8800/api/auction/images/${data.cardBack}`}
              alt="images"
            /> */}
                            <p className={styles.bold}>.</p>
                            {/* <p className={styles.txtR}>wanjala</p> */}
                            {/* <p className={styles.txtR}>${data.username}</p> */}
                            <br/>
                            <br/>
                            {/* <p className={styles.txtR}>**********</p> */}
                            {/* <p className={styles.txtR}>${data.password}</p> */}
                            <input type="button" value="Back" className={styles.btnCancel} onClick={cancel}></input>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default ViewSeller;
