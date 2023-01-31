import styles from "../../styleCss/stylesPages/forAdmin/AddNews.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBarAdmin";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
// import { Outlet, Link } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import HeaderUser from "../../components/header/HeaderUser";

import FooterCopy from "../../components/footer/FooterCopy";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams } from "react-router-dom";
//import { useFetch } from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import Time from "../../components/time/Time";
import { ToastContainer, toast } from "react-toastify";

const EditNew = () => {
    const axios = useAxiosPrivate();
    const { id } = useParams();
    const baseURL = `/news/${id}`;
    const [role, setRole] = useState();
    //const { data, loading, error } = useFetch(baseURL);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(baseURL).then((resp) => {
                setTitle(resp.data.news.title);
                setContent(resp.data.news.content);
                setData(resp.data.news);
                //setAvatar(resp.data.news.avatar);
            });

            setLoading(false);
        };
        fetchData();
    }, [baseURL]);

    // useEffect(() => {
    //     setTitle(data.title);
    //     setContent(data.content);
    //     if (getUser() != null) {
    //         setRole(getUser().role);
    //     } else {
    //         setRole("");
    //     }
    // }, []);

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
    const handleSubmit = (event) => {
        var idxDot = avatar.name.lastIndexOf(".") + 1;
        var extFile = avatar.name.substring(idxDot, avatar.length).toLowerCase();
        if (!title.trim()) {
            notify("🦄 title is empty");
        } else if (!content.trim()) {
            notify("🦄 content is empty");
        } else if (extFile !== "jpg" && extFile !== "jpeg" && extFile !== "png") {
            notify("🦄 Card Front Only jpg/jpeg and png files are allowed");
        } else {
            setDisable(true);

            const formData = new FormData();

            formData.append("title", title.trim());
            formData.append("content", content.trim());
            if (avatar !== null) {
                formData.append("avatar", avatar);
            }

            axios
                .patch(
                    `/news/update/${id}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    setDisable(false);

                    alert("Edit new successfully!!!");
                    navigate("/listNews");
                })
                .catch((err) => {
                    setDisable(false);

                    alert(`🦄 Failed: ${err.response.data.message} , ${err}`);
                });
        }
        event.preventDefault();
    };
    const cancel = () => {
        navigate("/listNews");
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
                    <div className={styles.content}>
                        <p className={styles.title}>Edit News</p>
                        <label className={styles.label}>Title</label>
                        <input id="title" className={styles.ip} type="text" value={title} onChange={(e) => handleInputChange(e)} required></input>
                        <br />
                        <br />
                        <br />
                        <br />
                        <label className={styles.label}>Avatar</label>
                        <input className={styles.file} id="avatar" type="file" accept="image/*" onChange={(e) => handleInputChange(e)} />
                        {avatar != null && <img src={URL.createObjectURL(avatar)} className={styles.image} alt="Thumb" />}

                        {avatar == null && <img src={`${data.avatar}`} className={styles.image} alt="Thumb" />}

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
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={cancel} disabled={disable}></input>
                        <input
                            type="submit"
                            value="Save Change"
                            className={styles.btnSubmit}
                            style={disable ? { backgroundColor: "red" } : { backgroundColor: "violet" }}
                            disabled={disable}
                        ></input>
                    </div>
                </div>
            </form>
        </>
    );
};
export default EditNew;
