import axios from "axios";

export const Axios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api",
    timeout: 10000,
    headers: { Authorization: `Bearer  + ${"token"}` },
});
