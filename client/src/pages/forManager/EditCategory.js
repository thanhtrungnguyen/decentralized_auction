import styles from "../../styleCss/stylesPages/forManagers/addCategory.module.css";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import { ToastContainer, toast } from "react-toastify";

const EditCategory = () => {
    const axios = useAxiosPrivate();
    const [categoryName, setCategoryName] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState();

    const baseURL = `/category/${id}`;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                console.log(resp.data);
                //console.log("axios get");
                setCategoryName(resp.data.category.name);
                setStatus(resp.data.category.status);
            });

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);

    const Cancel = (e) => {
        navigate("/managerCategories");
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
    const [disable, setDisable] = useState(false);

    const handleSubmit = (event) => {
        if (!categoryName.trim()) {
            notify("🦄 categoryName is empty");
        } else {
            setDisable(true);

            axios
                .patch(
                    `/category/update/${id}`,
                    { name: categoryName, status: status },
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    console.log(res);
                    setDisable(false);
                    console.log(res.data);
                    alert("Update Successful");
                    navigate("/managerCategories");
                })
                .catch((err) => {
                    setDisable(false);

                    notify(`🦄 Failed: ${err.response.data.message} , ${err}`);
                });
        }
        event.preventDefault();
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "categoryName") {
            setCategoryName(value);
        }
        if (id === "status") {
            setStatus(value);
        }
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
                            pattern="^[a-zA-Z\s]{0,10}"
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={(e) => handleInputChange(e)}
                            className={styles.input}
                            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                            required
                        ></input>
                        <select id="status" className={styles.dropdown} onChange={(e) => handleInputChange(e)} placeholder="Gender" value={status}>
                            <option value="true">Activate</option>
                            <option value="false">Deactivate</option>
                        </select>
                    </div>
                    <div className={styles.btn}>
                        <button
                            className={styles.btnCancel}
                            onClick={() => {
                                navigate("/managerCategories");
                            }}
                            disabled={disable}
                        >
                            Cancel
                        </button>
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
export default EditCategory;
