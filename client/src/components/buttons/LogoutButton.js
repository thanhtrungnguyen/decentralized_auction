import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import useAuth from "../../hooks/useAuth";
import styles from "../../styleCss/stylesComponents/time.module.css";

export const LogoutButton = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleLogout = () => {
        axios
            .delete("/session")
            .then((response) => {
                setAuth({});
            })
            .then(navigate("/login"))
            .catch((error) => {
                console.log("Logout error:", error);
                alert("Ủa???");
            });
    };

    return (
        <button
            className={styles.label2}
            onClick={() => {
                handleLogout();
            }}
        >
            Log out
        </button>
    );
};
