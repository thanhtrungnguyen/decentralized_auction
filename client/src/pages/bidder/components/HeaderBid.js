// import { Button } from "@mui/material";
import React from "react";
import { ConnectButton } from "web3uikit";
// import { AiOutlineClose } from "react-icons/ai";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useMoralis } from "react-moralis";

const HeaderBid = ({ setOpenModal }) => {
    return (
        <div>
            <div className={styles.connect}>
                <ConnectButton moralisAuth={false} />
                <button
                    className={styles.btnClose}
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default HeaderBid;
