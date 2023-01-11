import styles from "../../styleCss/stylesPages/forAdmin/AddNews.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
// import { Outlet, Link } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderUser from "../../components/header/HeaderUser";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import FooterCopy from "../../components/footer/FooterCopy";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
const AddNews = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [role, setRole] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(getUser());

        // console.log(getUser().type);
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
        setLoading(false);
    }, []);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "title") {
            setTitle(value);
        }
        if (id === "content") {
            setContent(value);
        }
        if (id === "avatar") {
            setAvatar(e.target.files[0]);
        }
    };
    const handleSubmit = (event) => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("avatar", avatar);
        //console.log(formData.get("content"));
        axios
            .post(
                "http://localhost:5000/api/news/create",
                formData,
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert("Add new successfully!!!");
                navigate("/listNews");
            });
        event.preventDefault();
    };
    const cancel = () => {
        navigate("/listNews");
    };
    const getUser = () => {
        var users = null;
        const token = Cookies.get("access_token");
        if (!token) {
            console.log("Not authenticated");
        }
        jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
            users = user;
        });
        return users;
    };
    return loading ? (
        <Loading />
    ) : (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <SideBarAdmin />
                    <Time />
                    <div className={styles.content}>
                        <p className={styles.title}>Add News</p>
                        <label className={styles.label}>Title</label>
                        <input id="title" className={styles.ip} type="text" value={title} onChange={(e) => handleInputChange(e)} required></input>
                        <br />
                        <br />
                        <br />
                        <br />
                        <label className={styles.label}>Avatar</label>
                        <input className={styles.file} id="avatar" type="file" accept="image/*" onChange={(e) => handleInputChange(e)} required />
                        {avatar && <img src={URL.createObjectURL(avatar)} className={styles.image} alt="Thumb" />}
                        <br />
                        <br />
                        <br />
                        <br />
                        <label className={styles.label}>Content</label>

                        <div className={styles.ck}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log("Editor is ready to use!", editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                    console.log({ event, editor, data });
                                    console.log(content);
                                }}
                                onBlur={(event, editor) => {
                                    console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log("Focus.", editor);
                                }}
                                config={{
                                    ckfinder: {
                                        uploadUrl:
                                            "https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json",
                                    },
                                }}
                            />
                        </div>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={cancel}></input>
                        <input type="submit" value="Add News" className={styles.btnSubmit}></input>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddNews;
