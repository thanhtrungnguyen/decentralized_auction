import styles from "../../styleCss/stylesPages/forAdmin/addManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSeller = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "username") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    };
    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);

        axios
            .post("http://localhost:8800/api/addSeller", formData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                navigate("/listSellers");
            });
        event.preventDefault();
    };
    return (
        <>
            <Header />
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <div className={styles.content}>
                        <div className={styles.add}>
                            <label className={styles.title}>Add a New Seller</label>
                            <br />
                            <label className={styles.txt}>Username</label>
                            <input
                                id="username"
                                type="text"
                                className={styles.input}
                                value={username}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            <label></label>
                            <br />
                            <br />
                            <br />
                            <label className={styles.txt}>Password</label>
                            <input
                                id="password"
                                type="text"
                                className={styles.input}
                                value={password}
                                onChange={(e) => handleInputChange(e)}
                                required
                            ></input>
                            <br />
                            <input type="button" value="Cancel" className={styles.btnCancel}></input>
                            <input type="submit" value="Add Seller" className={styles.btnSubmit}></input>
                        </div>
                    </div>
                    <Footer />
                </div>
            </form>
        </>
    );
};
export default AddSeller;
