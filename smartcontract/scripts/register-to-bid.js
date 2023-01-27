const { ethers, network } = require("hardhat");
const { getEpoch } = require("../utils/timeConverter");
const { parseWei } = require("../utils/ethereumUnitConverter");
const { moveBlocks } = require("../utils/move-blocks");

// npx hardhat run scripts/register-to-bid.js --network goerli
registerToBid = async (auctionId) => {
    const auction = await ethers.getContract("Auction");
    console.log("Creating auction...");
    const registerToBid = await auction.registerToBid({
        auctionId,
        value: registrationFee + depositAmount,
    });
    await registerToBid.wait(1);
    console.log("The Auction registered!");
    if (network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000));
    }
};

const auctionId = "34234tgfser";
// const startRegistrationTime = getEpoch("December 11, 2022 18:47:00");
// const endRegistrationTime = getEpoch("December 11, 2022 22:16:00");
// const startAuctionTime = getEpoch("December 11, 2022 23:17:00");
// const endAuctionTime = getEpoch("December 11, 2022 23:18:00");
// const duePaymentTime = getEpoch("December 11, 2022 23:19:00");
const registrationFee = parseFloat(1);
const depositAmount = parseFloat(1);
// const startBid = parseFloat(1);
// const priceStep = parseFloat(1);
// console.log(registrationFee, depositAmount, startBid, priceStep);

registerToBid(auctionId)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
