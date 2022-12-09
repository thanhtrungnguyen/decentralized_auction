const Logs = require("../models/ContractInteraction");

const getAuctionInformationById = async (id) => {
    const auction = await Logs.find(
        {
            name: "CreatedAuction",
            auctionId: id,
        },
        {
            auctionId: 1,
            startRegistrationTime: 1,
            endRegistrationTime: 1,
            startAuctionTime: 1,
            endAuctionTime: 1,
            duePaymentTime: 1,
            registrationFee: 1,
            depositAmount: 1,
            startBid: 1,
            priceStep: 1,

            _id: 0,
            //     name: 0,
            //     logIndex: 0,
            //     transactionHash: 0,
            //     address: 0,
            //     blockHash: 0,
            //     blockTimestamp: 0,
            //     blockNumber: 0,
            //     confirmed: 0,
            //     chainId: 0,
            //     _created_at: 0,
            //     _updated_at: 0,
        }
    );
    return auction;
};

module.exports = { getAuctionInformationById };
