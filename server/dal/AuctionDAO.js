const { query } = require('express');
const conn = require('./connectSF')
const perPage = 10;
const createRequestAuction = async (propertyId) => {
    var connection = await conn();
    try {
        await connection.sobject("Auction__c").create(
            {
                Property_DAP_Id__c: propertyId,
                Status__c: "Request",
            },
            (err, ret) => {
                if (err || !ret.success) {
                    return console.error(err);
                }
            }
        );
    } catch (err) {
        console.log(err);
    }

}

const updateRequestProperty = async (propertyId) => {
    var connection = await conn();
    await connection.sobject("Property_DAP__c").update(
        {
            Id: propertyId,
            Status__c: "Request",
        },
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err);
            }
        }
    );
}


const updateRejectAuction = async (auctionId) => {
    var connection = await conn();
    await connection.sobject("Auction__c").update(
        {
            Status__c: "Rejected",
            Id: auctionId,
        },
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err);
            }
        }
    );
}



const updateRejectProperty = async (propertyId) => {
    var connection = await conn();
    await connection.sobject("Property_DAP__c").update(
        {
            Status__c: "Rejected",
            Id: propertyId,
        },
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err);
            }
        }
    );
}

const updateApproveAuction = async (auctionApprove) => {
    var connection = await conn();

    await connection.sobject("Auction__c").update(auctionApprove,
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err);
            }
        }
    );
}


const updateApproveProperty = async (propertyId) => {
    var connection = await conn();

    await connection.sobject("Property_DAP__c").update(
        {
            Status__c: "Approved",
            Id: propertyId,
        },
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err);
            }
        }
    );
}

const findPropertyById = async (propertyId) => {
    var connection = await conn();
    var property = null;
    await connection.query(
        "Select Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Description__c, Name, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name from Properties_Media__r) from Property_DAP__c Where Id ='" +
        propertyId +
        "'",
        (err, res) => {
            if (err) return console.error(err);
            property = res.records[0];
        }
    );
    return property;
}

const getAllAuction = async (index, nameProperty, category, statusAuction) => {
    var query, queryCount = '';
    var auctions, total, totalAuction = null;
    var num = (parseInt(index) - 1) * perPage;
    var connection = await conn();
    if (statusAuction == 'null' && category == 'null' && nameProperty == 'null') {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) order by CreatedDate desc  limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c)  `
    } else if (statusAuction == 'null' && category == 'null') {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Name like '%${nameProperty}%' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Name like '%${nameProperty}%' `
    } else if (statusAuction == 'null' && nameProperty == 'null') {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' `
    } else if (category == 'null' && nameProperty == 'null') {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Status__c = '${statusAuction}' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Status__c = '${statusAuction}' `
    } else if (statusAuction == 'null') {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' and Name like '%${nameProperty}%' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' and Name like '%${nameProperty}%' `
    } else if (category == 'null') {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Status__c = '${statusAuction}' and Name like '%${nameProperty}%' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Status__c = '${statusAuction}' and Name like '%${nameProperty}%' `
    } else if (nameProperty == 'null') {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' and Status__c = '${statusAuction}' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' and Status__c = '${statusAuction}' `
    } else {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' and Status__c = '${statusAuction}' and Name like '%${nameProperty}%' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' and Status__c = '${statusAuction}' and Name like '%${nameProperty}%' `
    }
    await connection.query(query, (err, result) => {
        if (err) console.error(err);
        auctions = result.records;
    });
    await connection.query(queryCount, (err, result) => {
        if (err) console.error(err);
        total = result.totalSize;
    });
    await connection.query(
        "Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r  ) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c  FROM 	Auction__c  )",
        function (err, result) {
            if (err) {
                return console.error(err);
            }
            console.log("total : " + result.totalSize);
            console.log("fetched : " + result.records.length);
            return totalAuction = result.totalSize;
        }
    );
    return { listAuction: auctions, total: total, totalAuction: totalAuction };
}


const getAuctionDetailByID = async (auctionId, propertyId) => {
    var connection = await conn();
    var auctionlist = null;


    await connection.query(
        "Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r Where Id= '" +
        auctionId +
        "') From Property_DAP__c where Id = '" +
        propertyId +
        "'",
        function (err, result) {
            if (err) {
                console.error(err);
            }
            return auctionlist = result.records[0]

        }
    );

    return auctionlist;
}

const filterAuction = async (index, status, price) => {
    var connection = await conn();
    var auctionlist = null;
    var statusQuery, priceQuery = '';
    status == 1 ? statusQuery = `and (Status__c = 'UpcomingforBid') ` :
        status == 2 ? statusQuery = `and (Status__c = 'Bidding') ` :
            status == 3 ? statusQuery = `and (Status__c = 'Closed') ` :
                status == 4 ? statusQuery = `and (Status__c = 'UpcomingforBid' or Status__c = 'Bidding') ` :
                    status == 5 ? statusQuery = `and (Status__c = 'UpcomingforBid' or Status__c = 'Closed') ` :
                        status == 6 ? statusQuery = `and (Status__c = 'Bidding' or Status__c = 'Closed') ` :
                            status == 7 ? statusQuery = `and (Status__c = 'Bidding' or Status__c = 'UpcomingforBid' or Status__c = 'Closed') ` : '';

    price == 1 ? priceQuery = `and (Start_Bid__c <= 0.25) ` :
        price == 2 ? priceQuery = `and (Start_Bid__c >= 0.25 and Start_Bid__c <= 0.5) ` :
            price == 3 ? priceQuery = `and (Start_Bid__c >= 0.5 and Start_Bid__c <= 0.75) ` :
                price == 4 ? priceQuery = `and (Start_Bid__c >= 0.75) ` : '';

    var query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, `
        + `Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, `
        + `End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r  ) `
        + `From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c  FROM Auction__c) `
        + `${statusQuery}`
        + `${priceQuery}`
    await connection.query(query
        ,
        function (err, result) {
            if (err) {
                return console.error(err);
            }
            console.log("total : " + result.totalSize);
            console.log("fetched : " + result.records.length);
            return auctionlist = result.records;
        }
    );
    return auctionlist;
}

const sortAuction = async () => {
    var connection = await conn();
    var auctionlist = null;
    await connection.query(
        "Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r  ) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c  FROM 	Auction__c  )",
        function (err, result) {
            if (err) {
                return console.error(err);
            }
            console.log("total : " + result.totalSize);
            console.log("fetched : " + result.records.length);
            return auctionlist = result.records;
        }
    );
    return auctionlist;
}
// exports.createRequestAuction = createRequestAuction;
// exports.updateRequestProperty = updateRequestProperty;
// exports.updateRejectAuction = updateRejectAuction;
// exports.updateRejectProperty = updateRejectProperty
module.exports = { createRequestAuction, updateRequestProperty, updateRejectAuction, updateRejectProperty, updateApproveAuction, updateApproveProperty, findPropertyById, getAllAuction, getAuctionDetailByID, filterAuction }