import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://20.205.108.122:5000";

export default axios.create({
    baseURL: `${BASE_URL}/api`,
});

export const axiosPrivate = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
