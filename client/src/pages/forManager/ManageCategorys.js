import styles from "../../styleCss/stylesPages/forSellers/myProperty.module.css"
import Header from "../../components/header/Header"
import NavBar from "../../components/navbar/NavBar"
import Footer from "../../components/footer/Footer"
import SideBarSeller from "../../components/sidebar_manager/SidebarManager"
import { Outlet, Link } from "react-router-dom"
import Pagination from "@mui/material/Pagination"
import React, { useEffect, useState } from "react"
import { BsFillCheckSquareFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const ManagerCategorys = () => {
    const [page, setPage] = React.useState(1)
    const [categoryName, setCategory] = useState(null)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const baseURL = "http://localhost:8800/api/auction/"

    useEffect(() => {
        axios.get(baseURL).then((resp) => {
            console.log(resp.data)
            console.log("axios get")
            setData(resp.data)
        })
    }, [baseURL])
    const handleInputChange = (e) => {
        const { id, value } = e.target
        if (id === "categoryName") {
            setCategory(value)
        }
    }
    const handleSubmit = (event) => {
        const formData = new FormData()

        formData.append("categoryName", categoryName)

        axios
            .get("http://localhost:8800/api/auction", formData, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res)
                console.log(res.data)
                alert(res.data.message)
                setData(res.data)

                navigate("/autionsListForManager")
            })
        event.preventDefault()
    }
    const handleChange = (event, value) => {
        setPage(value)
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
                                <input
                                    id="categoryName"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Please input"
                                    value={categoryName}
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
                            <input className={styles.btn} type="submit" value="Search"></input>
                            <input className={styles.btnReset} type="button" value="Reset"></input>
                            <br />
                            <br />
                            <hr className={styles.hr} />
                            <Link className={styles.bold} to="/managerCategorys">
                                All
                            </Link>

                            <hr />
                            <p className={styles.txtBold}>69 Properties</p>
                            <Link className={styles.btnAdd} to="/addCategory">
                                Add a New Category
                            </Link>
                            <br />
                            <table className={styles.table}>
                                <tr>
                                    <th className={styles.th}>Property Name</th>

                                    <th className={styles.th}>Action</th>
                                </tr>
                                {data.map((auction) => (
                                    <tr>
                                        <td className={styles.td}>
                                            {auction.property.propertyName}
                                        </td>

                                        <td className={styles.td}>
                                            <Link
                                                className={styles.linkBlue}
                                                to={`/categoryDetail/${auction._id}`}
                                            >
                                                View
                                            </Link>
                                            <Link
                                                className={styles.linkBlue}
                                                to={`/editCategory/${auction._id}`}
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                className={styles.linkBlue}
                                                to={`/deleteCategory/${auction._id}`}
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className={styles.td}>Dianne Russell</td>

                                    <td className={styles.td}>
                                        <Link className={styles.linkBlue} to={`/categoryDetail`}>
                                            View
                                        </Link>
                                        <Link className={styles.linkBlue} to={`/editCategory`}>
                                            Edit
                                        </Link>
                                        <Link className={styles.linkBlue} to={`/deleteCategory`}>
                                            Delete
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
            </form>
        </>
    )
}
export default ManagerCategorys
