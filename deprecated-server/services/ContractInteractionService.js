const AuctionRegistrationDAO = require("../dal/AuctionRegistrationDAO");
const ContractInteractionDAO = require("../dal/ContractInteractionDAO");
const UserDAO = require("../dal/UserDAO");
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

const getAuctionBiddingById = async (auctionId) => {
    var auction = await ContractInteractionDAO.getBiddingByAuctionId(auctionId);
    var auctionsFN = [];
    await Promise.all(
        auction.map(async (item) => {
            var auction = item._doc;
            const registration = await AuctionRegistrationDAO.findUserbyWallet(item.bidder);
            const user = await UserDAO.getUserById(registration.bidderId);
            if (registration == null) {
                auction.bidderId = "___";
            } else {
                auction.bidderId = user.user.Name;
            }

            auction.bidAmount = parseEther(item.bidAmount);
            auctionsFN.push(auction);
        })
    );

    return auctionsFN;
};

const CountBidding = async () => {
    const bid = await ContractInteractionDAO.CountBidding();
    return bid;
};

const getLogsByAuctionId = async (id) => {
    return await ContractInteractionDAO.getLogsByAuctionId(id);
};
// const getAuctionBiddingById = async () => {
//     var listAuction = await ContractInteractionDAO.getPlacedBidById();
//     return listAuction;
// };
module.exports = {
    getAuctionInformationById,
    getRegisteredToBidById,
    getPlacedBidById,
    getHighestBidder,
    getAllAuction,
    getAuctionBiddingById,
    CountBidding,
    getLogsByAuctionId,
};
