import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BidModal from "../index";
import axios from "axios";
import { useFetchBidding } from "../../../hook/useFetch";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

const BidModalButton = ({ auctionId, propertyId }) => {
    const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}`;
    const auctionRegistrationURL = `http://localhost:8800/api/auctionInformation/${auctionId}/auctionRegistration`;
    const [openModal, setOpenModal] = useState(() => {
        return false;
    });

    const { loading, data: auction, error1 } = useFetchBidding(baseURL);
    const { loading: loadingAuctionRegistration, data: auctionRegistration, error2 } = useFetchBidding(auctionRegistrationURL);

    console.log("Auction Log", auction ? auction.auctionId : `Not Found Auction Log: ${error1}`);
    console.log("Auction Registration", auctionRegistration ? auctionRegistration.auctionId : `Not Found Auction Registration: ${error2}`);
    return (
        <>
            <div>
                <button
                    className={styles.btn}
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    {loading || loadingAuctionRegistration ? "Loading" : "Go to Auction"}
                </button>
                {openModal && (
                    <BidModal
                        closeModal={setOpenModal}
                        loading={loading}
                        auction={auction}
                        auctionRegistration={auctionRegistration}
                        propertyId={propertyId}
                    />
                )}
            </div>
        </>
    );
};

export default BidModalButton;
