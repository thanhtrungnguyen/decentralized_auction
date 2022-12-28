// const jsforce = require("jsforce");
// require("dotenv").config();
// const conn = async () => {
//     var connection = await new jsforce.Connection({
//         loginUrl: process.env.SF_LOGIN_URL,
//     });

//     await connection.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(res.id);
//         }
//     });
//     return connection;
// };

// module.exports = conn;
