import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const BanedSeller = ({ idSeller }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);

    const handleSubmit = (event) => {
        console.log(idSeller);
        axios
            .put(`http://localhost:8800/api/user/changeStatus/${idSeller}`, idSeller, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                alert(res.data.message);
                navigate("/listSellers");
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
                        <label className={styles.title}>Ban Seller</label>
                        <br />
                        <label className={styles.txt}>Are you sure about ban this seller?</label>
                        <br />

                        <input type="submit" value="OK" className={styles.btnOK}></input>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default BanedSeller;
