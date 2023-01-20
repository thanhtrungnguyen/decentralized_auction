import React from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetch";
import BidModalButton from "./components/BidModalButton";

const FakeAuctionDetail = () => {
    const { auctionId } = useParams();
    const { loading, data, error } = useFetchData(`/contractInteraction/createdAuction/${auctionId}`);
    // const auctionId = data?.createdAuction?.auctionId;
    const propertyId = "";

    return (
        <div>
            <h1>FakeAuctionDetail</h1>
            {loading ? (
                "Loading"
            ) : (
                <>
                    The auction:
                    <br />
                    {JSON.stringify(data, null, 2)}
                    <br />
                    <br />
                    {error ? <>{JSON.stringify(error, null, 2)}</> : ""}
                </>
            )}
            <br />
            <br />
            <br />
            <br />

            {/* {error ? <>{JSON.stringify(error, null, 2)}</> : ""} */}
            <BidModalButton auctionId={auctionId} propertyId={propertyId} />
        </div>
    );
};

export default FakeAuctionDetail;
