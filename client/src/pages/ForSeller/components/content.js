import styles from "../../../styleCss/stylesComponents/forSeller/comments.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Content = ({ auctionId, propertyId }) => {
    const axios = useAxiosPrivate();
    const [expanded, setExpanded] = useState(true);

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
    const handCancel = () => {
        setExpanded(false);
    };
    return (
        <>
            {expanded ? (
                <div className={styles.container2}>
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
                    <p className={styles.txt2}>Content</p>

                    <div className={styles.content2}>
                        <p className={styles.txt3}>
                            Content Note: In JSX, JavaScript expressions are written inside curly braces, and since JavaScript objects also use curly
                            braces, the styling in the example above is written inside two sets of curly braces Content Note: In JSX, JavaScript
                            expressions are written inside curly braces, and since JavaScript objects also use curly braces, the styling in the
                            example above is written inside two sets of curly braces Content Note: In JSX, JavaScript expressions are written inside
                            curly braces, and since JavaScript objects also use curly braces, the styling in the example above is written inside two
                            sets of curly braces Content Note: In JSX, JavaScript expressions are written inside curly braces, and since JavaScript
                            objects also use curly braces, the styling in the example above is written inside two sets of curly braces Content Note:
                            In JSX, JavaScript expressions are written inside curly braces, and since JavaScript objects also use curly braces, the
                            styling in the example above is written inside two sets of curly braces
                        </p>
                    </div>

                    <input type="button" value="Cancel" className={styles.btnCancel} onClick={handCancel}></input>
                </div>
            ) : null}
        </>
    );
};
export default Content;
