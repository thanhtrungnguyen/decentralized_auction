const AuctionRegistrationDAO = require("../dal/AuctionRegistrationDAO");

const findByAuctionId = async (id) => {
    return await AuctionRegistrationDAO.findByAuctionId(id);
};

const createAuctionRegistration = async (dataAuctionRegistration) => {
    await AuctionRegistrationDAO.create(dataAuctionRegistration);
};

module.exports = { findByAuctionId, createAuctionRegistration };
