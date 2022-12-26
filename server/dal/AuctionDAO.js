const conn = require("./connectSF");
const AuctionStatus = require("../models/AuctionStatus");
const { query } = require("express");
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
};

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
};

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
};

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
};

const updateApproveAuction = async (auctionApprove) => {
    var connection = await conn();

    await connection.sobject("Auction__c").update(auctionApprove, (err, ret) => {
        if (err || !ret.success) {
            return console.error(err);
        }
    });
};

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
};

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
};

const getAllAuction = async (index, nameProperty, category, statusAuction) => {
    var query,
        queryCount = "";
    var auctions,
        total,
        totalAuction = null;
    var num = (parseInt(index) - 1) * perPage;
    var connection = await conn();
    if (statusAuction == "null" && category == "null" && nameProperty == "null") {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c ) order by CreatedDate desc  limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c)  `;
    } else if (statusAuction == "null" && category == "null") {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Name like '%${nameProperty}%' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Name like '%${nameProperty}%' `;
    } else if (statusAuction == "null" && nameProperty == "null") {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' `;
    } else if (category == "null" && nameProperty == "null") {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r  ) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c where Status__c = '${statusAuction}' ) order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c where Status__c = '${statusAuction}') `;
    } else if (statusAuction == "null") {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' and Name like '%${nameProperty}%' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c) and Category_Id__r.Name = '${category}' and Name like '%${nameProperty}%' `;
    } else if (category == "null") {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r ) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c where Status__c = '${statusAuction}' ) and Name like '%${nameProperty}%' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r ) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c where Status__c = '${statusAuction}' ) and Name like '%${nameProperty}%' `;
    } else if (nameProperty == "null") {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r ) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c where Status__c = '${statusAuction}'  ) and Category_Id__r.Name = '${category}' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c where Status__c = '${statusAuction}') and Category_Id__r.Name = '${category}' `;
    } else {
        query = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r ) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c where Status__c = '${statusAuction}' ) and Category_Id__r.Name = '${category}' and Name like '%${nameProperty}%' order by CreatedDate desc limit ${perPage} offset ${num} `;
        queryCount = `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r) From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c FROM Auction__c where Status__c = '${statusAuction}' ) and Category_Id__r.Name = '${category}' and Name like '%${nameProperty}%' `;
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
            return (totalAuction = result.totalSize);
        }
    );
    return { listAuction: auctions, total: total, totalAuction: totalAuction };
};
const getAllAuctionBidder = async () => {
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
            return (auctionlist = result.records[0]);
        }
    );

    return auctionlist;
};

const filterAuction = async (index, status, price, sort, name) => {
    var connection = await conn();
    var auctionlist,total = null;
    var num = (parseInt(index) - 1) * 5;
    var statusQuery,
        priceQuery,sortQuery,nameQuery = "";
    var query =
        `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, ` +
        `Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, ` +
        `End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r  ) ` +
        `From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c  FROM Auction__c ` ;
    var queryCount =
        `Select Id, Name, Description__c, Category_Id__r.Name, Deposit_Amount__c, End_View_Property_Time__c, Place_View_Property__c, Price_Step__c, Start_Bid__c, ` +
        `Start_View_Property_Time__c, Status__c, User_Id__c, (Select Name From Properties_Media__r), (Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, ` +
        `End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auctions1__r  ) ` +
        `From Property_DAP__c WHERE Id IN (SELECT Property_DAP_Id__c  FROM Auction__c ` ;
    
    status == 2 ? (statusQuery = ` (Status__c = 'UpcomingforBid') `): 
    status == 3 ? (statusQuery = ` (Status__c = 'Bidding') `): 
    status == 4 ? (statusQuery = ` (Status__c = 'Closed') `): 
    status == 5 ? (statusQuery = ` (Status__c = 'UpcomingforBid' or Status__c = 'Bidding') `): 
    status == 6 ? (statusQuery = ` (Status__c = 'UpcomingforBid' or Status__c = 'Closed') `): 
    status == 7 ? (statusQuery = ` (Status__c = 'Bidding' or Status__c = 'Closed') `): 
    status == 9 ? (statusQuery = ` (Status__c = 'Bidding' or Status__c = 'UpcomingforBid' or Status__c = 'Closed') `): "";

    price == 1 ? (priceQuery = ` (Start_Bid__c <= 0.25) `): 
    price == 2 ? (priceQuery = ` (Start_Bid__c >= 0.25 and Start_Bid__c <= 0.5) `): 
    price == 3 ? (priceQuery = ` (Start_Bid__c >= 0.5 and Start_Bid__c <= 0.75) `): 
    price == 4 ? (priceQuery = ` (Start_Bid__c >= 0.75) `): "";

    name == 'null' ? nameQuery = '': nameQuery = (` (Name like '%${name}%') `)

    sort == 1 ? (sortQuery = `order by CreatedDate desc `):
    sort == 2 ? (sortQuery = `order by Start_Bid__c asc `):
    sort == 3 ? (sortQuery = `order by Start_Bid__c desc `):"";

    
    
    if (status == 'null' && price == 'null' && name == 'null'){
        query = query +  `) ${sortQuery} limit 5 offset ${num}`;
        queryCount = queryCount +  `) ${sortQuery} `;
    }else if(status == 'null' && price == 'null'){
        query = query +  `where ${nameQuery}) ` + `${sortQuery} limit 5 offset ${num}`;
        queryCount = queryCount +  `where ${nameQuery}) ` + `${sortQuery}`;
    }else if(status == 'null' && name == 'null'){
        query = query +  `) and ${priceQuery}` + `${sortQuery} limit 5 offset ${num}`;
        queryCount = queryCount +  `) and ${priceQuery}` + `${sortQuery}`;
    }else if(price == 'null'  && name == 'null'){
        query = query +  `where ${statusQuery}) ` + `${sortQuery} limit 5 offset ${num}`;
        queryCount = queryCount +  `where ${statusQuery}) ` + `${sortQuery}`;
    }else if(status == 'null' ){
        query = query + `where ${nameQuery}) ` +  `and ${priceQuery}` + `${sortQuery} limit 5 offset ${num}`;
        queryCount = queryCount + `where ${nameQuery}) ` +  `and ${priceQuery}` + `${sortQuery}`;
    }else if(price == 'null' ){
        query = query + `where ${nameQuery}` +  `and ${statusQuery}) ` + `${sortQuery} limit 5 offset ${num}`;
        queryCount = queryCount + `where ${nameQuery}` +  `and ${statusQuery}) ` + `${sortQuery}`;
    }else if(name == 'null'){
        query = query + `where ${statusQuery}) ` +  `and ${priceQuery}` + `${sortQuery} limit 5 offset ${num}`;
        queryCount = queryCount + `where ${statusQuery}) ` +  `and ${priceQuery}` + `${sortQuery}`;
    }else{
        query = query + `where ${nameQuery}` + `and ${statusQuery}) ` +  `and ${priceQuery}` + `${sortQuery} limit 5 offset ${num}`;
        queryCount = queryCount + `where ${nameQuery}` + `and ${statusQuery}) ` +  `and ${priceQuery}` + `${sortQuery}`;
    }

    await connection.query(query, function (err, result) {
        if (err) {
            return console.error(err);
        }
        // console.log("total : " + result.totalSize);
        // console.log("fetched : " + result.records.length);
        auctionlist = result.records
    });
    await connection.query(queryCount, function (err, result) {
        if (err) {
            return console.error(err);
        }
        // console.log("total : " + result.totalSize);
        // console.log("fetched : " + result.records.length);
        total = result.totalSize
    });
    return {auctionlist:auctionlist,total:total};
};

const getAuctionForUpdateStatus = async (auctionId) => {
    var connection = await conn();
    var auction = null;
    await connection.query(
        "Select Id, Name, RegistrationFee__c, Due_Payment_Time__c, End_Auction_Time__c, Start_Aution_Time__c, Start_Registration_Time__c, End_Registration_Time__c, Property_DAP_Id__c, Status__c From Auction__c where Status__c in ('Approved','RegistrationTime','Bidding', 'UpcomingforBid', 'Closed') and Id = '" +
        auctionId +
        "'",
        function (err, result) {
            if (err) {
                return console.error(err);
            }
            console.log("total : " + result.totalSize);
            console.log("fetched : " + result.records.length);
            auction = result.records[0];
        }
    );

    return auction;
};

const updateStatusForAuction = async (auctionId, status) => {
    var connection = await conn();
    await connection.sobject("Auction__c").update(
        {
            Id: auctionId,
            Status__c: status,
        },
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err);
            }
        }
    );
};
const updateStatusAuctionMongo = async (auctionId, status) => {
    await AuctionStatus.findOneAndUpdate({ auctionId: auctionId }, { status: status });
};
const createStatusAuctionMongo = async (auctionId) => {
    const newAuctionStatus = new AuctionStatus({
        auctionId: auctionId,
        status: "Approved",
    });
    await newAuctionStatus.save();
};
const findStatusAuction = async (auctionId) => {
    const status = AuctionStatus.findOne({ auctionId: auctionId });
    return status;
};

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
            return (auctionlist = result.records);
        }
    );
    return auctionlist;
};
// exports.createRequestAuction = createRequestAuction;
// exports.updateRequestProperty = updateRequestProperty;
// exports.updateRejectAuction = updateRejectAuction;
// exports.updateRejectProperty = updateRejectProperty
module.exports = {
    createRequestAuction,
    updateRequestProperty,
    updateRejectAuction,
    updateRejectProperty,
    updateApproveAuction,
    updateApproveProperty,
    findPropertyById,
    getAllAuction,
    getAuctionDetailByID,
    getAuctionForUpdateStatus,
    updateStatusForAuction,
    updateStatusAuctionMongo,
    createStatusAuctionMongo,
    findStatusAuction,
    updateStatusAuctionMongo,
    getAllAuctionBidder,
    filterAuction,
};
