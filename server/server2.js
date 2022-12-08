const { createAuction } = require("./services/callContractFunction");
const auctionId = "a0H5g000005qUxhEAE";
const startRegistrationTime = "December 8, 2022 20:15:00";
const endRegistrationTime = "December 8, 2022 20:16:00";
const startAuctionTime = "December 8, 2022 20:17:00";
const endAuctionTime = "December 8, 2022 20:18:00";
const duePaymentTime = "December 8, 2022 20:19:00";
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
);
