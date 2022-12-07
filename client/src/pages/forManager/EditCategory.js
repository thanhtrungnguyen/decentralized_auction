import styles from "../../styleCss/stylesPages/forManagers/addCategory.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditCategory = () => {
    const [cagetoryName, setCategoryName] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);

    const baseURL = "http://localhost:8800/api/property/${id}";
    useEffect(() => {
        axios.get(baseURL).then((resp) => {
            console.log(resp.data);
            console.log("axios get");
            setData(resp.data);
        });
    }, [baseURL]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "propertyImage") {
            setCategoryName(value);
        }
    };
    const handleSubmit = (event) => {
        axios
            .put("http://localhost:8800/api/cagetory", cagetoryName, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                navigate("/managerCategorys");
            });
        event.preventDefault();
    };
    return (
        <>
            {" "}
            <Header />
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarSeller />
                    <div className={styles.detail}>
                        <label className={styles.title}>Edit Category</label>
                        <label className={styles.txt}>Category Name</label>
                        <input
                            type="text"
                            placeholder="Enter category name"
                            value={cagetoryName}
                            onChange={(e) => handleInputChange(e)}
                            className={styles.input}
                            defaultValue={data.cagetoryName}
                            required
                        ></input>
                    </div>
                    <div className={styles.btn}>
                        <input type="button" value="Cancel" className={styles.btnCancel}></input>{" "}
                        <input type="submit" value="Save" className={styles.btnSave}></input>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default EditCategory;
