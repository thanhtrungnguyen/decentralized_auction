import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";

export const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .delete("/session")
            .then((response) => {
                if (response.status === 201) {
                    // localStorage.setItem("accessToken", response.data.accessToken);
                    // localStorage.setItem("refreshToken", response.data.refreshToken);
                    localStorage.clear();
                }
            })
            .then(navigate("/login"))
            .catch((error) => {
                console.log("Logout error:", error);
                alert("Ủa???");
            });
    };

    return (
        <button
            onClick={() => {
                handleLogout();
            }}
        >
            Fucking Logout
        </button>
    );
};
