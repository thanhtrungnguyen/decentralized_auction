import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL || "";
// export const BASE_URL = "";

export default axios.create({
    baseURL: `${BASE_URL}/api`,
});

export const axiosPrivate = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
