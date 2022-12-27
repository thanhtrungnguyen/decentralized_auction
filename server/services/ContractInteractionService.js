const ContractInteractionDAO = require("../dal/ContractInteractionDAO");
const { parseEther } = require("../utils/ethereumUnitConverter");
const { getTime } = require("../utils/timeConverter");

const getAuctionInformationById = (id) => {
    return ContractInteractionDAO.getAuctionInformationById(id).then((data) => {
        if (data) {
            data.registrationFee = parseEther(data.registrationFee);
            data.depositAmount = parseEther(data.depositAmount);
            data.startBid = parseEther(data.startBid);
            data.priceStep = parseEther(data.priceStep);
        }
        return data;
    });
};

const getRegisteredToBidById = (id) => {
    return ContractInteractionDAO.getRegisteredToBidById(id).then((data) => {
        return data;
    });
};

const getPlacedBidById = (id) => {
    return ContractInteractionDAO.getPlacedBidById(id).then((data) => {
        data.forEach((element) => {
            element.bidAmount = parseEther(element.bidAmount);
        });
        return data;
    });
};
const getHighestBidder = (id) => {
    return ContractInteractionDAO.getPlacedBidById(id).then((data) => {
        var highest = 0;
        var highestBidder = null;
        data.forEach((element) => {
            element.bidAmount = parseEther(element.bidAmount);
            if (element.bidAmount > highest) {
                highest = parseEther(element.bidAmount);
                highestBidder = element;
            }
        });
        return highestBidder;
    });
};

const getAllAuction = async () => {
    var listAuction = await ContractInteractionDAO.getAllAuction();
    return listAuction;
};

module.exports = { getAuctionInformationById, getRegisteredToBidById, getPlacedBidById, getHighestBidder, getAllAuction };
