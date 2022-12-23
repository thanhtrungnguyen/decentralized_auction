const UserService = require('../services/UserService')

// get All 
const getAllUser = async (req, res, next) => {
    try {
        var role = req.params.role;
        var index = req.params.index;
        var status = req.params.status;
        var name = req.params.email;
        var list =  await UserService.getAllUser(role,index,status,name)
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}
// 
const getUserById = async(req,res,next) =>{
    try {
        var userId = req.params.userId;
        var user = await UserService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
} 
const updateProfileBidder = async(req,res,next) =>{
    try {
        var userId = req.params.userId;
        const files = req.files;
        const account = {
            Name: req.body.organizationName,
            //Company_Certificate__c: req.body.certificateCompany,
            //Employees__c:
            //Phone__c:
            Specific_Address__c: req.body.specificAddressOrganization,
            Tax_Code__c: req.body.taxCode,
            Tax_Code_Granted_Date__c: req.body.taxCodeGrantedDate,
            Tax_Code_Granted_Place__c: req.body.taxCodeGrantedPlace,
            //Website__c:
            Position: req.body.position,
        }
        const contact = {
            Name: req.body.firstName + " " + req.body.lastName,
            First_Name__c: req.body.firstName,
            Last_Name__c: req.body.lastName,
            Gender__c: req.body.gender,
            Email__c: req.body.email,
            Date_Of_Birth__c: req.body.dateOfBirth,
            Phone__c: req.body.phone,
            Wards__c: req.body.ward,
            City__c: req.body.city,
            District__c: req.body.district,
            Address__c: req.body.specificAddress,
            Card_Number__c: req.body.cardNumber,
            Card_Granted_Date__c: req.body.dateRangeCard,
            Card_Granted_Place__c: req.body.cardGrantedPlace,
        }
        var isUpdate = await UserService.updateProfileBidder(userId,contact,account,files);
        res.status(200).json(isUpdate);
    } catch (error) {
        next(error)
    }
} 
module.exports = {getAllUser,getUserById,updateProfileBidder}