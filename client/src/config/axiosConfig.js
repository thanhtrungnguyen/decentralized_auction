import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";
axios.defaults.headers.common = { Authorization: `Bearer  + ${accessToken}` };

export default axios;
