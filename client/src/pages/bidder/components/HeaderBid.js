import { Button } from "@mui/material";
import React from "react";
import { ConnectButton } from "web3uikit";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useMoralis, useWeb3Contract, useApiContract } from "react-moralis";

const HeaderBid = ({ closeModal }) => {
    const { account } = useMoralis();

    return (
        <div>
            <div className={styles.connect}>
                <ConnectButton moralisAuth={false} />
                <button
                    className={styles.btnClose}
                    onClick={() => {
                        closeModal(false);
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default HeaderBid;
