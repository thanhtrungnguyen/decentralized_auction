import React from "react";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import BidModal from "../index";
// import axios from "axios";
import { useFetchBidding } from "../../../hook/useFetch";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";

const BidModalButton = ({ auctionId, propertyId }) => {
    const [openModal, setOpenModal] = useState(() => {
        return false;
    });
    const [auction, setAuction] = useState();
    const [auctionRegistration, setAuctionRegistration] = useState();
    const fetchData = async () => {
        const baseURL = `http://localhost:8800/api/auctionInformation/${auctionId}`;
        const auctionRegistrationURL = `http://localhost:8800/api/auctionInformation/${auctionId}/auctionRegistration`;
        const getAuction = await axios.get(baseURL);
        const getAuctionRegistration = await axios.get(auctionRegistrationURL);
        await axios.all([getAuction, getAuctionRegistration]).then(
            axios.spread((...allData) => {
                console.log(allData);
                setAuction(allData[0].data);
                setAuctionRegistration(allData[1].data);
            })
        );
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(auction);
    console.log(auctionRegistration);
    // console.log("Auction Log", auction ? auction.auctionId );
    // console.log("Auction Registration", auctionRegistration ? auctionRegistration.auctionId );
    return (
        <>
            <div>
                <button
                    className={styles.btn}
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    {"Go to Auction"}
                </button>
                {openModal && (
                    <BidModal closeModal={setOpenModal} auction={auction} auctionRegistration={auctionRegistration} propertyId={propertyId} />
                )}
            </div>
        </>
    );
};

export default BidModalButton;
