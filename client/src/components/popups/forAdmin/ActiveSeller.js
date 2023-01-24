import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../hooks/useAxiosPrivate";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const ActiveSeller = ({ idSeller }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const axios = useAxiosPrivate();
    const handleSubmit = (event) => {
        console.log(idSeller);
        axios
            .patch(`/user/changeStatus/${idSeller}/true`, {
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
                        <label className={styles.title}>Active Seller</label>
                        <br />
                        <label className={styles.txt}>Are you sure about active this seller?</label>
                        <br />

                        <input type="submit" value="OK" className={styles.btnOK}></input>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default ActiveSeller;
