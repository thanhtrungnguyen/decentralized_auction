import styles from "../../styleCss/stylesPages/forAdmin/addManager.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
// import { Outlet, Link } from "react-router-dom";
// import sPagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";

import FooterCopy from "../../components/footer/FooterCopy";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditManager = () => {
    const axios = useAxiosPrivate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("Male");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");
    const [message, setMessage] = useState("");
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(true);
    const type = "operator";
    const [data, setData] = useState([]);
    const { managerId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/informationOperator/getByUserId/${managerId}`);
                setData(res.data.result);
                setFirstName(res.data.result.firstName);
                setLastName(res.data.result.lastName);
                setPhone(res.data.result.phone);
                setEmail(res.data.result.email);
                setGender(res.data.result.gender);
                setSpecificAddress(res.data.result.address);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();

        // // console.log(getUser().type);

        // setLoading(false);
    }, []);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "username") {
            setUsername(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "rePassword") {
            setRePassword(value);
        }
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "gender") {
            setGender(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "phone") {
            setPhone(value);
        }
        if (id === "specificAddress") {
            setSpecificAddress(value);
        }
    };
    const notify = (message) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const [isExist, setIsExit] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [listUsername, setListUsername] = useState([]);
    const baseURL = `/user/users`;
    const handleSubmit = (event) => {
        axios.get(baseURL, { withCredentials: true }).then((resp) => {
            setListUsername(resp.data.users);
            listUsername.map((item) => {
                if (item.username === username) {
                    setIsExit(true);
                    console.log(item.username);
                } else {
                    setIsExit(false);
                }
                if (item.phone === phone) {
                    setCheckPhone(true);
                    console.log(item.phone);
                } else {
                    setCheckPhone(false);
                }
                if (item.email === email) {
                    setCheckEmail(true);
                    console.log(item.email);
                } else {
                    setCheckEmail(false);
                }
            });
        });
        if (!firstName.trim()) {
            notify("🦄 FirstName is empty");
        } else if (!lastName.trim()) {
            notify("🦄 LastName is empty");
        } else if (!gender) {
            notify("🦄 Gender is empty");
        } else if (!email.trim()) {
            notify("🦄 Email is empty");
        } else if (!phone.trim()) {
            notify("🦄 phone is empty");
        } else if (!specificAddress.trim()) {
            notify("🦄 specificAddress is empty");
        } else if (checkPhone) {
            notify("🦄 Phone is exist");
        } else if (checkEmail) {
            notify("🦄 Email is exist");
        } else if (rePassword != password) {
            notify("🦄 rePassword is not same password");
        } else {
            axios
                .patch(
                    `/informationOperator/update/${data._id}`,
                    {
                        // username: username.trim(),
                        // password: password.trim(),
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        phone: phone.trim(),
                        email: email.trim(),
                        gender: gender.trim(),
                        address: specificAddress.trim(),
                        type: type,
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    alert("Edit successfully!!!");
                    navigate("/listManagers");
                })
                .catch((err) => {
                    notify(`🦄 Create Failed: ${err.response.data.message} , ${err}`);
                });
        }

        event.preventDefault();
    };

    return loading ? (
        <Loading />
    ) : (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <Time />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    {/* Same as */}
                    <ToastContainer />
                    <div className={styles.add}>
                        <p className={styles.title}>Edit Manager</p>
                        <p className={styles.if}>Basic Information</p>
                        <p className={styles.txt}>First Name</p>
                        <input
                            className={styles.ip}
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            id="firstName"
                            value={firstName}
                            pattern="[a-zA-Z\s]{1,50}"
                        ></input>
                        <p className={styles.txt}>Last Name</p>
                        <input
                            className={styles.ip}
                            pattern="[a-zA-Z\s]{1,50}"
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            value={lastName}
                            id="lastName"
                        ></input>
                        <p className={styles.txt}>Gender</p>
                        <select id="gender" className={styles.ip} onChange={(e) => handleInputChange(e)} placeholder="Gender">
                            <option value="Male" selected={gender === "Male" ? true : false}>
                                Male
                            </option>
                            <option value="Female" selected={gender === "Female" ? true : false}>
                                Female
                            </option>
                            <option value="Other" selected={gender === "Other" ? true : false}>
                                Other
                            </option>
                        </select>
                        <p className={styles.txt}>Email</p>
                        <input
                            className={styles.ip}
                            type="email"
                            onChange={(e) => handleInputChange(e)}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            value={email}
                            id="email"
                        ></input>
                        <p className={styles.txt}>Phone</p>
                        <input
                            className={styles.ip}
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            id="phone"
                            value={phone}
                            pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                        ></input>
                        <p className={styles.txt}>Address</p>
                        <input
                            className={styles.ip}
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            value={specificAddress}
                            pattern="^\s*([^\s]\s*){0,300}$"
                            id="specificAddress"
                        ></input>
                        {/* <p className={styles.if}>Account Information</p>
                        <p className={styles.txt}>Username</p>
                        <input
                            className={styles.ip}
                            type="text"
                            onChange={(e) => handleInputChange(e)}
                            id="username"
                            pattern="?=.{6,20}$"
                            readOnly
                        ></input> */}

                        <label style={{ color: "red" }}>{message}</label>
                        <br />
                        <br />
                        <br />
                        <br />
                        <input className={styles.btnAdd} type="submit" value="Save"></input>
                        <button
                            className={styles.btnCancel}
                            onClick={() => {
                                navigate("/listManagers");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default EditManager;
