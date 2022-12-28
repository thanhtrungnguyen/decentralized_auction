import React from "react";
import { useParams } from "react-router-dom";
import BidModalButton from "./components/BidModalButton";

const FakeAuctionDetail = () => {
    const { auctionId } = useParams();
    const propertyId = "";
    return (
        <div>
            <h1>FakeAuctionDetail</h1>
            auctionId: {auctionId}
            <BidModalButton auctionId={auctionId} propertyId={propertyId} />
        </div>
    );
};

export default FakeAuctionDetail;
