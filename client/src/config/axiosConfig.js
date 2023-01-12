import axios from "axios";

const accessToken = localStorage.getItem("accessToken");
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
const axiosClient = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        'content-type': 'application/json',
        common: { Authorization: `Bearer ${accessToken}` }
    },
    //paramsSerializer: params => queryString.stringify(params),
});
// axios.defaults.baseURL = `${baseURL}/api`;
// axios.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };

export default axiosClient;
