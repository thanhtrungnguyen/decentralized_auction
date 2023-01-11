import React, { useEffect } from "react";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import BidModal from "../index";
import axios from "axios";
//import { useFetchBidding } from "../../../hook/useFetch";
import styles from "../../../styleCss/stylesComponents/placeABid.module.css";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
const BidModalButton = ({ auctionId, propertyId, propertyObject }) => {
    const [openModal, setOpenModal] = useState(() => {
        return false;
    });
    const [role, setRole] = useState();

    const [auction, setAuction] = useState();
    const [auctionRegistration, setAuctionRegistration] = useState();
    const fetchData = async () => {
        const baseURL = `http://localhost:5000/api/contractInteraction/createdAuction/${auctionId}`;
        const auctionRegistrationURL = `http://localhost:8800/api/auctionInformation/${auctionId}/auctionRegistration`;
        const getAuction = await axios.get(baseURL);
        const getAuctionRegistration = await axios.get(baseURL);
        await axios.all([getAuction, getAuctionRegistration]).then(
            axios.spread((...allData) => {
                console.log(allData);
                setAuction(allData[0].data.createdAuction[0]);
                setAuctionRegistration(allData[1].data);
            })
        );
    };
    const getUser = () => {
        var users = null;
        const token = Cookies.get("access_token");
        if (!token) {
            console.log("Not authenticated");
        }
        jwt.verify(token, process.env.REACT_APP_JWT, (err, user) => {
            users = user;
        });
        return users;
    };
    useEffect(() => {
        if (getUser() != null) {
            setRole(getUser().role);
        } else {
            setRole("");
        }
        fetchData();
    }, []);
    console.log(auction);
    console.log(auctionRegistration);
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
                        auction={auction}
                        auctionRegistration={auctionRegistration}
                        propertyId={propertyId}
                        propertyObject={propertyObject}
                    />
                )}
            </div>
        </>
    );
};

export default BidModalButton;
