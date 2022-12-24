require("dotenv").config();

const { ethers } = require("ethers");
const { getEpoch } = require("../utils/timeConverter");
const { parseWei } = require("../utils/ethereumUnitConverter");
const abi = require("../constants/contractAbi.json");
const contractAddress = require("../constants/contractAddress.json");

GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
PRIVATE_KEY = process.env.PRIVATE_KEY;
const chainId = 5;
const index = 0;

const address = contractAddress[chainId][index];
const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
const walletWithProvider = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(address, abi, walletWithProvider);

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
        const startRegistrationTimeGotEpoch = getEpoch(startRegistrationTime);
        const endRegistrationTimeGotEpoch = getEpoch(endRegistrationTime);
        const startAuctionTimeGotEpoch = getEpoch(startAuctionTime);
        const endAuctionTimeGotEpoch = getEpoch(endAuctionTime);
        const duePaymentTimeGotEpoch = getEpoch(duePaymentTime);
        const registrationFeeParsed = parseWei(registrationFee);
        const depositAmountParsed = parseWei(depositAmount);
        const startBidParsed = parseWei(startBid);
        const priceStepParsed = parseWei(priceStep);
        // console.log(
        //     auctionId,
        //     startRegistrationTimeGotEpoch,
        //     endRegistrationTimeGotEpoch,
        //     startAuctionTimeGotEpoch,
        //     endAuctionTimeGotEpoch,
        //     duePaymentTimeGotEpoch,
        //     registrationFeeParsed,
        //     depositAmountParsed,
        //     startBidParsed,
        //     priceStepParsed
        // );
        const result = await contract.createAuction(
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
        console.log(result);
    } catch (error) {
        console.error("Execute reverted! ");
    }
};

module.exports = {
    createAuction,
    address,
};
