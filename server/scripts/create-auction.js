const { ethers, network } = require("hardhat");
const { getEpoch } = require("../services/timeConverter");
const { moveBlocks } = require("../utils/move-blocks");

createAuction = async (
    auctionId,
    startRegistrationTime,
    endRegistrationTime,
    startAuctionTime,
    endAuctionTime,
    duePaymentTime,
    registrationFee,
    depositAmount,
    startBid,
    priceStep
) => {
    const auction = await ethers.getContract("Auction");
    console.log("Creating auction...");
    const createAuction = await auction.createAuction(
        auctionId,
        startRegistrationTime,
        endRegistrationTime,
        startAuctionTime,
        endAuctionTime,
        duePaymentTime,
        registrationFee,
        depositAmount,
        startBid,
        priceStep
    );
    await createAuction.wait(1);
    console.log("The Auction created!");
    if (network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000));
    }
};

const auctionId = 4;
const startRegistrationTime = getEpoch("December 9, 2022 17:15:00");
const endRegistrationTime = getEpoch("December 9, 2022 18:16:00");
const startAuctionTime = getEpoch("December 9, 2022 19:17:00");
const endAuctionTime = getEpoch("December 9, 2022 20:18:00");
const duePaymentTime = getEpoch("December 9, 2022 21:19:00");
const registrationFee = 10;
const depositAmount = 200;
const startBid = 500;
const priceStep = 1;

createAuction(
    auctionId,
    startRegistrationTime,
    endRegistrationTime,
    startAuctionTime,
    endAuctionTime,
    duePaymentTime,
    registrationFee,
    depositAmount,
    startBid,
    priceStep
)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
