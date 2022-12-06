import styles from "../../styleCss/stylesComponents/footer.module.css"
import { Outlet, Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.col1}>
                    <label className={styles.label}>DAP</label>
                    <br />
                    <input type="text" className={styles.input} placeholder="Enter Email Address"></input>
                    <button className={styles.btn}>Sign Up</button>
                    <br />
                    <p className={styles.txt}>Contact Info</p>
                    <p className={styles.txt}>17 Princess Road, London, Greater London NW1 8JR, UK</p>
                </div>
                <div className={styles.col2}>
                    <p className={styles.txtBold}>Customer Care</p>
                    <p className={styles.txt}>My Account</p>
                    <p className={styles.txt}>Discount</p>
                    <p className={styles.txt}>Returns</p>
                    <p className={styles.txt}>Orders History</p>
                    <p className={styles.txt}>Order</p>
                </div>
                <div className={styles.col3}>
                    <p className={styles.txtBold}>About</p>
                    <p className={styles.txt}>Blog</p>
                    <p className={styles.txt}>?????</p>
                    <p className={styles.txt}>?????</p>
                </div>
            </div>
        </>
    )
}

export default Footer
