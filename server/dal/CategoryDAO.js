const conn = require('./connectSF')
const createCategory = async(categoryName)=>{
    await conn.sobject("Category__c").create(
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
    await conn.sobject("Category_DAP__c").find({}, (err, ret) => {
        if (err) console.error(err);
        category = ret;
    });
    return category;
}

module.exports = {createCategory,getAllCategory}