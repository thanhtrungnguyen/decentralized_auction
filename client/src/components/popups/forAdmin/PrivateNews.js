import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const PrivateNews = ({ idNews }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log(idNews);
    axios
      .put("http://localhost:8800/api/privateNews", idNews, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(res.data.message);
        navigate("/listNews");
      });
    event.preventDefault();
  };
  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <label className={styles.title}>Private News</label>
          <br />
          <label className={styles.txt}>
            Are you sure about private this news?
          </label>
          <br />

          <input type="submit" value="OK" className={styles.btnOK}></input>
          <input
            type="button"
            value="Cancel"
            className={styles.btnCancel}
          ></input>
        </form>
      </div>
    </>
  );
};
export default PrivateNews;
