const jsforce = require("jsforce");
const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL
})

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err)
    } else {
        console.log(res.id)
    }
})

// Create News
const createNews = async (req, res, next) => {
    try {
        if (conn) {
            await conn.sobject("News_DAP__c").create({
                Name: req.body.title,
                Description__c: req.body.description,
                Status__c: 'Published'
            }, (err, result) => {
                if (err) console.log(err)
            })
        } else {
            console.log("Connection failed with salesforce");
        }
        res.status(200).send("News has been created.");
    } catch (error) {
        next(error)
    }
}
// Update News
const updateNews = async (req, res, next) => {
    try {
        if (conn) {
            await conn.sobject("News_DAP__c")
                .find({ Id: req.params.id })
                .update({
                    Name: req.body.title,
                    Description__c: req.body.description,
                    Status__c: req.body.status
                },(err, result) => {
                    if (err) console.log(err)
                })
        } else {
            console.log("Connection failed with salesforce");
        }
        res.status(200).send("News has been updated.");
    } catch (error) {
        next(error)
    }
}
// Change Status News
const changeStatusNews = async (req, res, next) => {
    try {
        if (conn) {
            await conn.sobject("News_DAP__c")
                .find({ Id: req.params.id })
                .update({
                    Status__c: req.body.status
                },(err, result) => {
                    if (err) console.log(err)
                })
        } else {
            console.log("Connection failed with salesforce");
        }
        res.status(200).send("News has been changed status.");
    } catch (error) {
        next(error)
    }
}
// Get All News
const getAllNews = async (req, res, next) => {
    try {
        var listNews = null;
        if (conn) {
            await conn.query("Select Id, Name,Status__c from News_DAP__c",(err, result) => {
                if (err) console.log(err)
                listNews = result
            })                
        } else {
            console.log("Connection failed with salesforce");
        }
        res.status(200).json(listNews);
    } catch (error) {
        next(error)
    }
}
// Filter News
const filterNews = async (req, res, next) => {
    try {
        var listNews = null;
        if (conn) {
            await conn.query(`Select Id, Name,Status__c from News_DAP__c where Name like '%${req.params.title}%' And Status__c = '${req.params.status}'`,(err, result) => {
                if (err) console.log(err)
                listNews = result
            })                
        } else {
            console.log("Connection failed with salesforce");
        }
        res.status(200).json(listNews);
    } catch (error) {
        next(error)
    }
}
const getByStatus = async (req, res, next) => {
    try {
        var listNews = null;
        if (conn) {
            await conn.query(`Select Id, Name,Status__c from News_DAP__c where Status__c = '${req.params.status}'`,(err, result) => {
                if (err) console.log(err)
                listNews = result
            })                
        } else {
            console.log("Connection failed with salesforce");
        }
        res.status(200).json(listNews);
    } catch (error) {
        next(error)
    }
}

module.exports = {changeStatusNews,createNews,updateNews,getAllNews,filterNews,getByStatus}