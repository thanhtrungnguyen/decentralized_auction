const conn = require('./connectSF')
const perPage = 10;

const getAll = async (index, status, title) => {
    try {
        var connection = await conn();
        var listNews, total, totalNews = null;
        var num = (parseInt(index) - 1) * perPage;
        if (status == '' && title == '') {
            await connection.query(`Select Id, Name,Status__c, CreatedDate,LastModifiedDate from News_DAP__c order by CreatedDate desc limit ${perPage} offset ${num} `, (err, result) => {
                if (err) console.log(err)
                listNews = result.records
            })
        } else if (status == '') {
            await connection.query(`Select Id, Name,Status__c, CreatedDate,LastModifiedDate from News_DAP__c where Name like '%${title}%' order by CreatedDate desc  limit ${perPage} offset ${num} `, (err, result) => {
                if (err) console.log(err)
                listNews = result.records
            })
        } else if (title == '') {
            await connection.query(`Select Id, Name,Status__c, CreatedDate,LastModifiedDate from News_DAP__c where Status__c = '${status}' order by CreatedDate desc  limit ${perPage} offset ${num} `, (err, result) => {
                if (err) console.log(err)
                listNews = result.records
            })
        } else {
            await connection.query(`Select Id, Name,Status__c, CreatedDate,LastModifiedDate from News_DAP__c where Status__c = '${status}' and Name like '%${title}%' order by CreatedDate desc  limit ${perPage} offset ${num} `, (err, result) => {
                if (err) console.log(err)
                listNews = result.records
            })
        }
        await connection.query(`Select Id from News_DAP__c`, (err, result) => {
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
        var connection = await conn();
        var listNews, total, totalNews = null;
        var num = (parseInt(index) - 1) * perPage;
        await connection.query(`Select Id, Name,Status__c from News_DAP__c where Status__c = '${status}' order by CreatedDate desc limit ${perPage} offset ${num}`, (err, result) => {
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
const getById = async (newsId) => {

}
const filter = async (title, index, status) => {
    try {
        var listNews, total, totalNews = null;
        var num = (parseInt(index) - 1) * perPage;
        await conn.query(`Select Id, Name,Status__c from News_DAP__c where Name like '%${title}%' And Status__c = '${status}' order by CreatedDate desc limit ${perPage} offset ${num}`, (err, result) => {
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
const changeStatus = async (id, status) => {
    try {
        var connection = await conn();
        const changedStatus = await connection.sobject("News_DAP__c")
            .find({ Id: id })
            .update({
                Status__c: status
            }, (err, result) => {
                if (err) console.log(err)
            })
        return changedStatus;
    } catch (error) {
        console.error(error)
    }
}
const update = async (id, title, description, status) => {
    try {
        var connection = await conn();
        var updated = await connection.sobject("News_DAP__c")
            .find({ Id: id })
            .update({
                Name: title,
                Description__c: description,
                Status__c: status
            }, (err, result) => {
                if (err) console.log(err)
            })
        return updated;
    } catch (error) {
        console.error(error)
    }
}
const create = async (title, description) => {
    try {
        var connection = await conn();
        var created = await connection.sobject("News_DAP__c").create({
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
module.exports = { getAll, getByStatus, filter, changeStatus, update, create, getById }

