import styles from "../../styleCss/stylesPages/forManagers/addCategory.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const AddCategory = () => {
    const [categoryName, setCategoryName] = useState(null);
    const navigate = useNavigate();
    const baseURL = "http://localhost:8800/api/property/";
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "categoryName") {
            setCategoryName(value);
        }
    };
    const handleSubmit = (event) => {
        axios
            .post(`http://localhost:8800/api/category`, {categoryName:categoryName}, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert('Add Category Successful');
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
    return (
        <>
            {" "}
            {(() => {
                if (getUser().role == "MANAGER") {
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
                        <label className={styles.title}>Add a New Category</label>
                        <label className={styles.txt}>Category Name</label>
                        <input
                            id="categoryName"
                            type="text"
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={(e) => handleInputChange(e)}
                            className={styles.input}
                            required
                        ></input>
                    </div>
                    <div className={styles.btn}>
                        <input type="button" value="Cancel" className={styles.btnCancel}></input>{" "}
                        <input type="submit" value="Save" className={styles.btnSave} disabled={categoryName===null?true:false}></input>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default AddCategory;
