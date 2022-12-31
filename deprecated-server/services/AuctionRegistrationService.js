const AuctionRegistrationDAO = require("../dal/AuctionRegistrationDAO");
const UserDAO = require("../dal/UserDAO");
const findByAuctionId = async (id) => {
    return await AuctionRegistrationDAO.findByAuctionId(id);
};
const findAuctionRegistrationByAuctionId = async (id) => {
    const registration = await AuctionRegistration.find({ auctionId: id });
    return registration;
};
const findRegisterByAuctionId = async (id) => {
    const regists =  await AuctionRegistrationDAO.findByAuctionId(id);
    var registFN = [];
    await Promise.all(
        regists.map(async (item) =>{
            var regist = item._doc;
            
             const user = await UserDAO.getUserById(regist.bidderId);

             regist.bidderName = user.user.Name;

             registFN.push(regist);
         })
    )
    return registFN;
};

const createAuctionRegistration = async (dataAuctionRegistration) => {
    await AuctionRegistrationDAO.create(dataAuctionRegistration);
};

module.exports = { findByAuctionId, createAuctionRegistration, findRegisterByAuctionId };
