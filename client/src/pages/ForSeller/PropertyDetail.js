import styles from "../../styleCss/stylesPages/forSellers/AddProperty.module.css"
import Header from "../../components/header/Header"
import NavBar from "../../components/navbar/NavBar"
import Footer from "../../components/footer/Footer"
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller"
import { Outlet, Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import DatePicker, { DateObject } from "react-multi-date-picker"
import Ft from "react-multi-date-picker/plugins/range_picker_footer"
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker"
import { useNavigate } from "react-router-dom"
import ReactPlayer from "react-player"
import axios from "axios"
import { useParams } from "react-router-dom"

const PropertyDetail = () => {
    // const [date, setDate] = useState([
    //   new DateObject().setDay(15),
    //   new DateObject().add(1, "month").setDay(15),
    // ]);
    const { id } = useParams()

    const baseURL = `http://localhost:8800/api/property/${id}`

    useEffect(() => {
        axios.get(baseURL).then((resp) => {
            console.log(resp.data)
            console.log("axios get")
            setData(resp.data)
        })
    }, [baseURL])
    const [propertyImage, setPropertyImage] = useState(null)
    const [propertyVideo, setPropertyVideo] = useState(null)
    const [propertyName, setPropertyName] = useState(null)
    const [cagetory, setCategory] = useState("Car")
    const [propertyDescription, setPropertyDescription] = useState(null)
    const [startBid, setStartBid] = useState(null)
    const [deposit, setDeposit] = useState(null)
    const [priceStep, setPriceStep] = useState(null)
    const [placeViewProperty, setPlaceViewProperty] = useState(null)
    // const [startBid, setStartBid] = useState(null);
    const [viewPropertyTime, setViewPropertyTime] = useState([
        new DateObject().setDay(15),
        new DateObject().add(1, "month").setDay(15),
    ])

    const [data, setData] = useState([])

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <NavBar />
            <form>
                <div className={styles.root}>
                    <SideBarSeller />
                    <div className={styles.info}>
                        <div>
                            <p className={styles.title}>Basic Information</p>

                            <div className={styles.col1}>
                                <p className={styles.lable}>Property Image</p>
                                <p className={styles.lable}>Property Video</p>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
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
                                {/* <img
                  className={styles.img}
                  src="https://www.w3schools.com/html/pic_trulli.jpg"
                  alt="images"
                /> */}
                                <img
                                    className={styles.img}
                                    src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[0].Name}`}
                                    alt="images"
                                />
                                {/* <img
                  className={styles.img}
                  src="https://www.w3schools.com/html/pic_trulli.jpg"
                  alt="images"
                /> */}
                                <img
                                    className={styles.img}
                                    src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[1].Name}`}
                                    alt="images"
                                />
                                <img
                                    className={styles.img}
                                    src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[2].Name}`}
                                    alt="images"
                                />
                                <div className={styles.video}>
                                    <ReactPlayer
                                        className={styles.video}
                                        url={data.Properties_Media__r.records[3].Name}
                                        playing={true}
                                        controls={true}
                                        loop={true}
                                        muted={true}
                                        playsinline={true}
                                        onReady={true}
                                        width="85%"
                                        height="90%"
                                    />
                                </div>
                                {/* <img
                  className={styles.img}
                  src={`http://localhost:8800/api/auction/images/${data[0].Properties_Media__r.records[2].Name}`}
                  alt="images"
                /> */}
                                {/* <input
                  className={styles.inputImg}
                  id="propertyImage"
                  type="file"
                  multiple
                  required
                ></input>
                <br />
                <input
                  className={styles.inputImg}
                  type="file"
                  id="propertyVideo"
                  required
                  //   defaultValue={data.property.propertyVideo}
                ></input> */}
                                <input
                                    id="propertyName"
                                    type="text"
                                    placeholder="Enter Property Name"
                                    className={styles.inputText}
                                    value={data.Name}
                                    readonly
                                ></input>
                                <select
                                    className={styles.drop}
                                    id="cagetory"
                                    placeholder="Category"
                                    // value={data.Category_Id__r.Name}
                                    // defaultValue={data.Category_Id__r.Name}
                                    readonly
                                >
                                    <option value={data.Category_Id__r.Name}>
                                        {data.Category_Id__r.Name}
                                    </option>
                                    {/* <option value={data.property.category}>{data.property.category}</option> */}

                                    {/* {data.map((property) => (
                  <option value={property.category}>{property.category}</option>
                ))} */}
                                </select>
                                <input
                                    id="startBid"
                                    type="number"
                                    placeholder="Enter Start Bid"
                                    className={styles.inputText}
                                    // value={startBid}
                                    value={data.Start_Bid__c}
                                    // value={"123"}
                                    required
                                ></input>
                                <input
                                    id="deposit"
                                    type="text"
                                    placeholder="Enter Deposit"
                                    className={styles.inputText}
                                    // value={deposit}
                                    value={data.Deposit_Amount__c}
                                    // value={"123"}
                                    required
                                    readonly
                                ></input>
                                <input
                                    id="priceStep"
                                    type="number"
                                    placeholder="Enter Price Step"
                                    className={styles.inputText}
                                    // value={priceStep}
                                    value={data.Price_Step__c}
                                    // value={"321"}
                                    required
                                    readonly
                                ></input>
                                <input
                                    id="placeViewProperty"
                                    type="text"
                                    placeholder="Enter Place View Property"
                                    className={styles.inputText}
                                    // value={placeViewProperty}
                                    value={data.Place_View_Property__c}
                                    // value={"Ha Noi"}
                                    required
                                    readonly
                                ></input>
                                <div className={styles.date}>
                                    <DatePicker
                                        id="placeViewProperty"
                                        // onChange={(e) => handleInputChange(e)}
                                        onChange={setViewPropertyTime}
                                        ClassName={styles.datePicker}
                                        value={viewPropertyTime}
                                        //   value={data.property.viewPropertyTime}
                                        // onChange={setValue}
                                        range
                                        numberOfMonths={2}
                                        format="MM/DD/YYYY HH:mm:ss"
                                        plugins={[<TimePicker />]}
                                        readOnly
                                    />
                                </div>
                                <textarea
                                    id="propertyDescription"
                                    // value={propertyDescription}
                                    value={data.Description__c}
                                    // value={
                                    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                    // }
                                    className={styles.textarea}
                                    required
                                ></textarea>{" "}
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </form>
        </>
    )
}
export default PropertyDetail
