import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

// const axiosClient = axios.create({
//     baseURL: `${baseURL}/api`,
//     headers: {
//         'content-type': 'application/json',
//         common: { Authorization: `Bearer ${accessToken}` }
//     },
//     //paramsSerializer: params => queryString.stringify(params),
// });

// axios.defaults.baseURL = `${baseURL}/api`;
// axios.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };

// axios.interceptors.request.use(
//     function (config) {
//         // Do something before request is sent
//         config.headers.Authorization = accessToken;
//         config.defaults.baseURL = `${baseURL}/api`;
//         return config;
//     },
//     function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//     }
// );

const axiosPrivate = axios.create({
    baseURL: `${baseURL}/api`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export default axiosPrivate;
