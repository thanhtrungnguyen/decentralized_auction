import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import BidModalButton from "./components/BidModalButton";

const FakeAuctionDetail = () => {
    const { auctionId } = useParams();
    const { data, loading, error, reFetch } = useFetch(`/contractInteraction/createdAuction/${auctionId}`);
    const propertyId = "";
    return (
        <div>
            <h1>FakeAuctionDetail</h1>
            data: {data}
            <BidModalButton auctionId={auctionId} propertyId={propertyId} />
        </div>
    );
};

export default FakeAuctionDetail;
