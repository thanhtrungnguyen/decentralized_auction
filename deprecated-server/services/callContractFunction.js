require("dotenv").config();

const { ethers } = require("ethers");
const { getEpoch } = require("../utils/timeConverter");
const { parseWei } = require("../utils/ethereumUnitConverter");
const { SUPPORT_CHAINS, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS } = require("../config/SmartContract");

GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
const walletWithProvider = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, walletWithProvider);

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
};
