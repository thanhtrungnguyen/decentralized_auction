import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useFetch } from "../../../hook/useFetch";
const BanedBidder = ({ idBidder }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [loading,setLoading] = useState(true);
    const handleSubmit = (event) => {
        console.log(idBidder);
        setLoading(true);
        axios
            .put(`http://localhost:8800/api/user/changeStatus/${idBidder}`, idBidder, {
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
                        <label className={styles.title}>Ban Bidder</label>
                        <br />
                        <label className={styles.txt}>Are you sure about ban this bidder?</label>
                        <br />

                        <input type="submit" value="OK" className={styles.btnOK}></input>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default BanedBidder;
