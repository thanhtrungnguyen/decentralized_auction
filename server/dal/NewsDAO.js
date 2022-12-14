const conn = require('./connectSF')
const perPage = 10;

const getAll = async (index) => {
    try {
        var listNews, total, totalNews = null;
        var num = (parseInt(index) - 1) * perPage;
        await conn.query(`Select Id, Name,Status__c, CreatedDate,LastModifiedDate from News_DAP__c order by CreatedDate desc limit ${perPage} offset ${num} `, (err, result) => {
            if (err) console.log(err)
            listNews = result.records
        })
        await conn.query(`Select Id from News_DAP__c`, (err, result) => {
            if (err) console.log(err)
            total = result;
            totalNews = total.totalSize;
        })
        return { listNews: listNews, totalNews: totalNews }
    } catch (error) {
        console.error(error);
    }
}
const getByStatus = async (index, status) => {
    try {
        var listNews, total, totalNews = null;
        var num = (parseInt(index) - 1) * perPage;
        await conn.query(`Select Id, Name,Status__c from News_DAP__c where Status__c = '${status}' order by CreatedDate desc limit ${perPage} offset ${num}`, (err, result) => {
            if (err) console.log(err)
            listNews = result
        })
        await conn.query(`Select Id from News_DAP__c`, (err, result) => {
            if (err) console.log(err)
            total = result;
            totalNews = total.totalSize;
        })
        return { listNews: listNews, totalNews: totalNews }
    } catch (error) {
        console.error(error)
    }
}
const filter = async (title,index,status)=>{
    try {
        var listNews,total, totalNews = null;
        var num = (parseInt(index) - 1)*perPage;
        await conn.query(`Select Id, Name,Status__c from News_DAP__c where Name like '%${title}%' And Status__c = '${status}' order by CreatedDate desc limit ${perPage} offset ${num}`,(err, result) => {
            if (err) console.log(err)
            listNews = result
        })                
        await conn.query(`Select Id from News_DAP__c`, (err, result) => {
            if (err) console.log(err)
            total = result;
            totalNews = total.totalSize;
        })
        return { listNews: listNews, totalNews: totalNews }
    } catch (error) {
        console.error(error)
    }
}
const changeStatus = async (id,status)=>{
    try {
       const changedStatus =  await conn.sobject("News_DAP__c")
            .find({ Id: id })
            .update({
                Status__c: status
            },(err, result) => {
                if (err) console.log(err)
            })
        return changedStatus;
    } catch (error) {
        console.error(error)
    }
}
const update = async (id,title,description,status)=>{
    try {
        var updated = await conn.sobject("News_DAP__c")
                .find({ Id: id })
                .update({
                    Name: title,
                    Description__c: description,
                    Status__c: status
                },(err, result) => {
                    if (err) console.log(err)
                })
                return updated;
    } catch (error) {
        console.error(error)
    }
}
const create = async (title,description)=>{
    try {
        var created = await conn.sobject("News_DAP__c").create({
            Name: title,
            Description__c: description,
            Status__c: 'Published'
        }, (err, result) => {
            if (err) console.log(err)
        })
        return created;
    } catch (error) {
        console.error(error)
    }
}
module.exports = { getAll, getByStatus,filter,changeStatus,update,create }

