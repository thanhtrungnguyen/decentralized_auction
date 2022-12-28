import styles from "../../styleCss/stylesPages/forManagers/addCategory.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
// import { Outlet, Link } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";
const EditCategory = () => {
    const [categoryName, setCategoryName] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();

    const baseURL = `http://localhost:8800/api/category/getById/${id}`;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                console.log(resp.data);
                console.log("axios get");
                setData(resp.data);
            });

            if (getUser() != null) {
                setRole(getUser().role);
            } else {
                setRole("");
            }

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);

    const Cancel = (e) => {
        navigate("/managerCategorys");
    };
    const handleSubmit = (event) => {
        axios
            .put(
                `http://localhost:8800/api/category/update/${id}`,
                { categoryName: categoryName },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert("Update Successful");
                navigate("/managerCategorys");
            });
        event.preventDefault();
    };
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
            {" "}
            {(() => {
                if (role === "BIDDER" || role === "SELLER" || role === "MANAGER" || role === "ADMIN") {
                    return <HeaderUser username={getUser().userName} />;
                } else {
                    return <Header />;
                }
            })()}{" "}
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarSeller />
                    <div className={styles.detail}>
                        <label className={styles.title}>Edit Category</label>
                        <label className={styles.txt}>Category Name</label>
                        <input
                            type="text"
                            pattern="^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,10}$"
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className={styles.input}
                            defaultValue={data.records[0].Name}
                            required
                        ></input>
                    </div>
                    <div className={styles.btn}>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={Cancel}></input>{" "}
                        <input type="submit" value="Save" className={styles.btnSave} disabled={categoryName === null ? true : false}></input>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default EditCategory;
