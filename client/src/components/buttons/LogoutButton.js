import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import styles from "../../styleCss/stylesComponents/time.module.css";

export const LogoutButton = () => {
    const axios = useAxiosPrivate();
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
            });
    };

    return (
        <label
            className={styles.label2}
            onClick={() => {
                handleLogout();
            }}
        >
            Log out
        </label>
    );
};
