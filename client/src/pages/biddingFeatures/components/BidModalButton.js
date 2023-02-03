import React from "react";
import { useState } from "react";
import BidModal from "../BidModal";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import { useFetchData } from "../../../hooks/useFetch";
import Loader from "./Loader";
const BidModalButton = ({ auctionId, propertyId }) => {
    const [isOpenModal, setOpenModal] = useState(() => {
        return false;
    });
    const { loading: auctionLoading, data: auctionData, error: auctionError } = useFetchData(`/contractInteraction/createdAuction/${auctionId}`);

    const { loading: propertyLoading, data: propertyData, error: propertyError } = useFetchData(`/property/${propertyId}`);

    const { loading: userLoading, data: userData, error: userError } = useFetchData(`/session`);
    console.log(userData?.user?.role);

    return (
        <>
            <div>
                {auctionLoading || propertyLoading || userLoading ? (
                    <Loader />
                ) : userData?.user?.role === "bidder" ? (
                    <button
                        className={styles.btn2}
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        Go to Auction
                    </button>
                ) : (
                    <p>Sign in to continue</p>
                )}
                {isOpenModal && <BidModal setOpenModal={setOpenModal} auction={auctionData?.createdAuction} property={propertyData?.property} />}
            </div>
        </>
    );
};

export default BidModalButton;
