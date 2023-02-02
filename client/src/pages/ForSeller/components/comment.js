import styles from "../../../styleCss/stylesComponents/forSeller/comments.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Popup from "reactjs-popup";
import Content from "./content";
import { useFetch } from "../../../hooks/useFetch";
const Comments = ({ propertyId }) => {
    const axios = useAxiosPrivate();
    const [show, setShow] = useState(false);
    const baseURL = `/auction/rejectmessage/${propertyId}`;
    const { data, loading, error } = useFetch(baseURL);
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
        event.preventDefault();
    };
    const click = () => {
        setShow(true);
    };
    return (
        <>
            <div className={styles.container}>
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
                <p className={styles.txt}>Reject History</p>
                <>
                    {data?.map((auction) => (
                        <div className={styles.content}>
                            <Popup trigger={<label className={styles.btnDetail}> Detail</label>} position="right center">
                                <Content />
                            </Popup>
                            <label>19:19, 02/06/2000</label>
                            <br />
                            <hr />
                            <label className={styles.lb}>{auction.message}</label>
                        </div>
                    ))}
                </>
            </div>
        </>
    );
};
export default Comments;
