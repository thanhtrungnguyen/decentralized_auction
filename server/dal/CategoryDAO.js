const conn = require('./connectSF')
const perPage = 10;
const createCategory = async (categoryName) => {
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
const getAllCategory = async()=>{
    var connection = await conn();
    var categories;
    await connection.query(`Select Name from Category_DAP__c order by Name`, (err, result) => {
        if (err) console.log(err)
        categories = result.records
    })
    return categories;
}
const getAllCate = async (index, status, name) => {
    var categories, total, totalCategory;
    var query, queryCount = ''
    var num = (parseInt(index) - 1) * perPage;

    if (status == 'null' && name == 'null') {
        query = `Select Id,Name,Status__c from Category_DAP__c order by Name limit ${perPage} offset ${num}`;
        queryCount = `Select Name from Category_DAP__c order by Name`
    } else if (status == 'null') {
        query = `Select Id,Name,Status__c from Category_DAP__c Where Name like '%${name}%' order by Name limit ${perPage} offset ${num}`;
        queryCount = `Select Name from Category_DAP__c Where Name like '%${name}%' order by Name`
    } else if (name == 'null') {
        query = `Select Id,Name,Status__c from Category_DAP__c Where Status__c = '${status}' order by Name limit ${perPage} offset ${num}`;
        queryCount = `Select Name from Category_DAP__cWhere Status__c = '${status}' order by Name`
    } else {
        query = `Select Id,Name,Status__c from Category_DAP__c Where Status__c = '${status} and Name like '%${name}%' order by Name limit ${perPage} offset ${num}`;
        queryCount = `Select Name from Category_DAP__cWhere Status__c = '${status}' and Name like '%${name}%' order by Name`
    }

    var connection = await conn();
    await connection.query(query, (err, result) => {
        if (err) console.log(err)
        categories = result.records
    })
    await connection.query(queryCount, (err, result) => {
        if (err) console.log(err)
        total = result.totalSize
    })
    await connection.query('Select Name,Status__c from Category_DAP__c', (err, result) => {
        if (err) console.log(err)
        totalCategory = result.totalSize
    })

    return { categories: categories, total: total, totalCategory: totalCategory };
}

const getCategoryById = async (id) => {
    var category;
    var connection = await conn();
    await connection.query(`Select Id,Name,Status__c from Category_DAP__c where Id = '${id}' `, (err, result) => {
        if (err) console.log(err)
        category = result
    })
    return category
}
const updateCategory = async(id,name,status)=>{
    var connection = await conn();
    var rs;
    await connection.sobject("Category_DAP__c").update({
        Id: id,
        Name: name,
        Status__c: status
    },(err,result)=>{
        if(err){
            console.error(err);
        }
        rs=result
    })
    return rs;
}
const changedStatus = async(id,status)=>{
    var connection = await conn();
    var rs;
    await connection.sobject("Category_DAP__c").update({
        Id: id,
        Status__c: status
    },(err,result)=>{
        if(err){
            console.error(err);
        }
        rs=result
    })
    return rs;
}
module.exports = { createCategory, getAllCategory,getCategoryById,updateCategory,changedStatus,getAllCate }