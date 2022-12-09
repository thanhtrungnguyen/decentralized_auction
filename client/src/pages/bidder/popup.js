import { Button } from "@web3uikit/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import HeaderBid from "../../components/header/HeaderBid";
import PlaceBid from "./popup/PlaceBid";

const PlaceBidButton = () => {
    const { auctionId } = useParams();
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}`;
    const { data, loading, error } = useFetch(baseURL);
    const [buttonPopup, setButtonPopup] = useState(() => {
        return false;
    });
    console.log(data);
    const setPopupTrue = () => {
        setButtonPopup(true);
    };

    return (
        <>
            <h1>Popup Bid</h1>
            <HeaderBid />
            <PlaceBid />
        </>
    );
};

export default PlaceBidButton;
