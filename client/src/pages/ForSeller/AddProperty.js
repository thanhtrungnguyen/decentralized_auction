import styles from "../../styleCss/stylesPages/forSellers/AddProperty.module.css";
import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller";
import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Ft from "react-multi-date-picker/plugins/range_picker_footer";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProperty = () => {
  // const [date, setDate] = useState([
  //   new DateObject().setDay(15),
  //   new DateObject().add(1, "month").setDay(15),
  // ]);
  const [propertyImage, setPropertyImage] = useState(null);
  const [propertyVideo, setPropertyVideo] = useState(null);
  const [propertyName, setPropertyName] = useState(null);
  const [cagetory, setCategory] = useState('Car');
  const [propertyDescription, setPropertyDescription] = useState(null);
  const [startBid, setStartBid] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const [priceStep, setPriceStep] = useState(null);
  const [placeViewProperty, setPlaceViewProperty] = useState(null);
  // const [startBid, setStartBid] = useState(null);
  const [viewPropertyTime, setViewPropertyTime] = useState([
    new DateObject().setDay(15),
    new DateObject().add(1, "month").setDay(15),
  ]);

  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const baseURL = "http://localhost:8800/api/category/";

  useEffect(() => {
    axios.get(baseURL).then((resp) => {
      console.log(resp.data);
      console.log("axios get");

      setData(resp.data);
    });
  }, [baseURL]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "propertyImage") {
      setPropertyImage(e.target.files);
    }
    if (id === "propertyVideo") {
      setPropertyVideo(value);
    }
    if (id === "propertyName") {
      setPropertyName(value);
    }
    if (id === "cagetory") {
      setCategory(value);
    }
    if (id === "propertyDescription") {
      setPropertyDescription(value);
    }
    if (id === "startBid") {
      setStartBid(value);
    }
    if (id === "deposit") {
      setDeposit(value);
    }
    if (id === "priceStep") {
      setPriceStep(value);
    }
    if (id === "placeViewProperty") {
      setPlaceViewProperty(value);
    }
    // if (id === "startBid") {
    //   setStartBid(value);
    // }
    if (id === "viewPropertyTime") {
      setViewPropertyTime(value);
    }
  };

  const handleSubmit = (event) => {
    const formData = new FormData();
    for (let i = 0; i < propertyImage.length; i++) {
      formData.append(`propertyImage${i}`, propertyImage[i]);
    }
    formData.append("propertyVideo", propertyVideo);
    formData.append("propertyName", propertyName);
    formData.append("cagetory", cagetory);
    formData.append("propertyDescription", propertyDescription);
    formData.append("viewPropertyTime", viewPropertyTime);
    formData.append("startBid", startBid);
    formData.append("deposit", deposit);
    formData.append("priceStep", priceStep);
    formData.append("placeViewProperty", placeViewProperty);
    // formData.append("startBid", startBid);
    // formData.append("biddingPreiod", biddingPreiod);
    axios
      .post("http://localhost:8800/api/property", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(res.data.message);
        navigate("/myProperty");
      });
    // for (const [key, value] of formData) {
    //   alert(key + ": " + value);
    // }
    // alert(
    //   "infomation: " + formData

    // propertyImage.name +
    // " " +
    // propertyVideo.name +
    // " " +
    // propertyName +
    // " " +
    // cagetory +
    // " " +
    // propertyDescription +
    // " " +
    // startBid +
    // " " +
    // biddingPreiod
    // );
    event.preventDefault();
  };
  return (
    <>
      <Header />
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div className={styles.root}>
          <SideBarSeller />
          <div className={styles.info}>
            <div>
              <p className={styles.title}>Basic Information</p>

              <div className={styles.col1}>
                <p className={styles.lable}>Property Image</p>
                <p className={styles.lable}>Property Video</p>
                <p className={styles.lable}>Property Name</p>
                <p className={styles.lable}>Category</p>
                <p className={styles.lable}>Start Bid</p>
                <p className={styles.lable}>Deposit</p>
                <p className={styles.lable}>Price Step</p>
                <p className={styles.lable}>Place View Property</p>
                <p className={styles.lable}>View Property Time</p>
                <p className={styles.lable}>Property Description</p>
              </div>
              <div className={styles.col2}>
                <input
                  className={styles.inputImg}
                  id="propertyImage"
                  onChange={(e) => handleInputChange(e)}
                  type="file"
                  multiple
                  required
                ></input>
                <br />
                <input
                  className={styles.inputText}
                  type="text"
                  id="propertyVideo"
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>
                <input
                  id="propertyName"
                  type="text"
                  placeholder="Enter Property Name"
                  className={styles.inputText}
                  value={propertyName}
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>

                <select
                  className={styles.drop}
                  onChange={(e) => handleInputChange(e)}
                  id="cagetory"
                  placeholder="Category"
                  defaultValue="Car"
                >
                  {data.map((item) => (
                    <option value={item.Name}>
                      {item.Name}
                    </option>
                  ))} 
                </select>
                <input
                  id="startBid"
                  type="number"
                  placeholder="Enter Start Bid"
                  className={styles.inputText}
                  value={startBid}
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>
                <input
                  id="deposit"
                  type="text"
                  placeholder="Enter Deposit"
                  className={styles.inputText}
                  value={deposit}
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>
                <input
                  id="priceStep"
                  type="number"
                  placeholder="Enter Price Step"
                  className={styles.inputText}
                  value={priceStep}
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>
                <input
                  id="placeViewProperty"
                  type="text"
                  placeholder="Enter Place View Property"
                  className={styles.inputText}
                  value={placeViewProperty}
                  onChange={(e) => handleInputChange(e)}
                  required
                ></input>
                <div className={styles.date}>
                  <DatePicker
                    id="placeViewProperty"
                    // onChange={(e) => handleInputChange(e)}
                    onChange={setViewPropertyTime}
                    ClassName={styles.datePicker}
                    value={viewPropertyTime}
                    // onChange={setValue}
                    range
                    numberOfMonths={2}
                    format="MM/DD/YYYY HH:mm:ss"
                    plugins={[<TimePicker />]}
                  />
                </div>
                <textarea
                  id="propertyDescription"
                  value={propertyDescription}
                  className={styles.textarea}
                  onChange={(e) => handleInputChange(e)}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          {/* <div className={styles.auction}>
            <p className={styles.title}>Auction</p>
            <div className={styles.col1}>
              <p className={styles.lable}>Start bid</p>
              <p className={styles.lable}>Bidding Period</p>
            </div>
            <div className={styles.col2}>
              <input
                id="startBid"
                type="number"
                placeholder="Enter Start bid"
                className={styles.inputText}
                onChange={(e) => handleInputChange(e)}
                value={startBid}
                required
              ></input>
              <DatePicker
                id="biddingPreiod"
                // onChange={(e) => handleInputChange(e)}
                onChange={setBiddingPreiod}
                ClassName={styles.datePicker}
                value={biddingPreiod}
                // onChange={setValue}
                range
                numberOfMonths={2}
                format="MM/DD/YYYY HH:mm:ss"
                plugins={[<TimePicker />]}
              />
            </div>
          </div> */}
          <div className={styles.btn}>
            <input
              className={styles.btnSave}
              type="submit"
              value="Save"
            ></input>
            {/* 
            <input
              className={styles.btnDraft}
              type="button"
              value="Save as Draft"
            ></input> */}
            <input
              className={styles.btnCancel}
              type="button"
              value="Cancel"
            ></input>
          </div>

          <Footer />
        </div>
      </form>
    </>
  );
};
export default AddProperty;
