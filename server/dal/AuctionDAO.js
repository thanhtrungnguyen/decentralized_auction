const conn = require('./connectSF')

const createRequestAuction = async (propertyId) => {
    try {
        await conn.sobject("Auction__c").create(
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
    await conn.sobject("Property_DAP__c").update(
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
    await conn.sobject("Auction__c").update(
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
    await conn.sobject("Property_DAP__c").update(
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
    await conn.sobject("Auction__c").update(auctionApprove,
        (err, ret) => {
            if (err || !ret.success) {
                return console.error(err);
            }
        }
    );
}


const updateApproveProperty = async (propertyId) => {
    await conn.sobject("Property_DAP__c").update(
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
    var property =null;
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

const getAllAuction = async () => {
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
                if(err){
                    console.error(err);
                }
                return auctionlist = result.records[0]
                
            }
        );

    return auctionlist;
}


// exports.createRequestAuction = createRequestAuction;
// exports.updateRequestProperty = updateRequestProperty;
// exports.updateRejectAuction = updateRejectAuction;
// exports.updateRejectProperty = updateRejectProperty
module.exports = { createRequestAuction, updateRequestProperty, updateRejectAuction, updateRejectProperty, updateApproveAuction, updateApproveProperty, findPropertyById, getAllAuction, getAuctionDetailByID }