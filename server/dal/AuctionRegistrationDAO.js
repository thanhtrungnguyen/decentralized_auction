const AuctionRegistration = require("../models/AuctionRegistration");

const findAuctionRegistrationByAuctionId = async (id) => {
    const registration = await AuctionRegistration.find({ auctionId: id });
    return registration;
};

const createAuctionRegistration = async (dataAuctionRegistration) => {
    const auctionRegistration = new AuctionRegistration(dataAuctionRegistration);
    const create = await auctionRegistration.save();
};

module.exports = {
    findByAuctionId: findAuctionRegistrationByAuctionId,
    create: createAuctionRegistration,
};
