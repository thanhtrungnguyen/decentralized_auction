const ContractInteractionDAO = require("../dal/ContractInteractionDAO");
const { parseEther } = require("../utils/ethereumUnitConverter");
const { getTime } = require("../utils/timeConverter");

const getAuctionInformationById = (id) => {
    return ContractInteractionDAO.getAuctionInformationById(id).then((data) => {
        // data[0].startRegistrationTime = getTime(data[0].startRegistrationTime);
        // data[0].endRegistrationTime = getTime(data[0].endRegistrationTime);
        // data[0].startAuctionTime = getTime(data[0].startAuctionTime);
        // data[0].endAuctionTime = getTime(data[0].endAuctionTime);
        // data[0].duePaymentTime = getTime(data[0].duePaymentTime);
        data[0].registrationFee = parseEther(data[0].registrationFee);
        data[0].depositAmount = parseEther(data[0].depositAmount);
        data[0].startBid = parseEther(data[0].startBid);
        data[0].priceStep = parseEther(data[0].priceStep);
        return data[0];
    });
};

const getBidInformationById = (id) => {
    return ContractInteractionDAO.getBidInformationById(id).then((data) => {
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
const getHighestBidder = (id) =>{
    return ContractInteractionDAO.getPlacedBidById(id).then((data) => {
        var highest = 0;
        var highestBidder = null;
        data.forEach((element) => {
            element.bidAmount = parseEther(element.bidAmount);
            if(element.bidAmount>highest){               
                highest = parseEther(element.bidAmount);
                highestBidder = element;
            }
            
        });
        return highestBidder;
    });
}

module.exports = { getAuctionInformationById, getBidInformationById, getPlacedBidById, getHighestBidder };
