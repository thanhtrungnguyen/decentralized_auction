const jsforce = require("jsforce");

var conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        // console.log(res.id);
    }
});

module.exports = conn