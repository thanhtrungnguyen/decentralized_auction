import styles from "../../../styleCss/stylesComponents/forManager/rejectAuction.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const RejectAuction = ({ auctionId, propertyId }) => {
    const axios = useAxiosPrivate();

    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [comment, setComment] = useState(null);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "comment") {
            setComment(value);
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
        if (!comment.trim()) {
            notify("🦄 comment is empty");
        } else {
            console.log(propertyId);
            axios
                .patch(
                    `http://localhost:5000/api/auction/reject/${auctionId}`,
                    {
                        message: comment,
                        status: "Rejected",
                        property: propertyId,
                    },
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    //navigate("/listBidders");
                    navigate("/auctionListForManager");
                    setExpanded(false);
                })
                .catch((err) => {
                    notify(`🦄 Failed: ${err.response.data.message}, ${err}`);
                });
        }
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
