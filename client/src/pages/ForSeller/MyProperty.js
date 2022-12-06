import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css"
import Header from "../../components/header/Header"
import NavBar from "../../components/navbar/NavBar"
import Footer from "../../components/footer/Footer"
import SideBarSeller from "../../components/sidebar_seller/SidebarSeller"
import { Outlet, Link } from "react-router-dom"
import Pagination from "@mui/material/Pagination"
import React, { useEffect, useState } from "react"
import { BsFillCheckSquareFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const MyProperty = () => {
    const [page, setPage] = React.useState(1)
    const [category, setCategory] = useState("Car")
    const [propertyName, setPropertyName] = useState(null)
    const [listCategory, setListCategory] = useState([])
    const [listProperty, setListProperty] = useState([])

    const navigate = useNavigate()
    const baseURLCategory = "http://localhost:8800/api/category/"
    const baseURLProperty = "http://localhost:8800/api/property/"

    useEffect(() => {
        axios.get(baseURLCategory).then((resp) => {
            console.log(resp.data)
            console.log("axios get")
            setListCategory(resp.data)
        })
    }, [baseURLCategory])
    useEffect(() => {
        axios.get(baseURLProperty, { withCredentials: true }).then((resp) => {
            console.log(resp.data)
            console.log("axios get")
            setListProperty(resp.data)
        })
    }, [baseURLProperty])
    const handleChange = (event, value) => {
        setPage(value)
    }
    const handleInputChange = (e) => {
        const { id, value } = e.target
        if (id === "category") {
            setCategory(value)
        }
        if (id === "propertyName") {
            setPropertyName(value)
        }
    }
    const handleSubmit = (event) => {
        const formData = new FormData()

        formData.append("propertyName", propertyName)
        formData.append("category", category)

        axios
            .get("http://localhost:8800/api/property", formData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res)
                console.log(res.data)
                alert(res.data.message)
                // setData(res.data);

                // navigate("/myProperty");
            })
        event.preventDefault()
    }
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
                                <input id="propertyName" className={styles.input} type="text" placeholder="Please input" value={propertyName} onChange={(e) => handleInputChange(e)} required></input>
                            </div>
                            <p className={styles.title}>Category</p>
                            <select className={styles.select} onChange={(e) => handleInputChange(e)} id="category" placeholder="Category" defaultValue="Car">
                                {listCategory.map((item) => (
                                    <option value={item.Name}>{item.Name}</option>
                                ))}
                            </select>
                            <br />
                            <br />
                            <input className={styles.btn} type="submit" value="Search"></input>
                            <input className={styles.btnReset} type="button" value="Reset"></input>
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <Link className={styles.bold} to="/myProperty">
                                All
                            </Link>
                            <Link className={styles.link} to="/">
                                Biding
                            </Link>
                            <Link className={styles.link} to="/">
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
                                    <th className={styles.th}>Category</th>
                                    <th className={styles.th}>Start bid</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Action</th>
                                </tr>
                                {listProperty.map((property) => (
                                    <tr>
                                        <td className={styles.td}>
                                            <input type="checkbox"></input>
                                        </td>
                                        <td className={styles.td}>{property.Name}</td>
                                        <td className={styles.td}>{property.Category_Id__r.Name}</td>
                                        <td className={styles.td}>{property.Start_Bid__c}</td>
                                        <td className={styles.td}>{property.Status__c}</td>
                                        <td className={styles.td}>
                                            <Link className={styles.linkBlue} to={`/editProperty/${property.Id}`}>
                                                Edit
                                            </Link>
                                            <Link className={styles.linkBlue} to="/">
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className={styles.td}>
                                        <input type="checkbox"></input>
                                    </td>
                                    <td className={styles.td}>Dianne Russell</td>
                                    <td className={styles.td}>Real estate</td>
                                    <td className={styles.td}>6969</td>
                                    <td className={styles.td}>Tag</td>
                                    <td className={styles.td}>
                                        <Link className={styles.linkBlue} to="/propertyDetail">
                                            View
                                        </Link>
                                        <Link className={styles.linkBlue} to="/editProperty/">
                                            Edit
                                        </Link>
                                        <Link className={styles.linkBlue} to="/">
                                            Delete
                                        </Link>
                                        <Link className={styles.linkBlue} to={`/editProperty/`}>
                                            Request Add
                                        </Link>
                                    </td>
                                </tr>
                            </table>
                            <div>
                                <Pagination className={styles.pagi} count={10} page={page} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </form>
        </>
    )
}

export default MyProperty
