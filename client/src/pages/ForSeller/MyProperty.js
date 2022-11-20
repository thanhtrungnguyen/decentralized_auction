import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";

const MyProperty = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <Header />
      <NavBar />
      <div className={styles.container}>
        <SideBarSeller />
        <div className={styles.content}>
          <div className={styles.search}>
            <div className={styles.floatLeft}>
              <p className={styles.title}>Property Name</p>
              <input
                className={styles.input}
                type="text"
                placeholder="Please input"
              ></input>
            </div>
            <p className={styles.title}>Category</p>
            <select className={styles.select}>
              <option value="grapefruit">Select</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">
                Coconut
              </option>
              <option value="mango">Mango</option>
            </select>
            <br />
            <br />
            <input className={styles.btn} type="button" value="Search"></input>
            <input
              className={styles.btnReset}
              type="button"
              value="Reset"
            ></input>
            <br />
            <br />
            <hr className={styles.hr} />
            <Link className={styles.bold} to="/login">
              All
            </Link>
            <Link className={styles.link} to="/login">
              Biding
            </Link>
            <Link className={styles.link} to="/login">
              Sold out
            </Link>
            <hr />
            <p className={styles.txtBold}>69 Properties</p>
            <Link className={styles.btnAdd} to="/addProperty">
              Add a New Property
            </Link>
            <br />
            <table className={styles.table}>
              <tr>
                <th className={styles.th}>
                  <BsFillCheckSquareFill className={styles.icon} />
                </th>
                <th className={styles.th}>Property Name</th>
                <th className={styles.th}>Start bid</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Action</th>
              </tr>
              <tr>
                <td className={styles.td}>
                  <input type="checkbox"></input>
                </td>
                <td className={styles.td}>Dianne Russell</td>
                <td className={styles.td}>6969</td>
                <td className={styles.td}>Tag</td>
                <td className={styles.td}>
                  <Link className={styles.linkBlue} to="/">
                    Link
                  </Link>
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <input type="checkbox"></input>
                </td>
                <td className={styles.td}>Dianne Russell</td>
                <td className={styles.td}>6969</td>
                <td className={styles.td}>Tag</td>
                <td className={styles.td}>
                  <Link className={styles.linkBlue} to="/">
                    Link
                  </Link>
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <input type="checkbox"></input>
                </td>
                <td className={styles.td}>Dianne Russell</td>
                <td className={styles.td}>6969</td>
                <td className={styles.td}>Tag</td>
                <td className={styles.td}>
                  <Link className={styles.linkBlue} to="/">
                    Link
                  </Link>
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <input type="checkbox"></input>
                </td>
                <td className={styles.td}>Dianne Russell</td>
                <td className={styles.td}>6969</td>
                <td className={styles.td}>Tag</td>
                <td className={styles.td}>
                  <Link className={styles.linkBlue} to="/">
                    Link
                  </Link>
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <input type="checkbox"></input>
                </td>
                <td className={styles.td}>Dianne Russell</td>
                <td className={styles.td}>6969</td>
                <td className={styles.td}>Tag</td>
                <td className={styles.td}>
                  <Link className={styles.linkBlue} to="/">
                    Link
                  </Link>
                </td>
              </tr>
              <tr>
                <td className={styles.td}>
                  <input type="checkbox"></input>
                </td>
                <td className={styles.td}>Dianne Russell</td>
                <td className={styles.td}>6969</td>
                <td className={styles.td}>Tag</td>
                <td className={styles.td}>
                  <Link className={styles.linkBlue} to="/">
                    Link
                  </Link>
                </td>
              </tr>
            </table>
            <div>
              <Pagination
                className={styles.pagi}
                count={10}
                page={page}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyProperty;
