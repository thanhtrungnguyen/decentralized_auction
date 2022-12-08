const { ethers } = require("ethers");
const { createAuction } = require("./services/callContractFunction");
const auctionId = "423gfrefrg45wsf34";
const startRegistrationTime = "December 9, 2022 20:15:00";
const endRegistrationTime = "December 9, 2022 20:16:00";
const startAuctionTime = "December 9, 2022 20:17:00";
const endAuctionTime = "December 9, 2022 20:18:00";
const duePaymentTime = "December 9, 2022 20:19:00";
const registrationFee = 34;
const depositAmount = 7;
const startBid = 2;
const priceStep = 4;

const parseWei = (number) => {
    return parseInt(ethers.utils.parseEther(number.toString()).toString());
};
console.log(parseWei(4));
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
