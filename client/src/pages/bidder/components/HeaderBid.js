import { Button } from "@mui/material";
import React from "react";
import { ConnectButton } from "web3uikit";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

const HeaderBid = ({ closeModal }) => {
    return (
        <div>
            <ConnectButton moralisAuth={false} />
            <button
                onClick={() => {
                    closeModal(false);
                }}
            >
                Close
            </button>
        </div>
    );
};

export default HeaderBid;
