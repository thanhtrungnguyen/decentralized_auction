import React, { useEffect } from "react";
import { useState } from "react";
import BidModal from "../BidModal";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useFetchData } from "../../../hooks/useFetch";
const BidModalButton = ({ auctionId, propertyId, propertyObject }) => {
    const [isOpenModal, setOpenModal] = useState(() => {
        return false;
    });
    const [role, setRole] = useState();
    const { loading: auctionLoading, data: auctionData, error: auctionError } = useFetchData(`/contractInteraction/createdAuction/${auctionId}`);
    const { loading: regitrationLoading, data: registrationData, error: registrationError } = useFetchData(`/auctionRegistration/${auctionId}`);
    return (
        <>
            <div>
                {/* {(() => {
                    if (role == "BIDDER" || role == "SELLER" || role == "MANAGER" || role == "ADMIN") {
                        return ( */}
                <button
                    className={styles.btn2}
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

                {isOpenModal && (
                    <BidModal
                        setOpenModal={setOpenModal}
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
