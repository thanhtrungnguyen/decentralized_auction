import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarAdmin from "../../components/sidebar_admin/SidebarAdmin";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import PublishNews from "../../components/popups/forAdmin/PublishNews";
import PrivateNews from "../../components/popups/forAdmin/PrivateNews";

const ListNews = () => {
  const [page, setPage] = React.useState(1);

  const [title, setTitle] = useState(null);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Published");
  const [status2, setStatus2] = useState("Private");
  const navigate = useNavigate();
  const baseURL = "http://localhost:8800/api/new/";

  useEffect(() => {
    axios.get(baseURL).then((resp) => {
      console.log(resp.data);
      console.log("axios get");
      setData(resp.data);
    });
  }, [baseURL]);
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
      .get("http://localhost:8800/api/new", formData, {
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
  const handleChange = (event, value) => {
    setPage(value);
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
                Add a new New
              </Link>
              <br />
              <table className={styles.table}>
                <tr>
                  <th className={styles.th}>Title</th>
                  <th className={styles.th}>Last modified</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Action</th>
                </tr>
                {data.map((news) => (
                  <tr>
                    <td className={styles.td}>{news}</td>
                    <td className={styles.td}>{news}</td>
                    <td className={styles.td}>{news}</td>
                    <td className={styles.td}>
                      {(() => {
                        if (news.status === "Published") {
                          return (
                            <Popup
                              trigger={
                                <label className={styles.linkBlue}>
                                  Private
                                </label>
                              }
                              position="right center"
                            >
                              <PrivateNews idNews={news._id} />
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
                              <PublishNews idNews={news._id} />
                            </Popup>
                          );
                        }
                      })()}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className={styles.td}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </td>
                  <td className={styles.td}>01/01/2022 - 10:00 </td>
                  <td className={styles.td}>Published</td>
                  <td className={styles.td}>
                    <Link className={styles.linkBlue} to="/editNew">
                      Edit
                    </Link>
                    {(() => {
                      if (status === "Published") {
                        return (
                          <Popup
                            trigger={
                              <label className={styles.linkBlue}>Private</label>
                            }
                            position="right center"
                          >
                            <PrivateNews idNews={123} />
                          </Popup>
                        );
                      } else {
                        return (
                          <Popup
                            trigger={
                              <label className={styles.linkBlue}>Publish</label>
                            }
                            position="right center"
                          >
                            <PublishNews idNews={123} />
                          </Popup>
                        );
                      }
                    })()}
                  </td>
                </tr>
                <tr>
                  <td className={styles.td}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </td>
                  <td className={styles.td}>01/01/2022 - 10:00 </td>
                  <td className={styles.td}>Private</td>
                  <td className={styles.td}>
                    <Link className={styles.linkBlue} to="/editNew">
                      Edit
                    </Link>
                    {(() => {
                      if (status2 === "Published") {
                        return (
                          <Popup
                            trigger={
                              <label className={styles.linkBlue}>Private</label>
                            }
                            position="right center"
                          >
                            <PrivateNews idNews={123} />
                          </Popup>
                        );
                      } else {
                        return (
                          <Popup
                            trigger={
                              <label className={styles.linkBlue}>Publish</label>
                            }
                            position="right center"
                          >
                            <PublishNews idNews={123} />
                          </Popup>
                        );
                      }
                    })()}
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
      </form>
    </>
  );
};
export default ListNews;
