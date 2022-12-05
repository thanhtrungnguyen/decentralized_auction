import React from "react"
import styles from "../../styleCss/stylesPages/confirmPayment.module.css"
import { IoReturnUpBackOutline } from "react-icons/io5"
import { FaEthereum } from "react-icons/fa"
const ConfirmPayment = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <IoReturnUpBackOutline className={styles.icon} />
                    <p className={styles.txt}>Send payment to DAP</p>
                    <p className={styles.txtBold}>6969 ETH</p>
                    <p className={styles.txtNormal}>Ethereum Mainnet</p>
                    <p className={styles.txtNormal}>
                        <FaEthereum className={styles.iconNormal} />
                        Ether
                    </p>
                    <p className={styles.txtNormal}>Your balance: 100000</p>
                </div>
                <div className={styles.col2}>
                    <p className={styles.txtNormalB}>Connected with Metamask</p>
                    <p className={styles.txtNormalB2}>
                        0x26594a6109a5154C8E10765C5f15F4B7F54e0420
                    </p>
                </div>
                <br />
                <button className={styles.btn}>Insufficient Balance</button>
            </div>
        </>
    )
}
export default ConfirmPayment
