import React from "react";
import { useState } from "react";
import BidModal from "../BidModal";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useFetchData } from "../../../hooks/useFetch";
import Loader from "./Loader";
const BidModalButton = ({ auctionId, propertyId, propertyObject }) => {
    const [isOpenModal, setOpenModal] = useState(() => {
        return false;
    });
    const { loading: auctionLoading, data: auctionData, error: auctionError } = useFetchData(`/contractInteraction/createdAuction/${auctionId}`);

    const { loading: registrationLoading, data: registrationData, error: registrationError } = useFetchData(`/auctionRegistration/user/${auctionId}`);

    const { loading: propertyLoading, data: propertyData, error: propertyError } = useFetchData(`/property/${propertyId}`);
    // console.log(auctionData, propertyData);
    return (
        <>
            <div>
                {/* {(() => {
                    if (role == "BIDDER" || role == "SELLER" || role == "MANAGER" || role == "ADMIN") {
                        return ( */}
                {auctionLoading ||
                registrationLoading ||
                propertyLoading ||
                auctionData == null ||
                registrationData == null ||
                propertyData == null ? (
                    <Loader />
                ) : (
                    <button
                        className={styles.btn2}
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        Go to Auction
                    </button>
                )}

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
                        property={propertyData?.property}
                    />
                )}
            </div>
        </>
    );
};

export default BidModalButton;
