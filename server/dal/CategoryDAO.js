const conn = require('./connectSF')
const createCategory = async(categoryName)=>{
    var connection = await conn();
    await connection.sobject("Category__c").create(
        {
            Name: categoryName,
        },
        (err, ret) => {
            if (err) console.error(err);
            category = ret;
        }
    );
    return category;
}
const getAllCategory  = async()=>{
    var connection = await conn();
    await connection.sobject("Category_DAP__c").find({}, (err, ret) => {
        if (err) console.error(err);
        category = ret;
    });
    return category;
}

module.exports = {createCategory,getAllCategory}