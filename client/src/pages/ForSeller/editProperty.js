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
import axios from "axios"
import { useParams } from "react-router-dom"
import { useFetch } from "../../hook/useFetch"
import Loading from "../../components/loading/Loading"

const EditProperty = () => {
    // const [date, setDate] = useState([
    //   new DateObject().setDay(15),
    //   new DateObject().add(1, "month").setDay(15),
    // ]);
    const [propertyImage1, setPropertyImage1] = useState(null)
    const [propertyImage2, setPropertyImage2] = useState(null)
    const [propertyImage3, setPropertyImage3] = useState(null)
    const [propertyVideo, setPropertyVideo] = useState(null)
    const [propertyName, setPropertyName] = useState(null)
    const [category, setCategory] = useState("Chair")
    const [listCategory, setlistCategory] = useState([])

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

    const [property, setProperty] = useState([])
    const { id } = useParams()

    const navigate = useNavigate()
    const baseURLCategory = `http://localhost:8800/api/category`

    useEffect(() => {
        axios.get(baseURLCategory).then((resp) => {
            console.log(resp.data)
            console.log("axios get")
            setlistCategory(resp.data)
        })
    }, [baseURLCategory])

    const baseURLProperty = `http://localhost:8800/api/property/${id}`
    const { data, loading, error } = useFetch(baseURLProperty)

    // useEffect(() => {
    //   axios.get(baseURLProperty).then((resp) => {
    //     console.log(resp.data);
    //     console.log("axios get");
    //     setProperty(resp.data);
    //     setPropertyImage1(property.Properties_Media__r.records[0].Name);
    //     setPropertyImage2(property.Properties_Media__r.records[1].Name);
    //     setPropertyImage3(property.Properties_Media__r.records[2].Name);
    //   });
    // }, [baseURLProperty]);

    const handleInputChange = (e) => {
        const { id, value } = e.target
        if (id === "propertyImage1") {
            setPropertyImage1(e.target.files[0])
        }
        if (id === "propertyImage2") {
            setPropertyImage2(e.target.files[0])
        }
        if (id === "propertyImage3") {
            setPropertyImage3(e.target.files[0])
        }
        if (id === "propertyVideo") {
            setPropertyVideo(value)
        }
        if (id === "propertyName") {
            setPropertyName(value)
        }
        if (id === "category") {
            setCategory(value)
        }
        if (id === "propertyDescription") {
            setPropertyDescription(value)
        }
        if (id === "startBid") {
            setStartBid(value)
        }
        if (id === "deposit") {
            setDeposit(value)
        }
        if (id === "priceStep") {
            setPriceStep(value)
        }
        if (id === "placeViewProperty") {
            setPlaceViewProperty(value)
        }
        // if (id === "startBid") {
        //   setStartBid(value);
        // }
        if (id === "viewPropertyTime") {
            setViewPropertyTime(value)
        }
    }

    const handleSubmit = (event) => {
        console.log(propertyImage1)
        const formData = new FormData()
        formData.append("propertyImage1", propertyImage1)
        formData.append("propertyImage2", propertyImage2)
        formData.append("propertyImage3", propertyImage3)
        formData.append("propertyVideo", propertyVideo)
        formData.append("propertyName", propertyName)
        formData.append("category", category)
        formData.append("propertyDescription", propertyDescription)
        formData.append("viewPropertyTime", viewPropertyTime)
        formData.append("startBid", startBid)
        formData.append("deposit", deposit)
        formData.append("priceStep", priceStep)
        formData.append("placeViewProperty", placeViewProperty)
        // formData.append("startBid", startBid);
        // formData.append("biddingPreiod", biddingPreiod);
        axios
            .put(`http://localhost:8800/api/property/${id}`, formData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res)
                console.log(res.data)
                alert(res.data.message)
                navigate("/myProperty")
            })

        event.preventDefault()
    }
    return loading ? (
        <Loading />
    ) : (
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
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
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
                                    id="propertyImage1"
                                    onChange={(e) => handleInputChange(e)}
                                    type="file"
                                    required
                                ></input>
                                <input
                                    className={styles.inputImg}
                                    id="propertyImage2"
                                    onChange={(e) => handleInputChange(e)}
                                    type="file"
                                    required
                                ></input>
                                <input
                                    className={styles.inputImg}
                                    id="propertyImage3"
                                    onChange={(e) => handleInputChange(e)}
                                    type="file"
                                    required
                                ></input>
                                <div className={styles.conImg}>
                                    {propertyImage1 == null && (
                                        <img
                                            src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[0].Name}`}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                    {propertyImage1 != null && (
                                        <img
                                            src={URL.createObjectURL(propertyImage1)}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                    {propertyImage2 == null && (
                                        <img
                                            src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[1].Name}`}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                    {propertyImage2 != null && (
                                        <img
                                            src={URL.createObjectURL(propertyImage2)}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                    {propertyImage3 == null && (
                                        <img
                                            src={`http://localhost:8800/api/auction/images/${data.Properties_Media__r.records[2].Name}`}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                    {propertyImage3 != null && (
                                        <img
                                            src={URL.createObjectURL(propertyImage3)}
                                            className={styles.image}
                                            alt="Thumb"
                                        />
                                    )}
                                </div>

                                <br />
                                <input
                                    className={styles.inputText}
                                    type="text"
                                    id="propertyVideo"
                                    onChange={(e) => handleInputChange(e)}
                                    required
                                    //   defaultValue={data.property.propertyVideo}
                                ></input>
                                <input
                                    id="propertyName"
                                    type="text"
                                    placeholder="Enter Property Name"
                                    className={styles.inputText}
                                    value={propertyName}
                                    onChange={(e) => handleInputChange(e)}
                                    //   defaultValue={data.property.propertyName}
                                    required
                                ></input>
                                <select
                                    className={styles.drop}
                                    onChange={(e) => handleInputChange(e)}
                                    id="category"
                                    placeholder="Category"
                                    // defaultValue={data.property.category}
                                >
                                    {listCategory.map((item) => (
                                        <option value={item.Name}>{item.Name}</option>
                                    ))}
                                </select>
                                <input
                                    id="startBid"
                                    type="number"
                                    placeholder="Enter Start Bid"
                                    className={styles.inputText}
                                    value={startBid}
                                    onChange={(e) => handleInputChange(e)}
                                    // defaultValue={data.property.startBid}
                                    required
                                ></input>
                                <input
                                    id="deposit"
                                    type="text"
                                    placeholder="Enter Deposit"
                                    className={styles.inputText}
                                    value={deposit}
                                    onChange={(e) => handleInputChange(e)}
                                    // defaultValue={data.property.deposit}
                                    required
                                ></input>
                                <input
                                    id="priceStep"
                                    type="number"
                                    placeholder="Enter Price Step"
                                    className={styles.inputText}
                                    value={priceStep}
                                    onChange={(e) => handleInputChange(e)}
                                    // defaultValue={data.property.priceStep}
                                    required
                                ></input>
                                <input
                                    id="placeViewProperty"
                                    type="text"
                                    placeholder="Enter Place View Property"
                                    className={styles.inputText}
                                    value={placeViewProperty}
                                    onChange={(e) => handleInputChange(e)}
                                    // defaultValue={data.property.placeViewProperty}
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
                                        //   defaultValue={data.property.placeViewProperty}
                                    />
                                </div>
                                <textarea
                                    id="propertyDescription"
                                    value={propertyDescription}
                                    className={styles.textarea}
                                    onChange={(e) => handleInputChange(e)}
                                    // defaultValue={data.property.propertyDescription}
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
                        <input className={styles.btnSave} type="submit" value="Save "></input>

                        <input className={styles.btnCancel} type="button" value="Cancel"></input>
                    </div>

                    <Footer />
                </div>
            </form>
        </>
    )
}
export default EditProperty
