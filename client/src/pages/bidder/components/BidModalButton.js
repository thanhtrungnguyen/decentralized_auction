import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BidModal from "../index";
import axios from "axios";

const BidModalButton = ({ auctionId, propertyId }) => {
    //     const { auctionId } = useParams() || "null";
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
                <button
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    Fucking Bid
                </button>
                {openModal && <BidModal closeModal={setOpenModal} auctionId={auctionId} propertyId={propertyId} />}
            </div>
        </>
    );
};

export default BidModalButton;
