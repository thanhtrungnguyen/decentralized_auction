import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../../hooks/useAxiosPrivate";
const PublicNews = ({ idNews }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);

    const handleSubmit = (event) => {
        console.log(idNews);
        axios
            .put(
                `/news/changeStatus/${idNews}`,
                { status: "Activate" },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                //alert(res.data.message);
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
                        <label className={styles.title}>Public News</label>
                        <br />
                        <label className={styles.txt}>Are you sure about public this news?</label>
                        <br />

                        <input type="submit" value="OK" className={styles.btnOK}></input>
                        <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                    </form>
                </div>
            ) : null}
        </>
    );
};
export default PublicNews;
