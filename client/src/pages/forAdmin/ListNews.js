import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Outlet, Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import Moment from 'moment';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import PublishNews from "../../components/popups/forAdmin/PublishNews";
import PrivateNews from "../../components/popups/forAdmin/PrivateNews";

const ListNews = () => {
  const [page, setPage] = useState(1);
  
  const [title, setTitle] = useState(null);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Published");
  const [status2, setStatus2] = useState("Private");
  var { index } = useParams();
  const navigate = useNavigate();
  var baseURL = `http://localhost:8800/api/news/${page}`;

  useEffect(() => {
    axios.get(baseURL).then((resp) => {
      console.log(resp.data);
      console.log("axios get");
      setData(resp.data);
    });
  }, [baseURL],[page]);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "title") {
      setTitle(value);
    }
  };
  const handleSubmit = (event) => {
    const formData = new FormData();

    formData.append("title", title);

    axios
      .get("http://localhost:8800/api/news", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(res.data.message);
        setData(res.data);

        navigate("/listNews");
      });
    event.preventDefault();
  };
  const handleChange = (event, page) => {
    setPage(page);
  };

  return (
    <>
      <Header />
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <SideBarAdmin />
          <div className={styles.content}>
            <div className={styles.search}>
              <div className={styles.floatLeft}>
                <p className={styles.title}>Search</p>
                <input
                  id="title"
                  className={styles.input}
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <input
                className={styles.btn}
                type="submit"
                value="Search"
              ></input>
              <input
                className={styles.btnReset}
                type="button"
                value="Reset"
              ></input>
              <br />
              <br />
              <hr className={styles.hr} />
              <Link className={styles.bold} to="/listNews">
                All
              </Link>
              <Link className={styles.link} to="/">
                Published{" "}
              </Link>
              <Link className={styles.link} to="/">
                Private
              </Link>

              <hr />
              <p className={styles.txtBold}>69 News</p>
              <Link className={styles.btnAdd} to="/addNew">
                Add News
              </Link>
              <br />
              <table className={styles.table}>
                <tr>
                  <th className={styles.th}>Title</th>
                  <th className={styles.th}>Last modified</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Action</th>
                </tr>
                {data.map((item) => (
                  <tr>
                    <td className={styles.td}>{item.Name}</td>
                    <td className={styles.td}>{Moment(item.LastModifiedDate).format("DD/MM/yyy - H:mm")}</td>
                    <td className={styles.td}>{item.Status__c}</td>
                    <td className={styles.td}>
                      {(() => {
                        if (item.status === "Published") {
                          return (
                            <Popup
                              trigger={
                                <label className={styles.linkBlue}>
                                  Private
                                </label>
                              }
                              position="right center"
                            >
                              <PrivateNews idNews={item.Id} />
                            </Popup>
                          );
                        } else {
                          return (
                            <Popup
                              trigger={
                                <label className={styles.linkBlue}>
                                  Publish
                                </label>
                              }
                              position="right center"
                            >
                              <PublishNews idNews={item.Id} />
                            </Popup>
                          );
                        }
                      })()}
                    </td>
                  </tr>
                ))}
              </table>
              <div>
                <Pagination
                  className={styles.pagi}
                  size="large"
                  count={10}
                  page={page}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </form>
    </>
  );
};
export default ListNews;
