import styles from "../../styleCss/stylesPages/forManagers/addCategory.module.css";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
const EditCategory = () => {
    const [categoryName, setCategoryName] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();

    const baseURL = `/category/getById/${id}`;
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
                `/category/update/${id}`,
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
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "categoryName") {
            setCategoryName(value);
        }
    };
    return !loading ? (
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
                                navigate("/managerCategorys");
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
export default EditCategory;
