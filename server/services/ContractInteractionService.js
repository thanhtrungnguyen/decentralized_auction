const ContractInteractionDAO = require("../dao/ContractInteractionDAO");
const { parseEther } = require("./ethereumUnitConverter");
const { getTime } = require("./timeConverter");

const getAuctionInformationById = (id) => {
    return ContractInteractionDAO.getAuctionInformationById(id).then((data) => {
        data[0].startRegistrationTime = getTime(data[0].startRegistrationTime);
        data[0].endRegistrationTime = getTime(data[0].endRegistrationTime);
        data[0].startAuctionTime = getTime(data[0].startAuctionTime);
        data[0].endAuctionTime = getTime(data[0].endAuctionTime);
        data[0].duePaymentTime = getTime(data[0].duePaymentTime);
        data[0].registrationFee = parseEther(data[0].registrationFee);
        data[0].depositAmount = parseEther(data[0].depositAmount);
        data[0].startBid = parseEther(data[0].startBid);
        data[0].priceStep = parseEther(data[0].priceStep);
        return data[0];
    });
};

module.exports = { getAuctionInformationById };
