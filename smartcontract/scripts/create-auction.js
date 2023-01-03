const { ethers, network } = require("hardhat");
const { getEpoch } = require("../utils/timeConverter");
const { parseWei } = require("../utils/ethereumUnitConverter");
const { moveBlocks } = require("../utils/move-blocks");

// npx hardhat run scripts/create-auction.js --network goerli
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

const auctionId = "he6hyre";
const startRegistrationTime = getEpoch("December 29, 2023 12:25:19");
const endRegistrationTime = getEpoch("December 29, 2023 12:28:00");
const startAuctionTime = getEpoch("December 29, 2023 12:28:10");
const endAuctionTime = getEpoch("December 29, 2023 12:32:00");
const duePaymentTime = getEpoch("December 31, 2023 21:59:00");
const registrationFee = parseWei(0.00001);
const depositAmount = parseWei(0.002);
const startBid = parseWei(0.005);
const priceStep = parseWei(0.00001);
// console.log(
//     startRegistrationTime,
//     endRegistrationTime,
//     startAuctionTime,
//     endAuctionTime,
//     duePaymentTime,
//     registrationFee,
//     depositAmount,
//     startBid,
//     priceStep
// );

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
