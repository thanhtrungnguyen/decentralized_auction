import styles from "../../../styleCss/stylesComponents/forManager/rejectAuction.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../hooks/useAxiosPrivate";
const RejectAuction = ({ idProperty }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [comment, setComment] = useState(null);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "comment") {
            setComment(value);
        }
    };
    const handleSubmit = (event) => {
        console.log(idProperty);
        axios
            .put(`/category/changeStatus/${idProperty}`, idProperty, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                //navigate("/listBidders");
                window.location.reload(false);
            });
        setExpanded(false);

        event.preventDefault();
    };
    const handCancel = () => {
        setExpanded(false);
    };
    return (
        <>
            {expanded ? (
                <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        <p className={styles.title}>Reject Auction</p>
                        <p className={styles.txt}>Comment</p>
                        <textarea id="comment" className={styles.textarea} onChange={(e) => handleInputChange(e)} value={comment} required></textarea>
                        <br />
                        <input type="submit" value="OK" className={styles.btnOK}></input>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default RejectAuction;
