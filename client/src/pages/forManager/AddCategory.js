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

import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import { ToastContainer, toast } from "react-toastify";

const AddCategory = () => {
    const axios = useAxiosPrivate();
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);

    const [categoryName, setCategoryName] = useState(null);
    const navigate = useNavigate();
    // const baseURL = "http://localhost:8800/api/property/";
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "categoryName") {
            setCategoryName(value);
        }
    };
    const notify = (message) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const handleSubmit = (event) => {
        if (!categoryName.trim()) {
            notify("🦄 categoryName is empty");
        } else {
            setDisable(true);

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
                    setDisable(false);
                    console.log(disable);
                    alert("Add Category Successful");
                    navigate("/managerCategories");
                })
                .catch((err) => {
                    // console.log(err.response.data.mess);
                    alert(`Failed: ${err.response.data.mess}, ${err} `);
                    setDisable(false);
                    console.log(disable);
                });
        }
        event.preventDefault();
    };

    return loading ? (
        <Loading />
    ) : (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarSeller />
                    <Time />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    {/* Same as */}
                    <ToastContainer />
                    <div className={styles.detail}>
                        <label className={styles.title}>Add a New Category</label>
                        <label className={styles.txt}>Category Name</label>
                        <input
                            id="categoryName"
                            type="text"
                            pattern="^[a-zA-Z\s]{1,}(?: [a-zA-Z\s]+){0,10}$"
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={(e) => handleInputChange(e)}
                            className={styles.input}
                            required
                        ></input>
                    </div>
                    <div className={styles.btn}>
                        <label
                            className={styles.btnCancel}
                            onClick={() => {
                                navigate("/managerCategories");
                            }}
                            disabled={disable}
                        >
                            Cancel
                        </label>{" "}
                        <input
                            type="submit"
                            value="Save"
                            className={styles.btnSave}
                            disabled={disable}
                            style={disable ? { backgroundColor: "red" } : {}}
                        ></input>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddCategory;
