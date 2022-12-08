const jsforce = require("jsforce");
const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.id);
    }
});

const createRequestAuction= async(propertyId,status) =>{
    try{
        await conn.sobject("Auction__c").create(
            {
                Property_DAP_Id__c: propertyId,
                Status__c: status,
            },
            (err, ret) => {
                if (err || !ret.success) {
                    return console.error(err);
                }
            }
        );
    }catch(err){
        console.log(err);
    }
    
}
module.exports ={createRequestAuction}