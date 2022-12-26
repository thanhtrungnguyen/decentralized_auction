import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BidModal from "../index";
import axios from "axios";
import { useFetchBidding } from "../../../hook/useFetch";

const BidModalButton = ({ auctionId, propertyId }) => {
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}`;

    const [openModal, setOpenModal] = useState(() => {
        return false;
    });

    const { loading, data: auction, error } = useFetchBidding(baseURL);

    return (
        <>
            <div>
                <button
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    {loading ? "Loading" : "Go to Auction"}
                </button>
                {openModal && <BidModal closeModal={setOpenModal} loading={loading} auction={auction} propertyId={propertyId} />}
            </div>
        </>
    );
};

export default BidModalButton;
