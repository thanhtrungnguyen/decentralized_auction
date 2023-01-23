import styles from "../../styleCss/stylesPages/forManagers/addCategory.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarManager";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
// import { Outlet, Link } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
const AddCategory = () => {
    const axios = useAxiosPrivate();
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
        setLoading(false);
    }, []);
    const [categoryName, setCategoryName] = useState(null);
    const navigate = useNavigate();
    // const baseURL = "http://localhost:8800/api/property/";
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "categoryName") {
            setCategoryName(value);
        }
    };
    const handleSubmit = (event) => {
        axios
            .post(
                `/category/create`,
                { name: categoryName },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                alert("Add Category Successful");
                navigate("/managerCategories");
            })
            .catch((err) => {
                // console.log(err.response.data.mess);
                alert(`${err.response.data.mess}, ${err} `);
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
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarSeller />
                    <Time />
                    <div className={styles.detail}>
                        <label className={styles.title}>Add a New Category</label>
                        <label className={styles.txt}>Category Name</label>
                        <input
                            id="categoryName"
                            type="text"
                            pattern="^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,10}$"
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={(e) => handleInputChange(e)}
                            className={styles.input}
                            required
                        ></input>
                    </div>
                    <div className={styles.btn}>
                        <button
                            className={styles.btnCancel}
                            onClick={() => {
                                navigate("/managerCategories");
                            }}
                        >
                            Cancel
                        </button>{" "}
                        <input type="submit" value="Save" className={styles.btnSave} disabled={categoryName === null ? true : false}></input>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddCategory;
