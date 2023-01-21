const { ethers, network } = require("hardhat");
const { getEpoch } = require("../utils/timeConverter");
const { parseWei } = require("../utils/ethereumUnitConverter");
const { moveBlocks } = require("../utils/move-blocks");
const ABI = require("./contractAbi.json");
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
    const auctionContract = await ethers.getContract("Auction");
    console.log("Creating auction...");
    const createAuction = await auctionContract.createAuction(
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

    console.log("Tx hash: ", createAuction.hash);
    const tx = await createAuction.wait(1);

    console.log("from", tx.from);
    console.log("to", tx.to);
    console.log("transactionHash", tx.transactionHash);
    console.log("blockHash", tx.blockHash);
    console.log("logs", tx.logs);
    // const iface = new ethers.utils.Interface(ABI);
    // let decodedData = iface.parseTransaction({ data: tx.data, value: tx.value });
    // console.log("decodedData");
    // console.log(decodedData);

    if (network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000));
    }
};

const auctionId = "63bfc0488059a4gffds222c499";
const startRegistrationTime = getEpoch("January 14, 2033 22:04:19");
const endRegistrationTime = getEpoch("January 14, 2033 22:10:00");
const startAuctionTime = getEpoch("January 14, 2033 22:10:10");
const endAuctionTime = getEpoch("January 14, 2033 22:32:00");
const duePaymentTime = getEpoch("January 15, 2033 22:59:00");
const registrationFee = parseWei(0.00001);
const depositAmount = parseWei(0.002);
const startBid = parseWei(0.005);
const priceStep = parseWei(0.00001);

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
