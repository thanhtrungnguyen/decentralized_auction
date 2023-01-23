import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../hooks/useAxiosPrivate";
import { useFetch } from "../../../hooks/useFetch";
const RequestAddProperty = ({ idProperty }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [loading, setLoading] = useState(true);
    const handleSubmit = (event) => {
        console.log(idProperty);
        setLoading(true);
        axios
            .post(
                `http://localhost:5000/api/auction/create`,
                { propertyid: idProperty },
                {
                    withCredentials: true,
                }
            )
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
                        <label className={styles.title}>Request Add roperty</label>
                        <br />
                        <label className={styles.txt}>Are you sure request add this property?</label>
                        <br />

                        <input type="submit" value="OK" className={styles.btnOK}></input>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default RequestAddProperty;
