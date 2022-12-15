const abi = require("../constants/contractAbi.json");
const contractAddress = require("../constants/contractAddress.json");
const { ethers } = require("ethers");
const { getEpoch } = require("../utils/timeConverter");
const { parseWei } = require("../utils/ethereumUnitConverter");
const {} = require("moralis");
const { parseWei } = require("../utils/ethereumUnitConverter");
require("dotenv").config();

const GOERLI_RPC_URL = "https://eth-goerli.g.alchemy.com/v2/Bt82l8JDTtigrUmMLXl53vCpn1AGkpaR";
const PRIVATE_KEY = "c5d66181926a3c32258d127d307bddb3d0e9f99671f9080b44d440c4119ed7fd";

const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
const walletWithProvider = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, abi, walletWithProvider);

// const auctionId = 6
// const startRegistrationTime = getEpoch("December 9, 2022 17:15:00")
// const endRegistrationTime = getEpoch("December 9, 2022 18:16:00")
// const startAuctionTime = getEpoch("December 9, 2022 19:17:00")
// const endAuctionTime = getEpoch("December 9, 2022 20:18:00")
// const duePaymentTime = getEpoch("December 9, 2022 21:19:00")
// const registrationFee = 10
// const depositAmount = 200
// const startBid = 500
// const priceStep = 1

const createAuction = async (
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
    try {
        console.log("Creating auction on smartcontract...");
        console.log(
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
        const startRegistrationTimeGotEpoch = getEpoch(startRegistrationTime);
        const endRegistrationTimeGotEpoch = getEpoch(endRegistrationTime);
        const startAuctionTimeGotEpoch = getEpoch(startAuctionTime);
        const endAuctionTimeGotEpoch = getEpoch(endAuctionTime);
        const duePaymentTimeGotEpoch = getEpoch(duePaymentTime);
        const registrationFeeParsed = parseWei(registrationFee);
        const depositAmountParsed = parseWei(depositAmount);
        const startBidParsed = parseWei(startBid);
        const priceStepParsed = parseWei(priceStep);
        await contract.createAuction(
            auctionId,
            startRegistrationTimeGotEpoch,
            endRegistrationTimeGotEpoch,
            startAuctionTimeGotEpoch,
            endAuctionTimeGotEpoch,
            duePaymentTimeGotEpoch,
            registrationFeeParsed,
            depositAmountParsed,
            startBidParsed,
            priceStepParsed
        );
        console.log("The auction created on smartcontract!!!");
    } catch (error) {
        console.log(error);
    }
};

// callFunction()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })

module.exports = {
    createAuction,
};
