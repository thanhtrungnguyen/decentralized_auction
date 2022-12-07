import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_manager/SidebarManager";
import { Outlet, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuctionsListForManager = () => {
  const [page, setPage] = React.useState(1);
  const [cagetory, setCategory] = useState("Car");
  const [propertyName, setPropertyName] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://localhost:8800/api/auction/";
  const baseURLCategory = "http://localhost:8800/api/category/";
  const baseURLAuction = "http://localhost:8800/api/auction/";
  const [listCategory, setListCategory] = useState([]);
  const [listAuction, setListAuction] = useState([]);

  useEffect(() => {
    axios.get(baseURLCategory).then((resp) => {
      console.log(resp.data);
      console.log("axios get");
      setListCategory(resp.data);
    });
  }, [baseURLCategory]);

  useEffect(() => {
    axios.get(baseURLAuction).then((resp) => {
      console.log(resp.data);
      console.log("axios get");
      setListAuction(resp.data);
    });
  }, [baseURLAuction]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "cagetory") {
      setCategory(value);
    }
    if (id === "propertyName") {
      setPropertyName(value);
    }
  };
  const handleSubmit = (event) => {
    const formData = new FormData();

    formData.append("propertyName", propertyName);
    formData.append("cagetory", cagetory);

    axios
      .get("http://localhost:8800/api/auction", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(res.data.message);
        setData(res.data);

        navigate("/autionsListForManager");
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
          <SideBarSeller />
          <div className={styles.content}>
            <div className={styles.search}>
              <div className={styles.floatLeft}>
                <p className={styles.title}>Property Name</p>
                <input
                  id="propertyName"
                  className={styles.input}
                  type="text"
                  placeholder="Please input"
                  value={propertyName}
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>
              </div>
              <p className={styles.title}>Category</p>
              <select
                className={styles.select}
                onChange={(e) => handleInputChange(e)}
                id="cagetory"
                placeholder="Category"
                defaultValue="Car"
              >
                {listCategory.map((item) => (
                  <option value={item.Name}>{item.Name}</option>
                ))}
              </select>
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
              <Link className={styles.bold} to="/myProperty">
                All
              </Link>
              <Link className={styles.link} to="/">
                Request add
              </Link>
              <Link className={styles.link} to="/">
                Approved
              </Link>
              <Link className={styles.link} to="/">
                Upcoming
              </Link>
              <Link className={styles.link} to="/">
                Bidding
              </Link>
              <Link className={styles.link} to="/">
                Closed
              </Link>
              <hr />
              <p className={styles.txtBold}>69 Properties</p>
              {/* <Link className={styles.btnAdd} to="/addProperty">
              Add a New Property
            </Link> */}
              <br />
              <table className={styles.table}>
                <tr>
                  <th className={styles.th}>Property Name</th>
                  <th className={styles.th}>Category Name</th>
                  <th className={styles.th}>Registration Time</th>
                  <th className={styles.th}>Auction Time</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Action</th>
                </tr>
                {listAuction.map((auction) => (
                  <tr>

                    <td className={styles.td}>
                      {auction.Name}
                    </td>
                    <td className={styles.td}>{auction.Category_Id__r.Name}</td>
                    <td className={styles.td}>
                      {
                        auction.Auctions1__r.records[0].Status__c == "Request" && `__`
                      }
                      {
                        auction.Auctions1__r.records[0].Status__c != "Request" && "From "+ auction.Auctions1__r.records[0].Start_Registration_Time__c +" To " + auction.Auctions1__r.records[0].End_Registration_Time__c
                      }

                    </td>
                    <td className={styles.td}>
                      {
                        auction.Auctions1__r.records[0].Status__c == "Request" && `__`
                      }
                      {
                        auction.Auctions1__r.records[0].Status__c != "Request" && "From "+ auction.Auctions1__r.records[0].Start_Aution_Time__c +" To " + auction.Auctions1__r.records[0].End_Auction_Time__c
                      }
                      </td>
                    <td className={styles.td}>{auction.Auctions1__r.records[0].Status__c}</td>
                    <td className={styles.td}>
                      <Link
                        className={styles.linkBlue}
                        to={`/autitoDetailForManager/${auction._id}`}
                      >
                        View
                      </Link>
                      <Link
                        className={styles.linkBlue}
                        to={`/approveAuction/${auction.Auctions1__r.records[0].Id}/${auction.Id}`}
                      >
                        Approve
                      </Link>
                    </td>
                  </tr>
                ))}

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
export default AuctionsListForManager;
