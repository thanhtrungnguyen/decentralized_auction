import { Button } from "@web3uikit/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import HeaderBid from "./components/HeaderBid";
import BidModal from "./index";
import axios from "axios";

const FakeAuctionDetail = () => {
    const { auctionId } = useParams() || "null";
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}`;

    const [openModal, setOpenModal] = useState(() => {
        return false;
    });

    const [auction, setAuction] = useState([]);

    useEffect(() => {
        axios
            .get(baseURL)
            .then((res) => {
                setAuction(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <div>
                <h1>Auction Detail Screen</h1>
                {auction.auctionId}
                <button
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    Fucking Bid
                </button>
                {openModal && <BidModal closeModal={setOpenModal} auction={auction} />}
            </div>
        </>
    );
};

export default FakeAuctionDetail;
