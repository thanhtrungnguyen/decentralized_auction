const  auctionDAO = require("../dal/auctionDAO");

const createRequestAuction= async(propertyId,status) =>{
    try{
        await auctionDAO.createRequestAuction(propertyId,status);
    }catch(err){
        console.log(err);
    }
    
}
module.exports = {createRequestAuction}