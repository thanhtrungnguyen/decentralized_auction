import React from "react";
import styles from "../../styleCss/stylesPages/confirmPayment.module.css";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FaEthereum } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
const PaymentResult = () => {
    return (
        <>
            <div className={styles.container}>
                <br />
                <br />
                <p className={styles.txtBold}>Sucessfully!</p>

                <p className={styles.txt}>Send payment to DAP</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p className={styles.txtNormal}>Your transaction:</p>

                <p className={styles.txtNormalB2}>0x26594a6109a5154C8E10765C5f15F4B7F54e0420</p>

                <br />
                <Link className={styles.txtNormal} to="/auctionList">
                    Back to the auction
                </Link>
            </div>
        </>
    );
};
export default PaymentResult;
