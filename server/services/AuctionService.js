const auctionDAO = require("../dal/auctionDAO");
const { createAuction } = require("./callContractFunction");

const createRequestAuction = async (propertyId) => {
    try {
        await auctionDAO.createRequestAuction(propertyId);

        await auctionDAO.updateRequestProperty(propertyId);
    } catch (err) {
        console.log(err);
    }
};

const updateRejectAuction = async (auctionId, propertyId) => {
    try {
        await auctionDAO.updateRejectAuction(auctionId);

        await auctionDAO.updateRejectProperty(propertyId);
    } catch (err) {
        console.log(err);
    }
};

const approveAuction = async (auction) => {
    var property;

    var startRegistrationTime = new Date(auction.timeSTRegist);
    var startRegistrationTimeVN = startRegistrationTime.setTime(startRegistrationTime.getTime() + 7 * 60 * 60 * 1000);
    var startRegistrationTimeFN = new Date(startRegistrationTimeVN).toISOString();
    var startRegistrationTimeFN1 = new Date(startRegistrationTimeVN).toUTCString();

    var endRegistrationTime = new Date(auction.timeENRegist);
    var endRegistrationTimeVN = endRegistrationTime.setTime(endRegistrationTime.getTime() + 7 * 60 * 60 * 1000);
    var endRegistrationTimeFN = new Date(endRegistrationTimeVN).toISOString();
    var endRegistrationTimeFN1 = new Date(endRegistrationTimeVN).toUTCString();

    var startAuctionTime = new Date(auction.timeSTAuction);
    var startAuctionTimeVN = startAuctionTime.setTime(startAuctionTime.getTime() + 7 * 60 * 60 * 1000);
    var startAuctionTimeFN = new Date(startAuctionTimeVN).toISOString();
    var startAuctionTimeFN1 = new Date(startAuctionTimeVN).toUTCString();

    var endAuctionTime = new Date(auction.timeENAuction);
    var endAuctionTimeVN = endAuctionTime.setTime(endAuctionTime.getTime() + 7 * 60 * 60 * 1000);
    var endAuctionTimeFN = new Date(endAuctionTimeVN).toISOString();
    var endAuctionTimeFN1 = new Date(endAuctionTimeVN).toUTCString();

    var paymentTime = new Date(auction.paymentTime);
    var paymentTimeVN = paymentTime.setTime(paymentTime.getTime() + 7 * 60 * 60 * 1000);
    var paymentTimeFN = new Date(paymentTimeVN).toISOString();
    var paymentTimeFN1 = new Date(paymentTimeVN).toUTCString();

    console.log(startRegistrationTimeFN + startRegistrationTimeFN1);

    var auctionApprove = {
        Status__c: "Approved",
        Id: auction.auctionId,
        Name: auction.auctionName,
        Start_Registration_Time__c: startRegistrationTimeFN,
        Start_Aution_Time__c: startAuctionTimeFN,
        RegistrationFee__c: auction.registrationFee,
        End_Registration_Time__c: endRegistrationTimeFN,
        End_Auction_Time__c: endAuctionTimeFN,
        Due_Payment_Time__c: paymentTimeFN,
    };

    await auctionDAO.updateApproveAuction(auctionApprove);

    await auctionDAO.updateApproveProperty(auction.propertyId);

    property = await auctionDAO.findPropertyById(auction.propertyId);

    await createAuction(
        auction.auctionId,
        auction.timeSTRegist,
        auction.timeENRegist,
        auction.timeSTAuction,
        auction.timeENAuction,
        auction.paymentTime,
        parseFloat(auction.registrationFee),
        property.Deposit_Amount__c,
        property.Start_Bid__c,
        property.Price_Step__c
    );
};

const getAllAuction = async () => {
    var auctionList = await auctionDAO.getAllAuction();
    return auctionList;
};

const getAuctionDetailByID = async (auctionId, propertyId) => {
    var data = await auctionDAO.getAuctionDetailByID(auctionId, propertyId);
    return data;
};

// exports.createRequestAuction = createRequestAuction;
// exports.updateRejectAuction = updateRejectAuction

module.exports = { createRequestAuction, updateRejectAuction, approveAuction, getAllAuction, getAuctionDetailByID };
