import styles from "../../../styleCss/stylesComponents/forAdmin/banedUser.module.css"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"
const ActiveManager = ({ idManager }) => {
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        console.log(idManager)
        axios
            .put("http://localhost:8800/api/activeManager", idManager, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res)
                console.log(res.data)
                alert(res.data.message)
                navigate("/listManagers")
            })
        event.preventDefault()
    }
    return (
        <>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <label className={styles.title}>Active Manager</label>
                    <br />
                    <label className={styles.txt}>Are you sure about active this manager?</label>
                    <br />

                    <input type="submit" value="OK" className={styles.btnOK}></input>
                    <input type="button" value="Cancel" className={styles.btnCancel}></input>
                </form>
            </div>
        </>
    )
}
export default ActiveManager
