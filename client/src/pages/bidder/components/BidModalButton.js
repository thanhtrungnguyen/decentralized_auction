import React, { useEffect } from "react";
import { useState } from "react";
import BidModal from "../BidModal";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useFetchData } from "../../../hook/useFetch";
const BidModalButton = ({ auctionId, propertyId, propertyObject }) => {
    const [openModal, setOpenModal] = useState(() => {
        return false;
    });
    const [role, setRole] = useState();

    const [auction, setAuction] = useState();
    const [auctionRegistration, setAuctionRegistration] = useState();
    const { loading: auctionLoading, data: auctionData, error: auctionError } = useFetchData(`/contractInteraction/createdAuction/${auctionId}`);
    const { loading: regitrationLoading, data: registrationData, error: registrationError } = useFetchData(`/auctionRegistration/${auctionId}`);
    console.log("data1", auctionData);
    console.log("data2", registrationData);
    // console.log("Auction Log", auction ? auction.auctionId );
    // console.log("Auction Registration", auctionRegistration ? auctionRegistration.auctionId );
    return (
        <>
            <div>
                {/* {(() => {
                    if (role == "BIDDER" || role == "SELLER" || role == "MANAGER" || role == "ADMIN") {
                        return ( */}
                <button
                    className={styles.btn}
                    onClick={() => {
                        setOpenModal(true);
                    }}
                >
                    {"Go to Auction"}
                </button>
                {/* );
                    } else {
                        return <p>Please login</p>;
                    }
                })()} */}

                {openModal && (
                    <BidModal
                        closeModal={setOpenModal}
                        auction={auctionData?.createdAuction}
                        auctionRegistration={registrationData?.auctionRegistration}
                        propertyId={propertyId}
                        propertyObject={propertyObject}
                    />
                )}
            </div>
        </>
    );
};

export default BidModalButton;
