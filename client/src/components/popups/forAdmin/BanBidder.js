import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const BanedBidder = ({ idBidder }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log(idBidder);
    axios
      .put("http://localhost:8800/api/banedBidder", idBidder, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(res.data.message);
        navigate("/listBidders");
      });
    event.preventDefault();
  };
  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <label className={styles.title}>Ban Bidder</label>
          <br />
          <label className={styles.txt}>
            Are you sure about ban this bidder?
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
export default BanedBidder;
