import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useFetch } from "../../../hooks/useFetch";
const DeleteProperty = ({ idProperty }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [loading, setLoading] = useState(true);
    const handleSubmit = (event) => {
        console.log(idProperty);
        setLoading(true);
        axios
            .put(`http://localhost:8800/api/user/DeleteProperty/${idProperty}`, idProperty, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);

                //navigate("/listBidders");
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
                alert(`Failed: ${err}`);
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
                        <label className={styles.title}>Delete Property</label>
                        <br />
                        <label className={styles.txt}>Are you sure about delete this property?</label>
                        <br />

                        <input type="submit" value="OK" className={styles.btnOK}></input>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default DeleteProperty;
