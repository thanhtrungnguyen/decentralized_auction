import Header from "../../components/header/HeaderUser";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import styles from "../../styleCss/stylesPages/forSellers/AuctionDetailForSeller.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";

const AuctionDetailForSeller = () => {
  const { id } = useParams();
  const baseURL = `http://localhost:8800/api/auction/auctiondetail/${id}`;
  const { data, loading, error } = useFetch(baseURL);
  console.log(data);
  console.log(loading);
  return loading ? (
    "loading please wait"
  ) : (
    <>
      <Header />
      <NavBar />
      <div className={styles.container}>
        <SideBarSeller className={styles.rlt} />
        <div className={styles.detail}></div>
        <Footer />
      </div>
    </>
  );
};
export default AuctionDetailForSeller;
