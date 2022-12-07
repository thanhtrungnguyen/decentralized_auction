const { createAuction } = require("./services/callContractFunction");
const auctionId = 2222;
const startRegistrationTime = "December 9, 2022 17:15:00";
const endRegistrationTime = "December 9, 2022 18:16:00";
const startAuctionTime = "December 9, 2022 19:17:00";
const endAuctionTime = "December 9, 2022 20:18:00";
const duePaymentTime = "December 9, 2022 21:19:00";
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
