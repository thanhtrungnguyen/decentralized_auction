const bcrypt = require("bcryptjs");
const jsforce = require("jsforce");

const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
});

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_TOKEN, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        // console.log(res.id);
    }
});

const createPropertyDAO = async()=>{
    try {
        
    } catch (error) {
        console.error(error)
    }
}

// const createPropertyDAO = async()=>{
//     try {
        
//     } catch (error) {
//         console.error(error)
//     }
// }
// const createPropertyDAO = async()=>{
//     try {
        
//     } catch (error) {
//         console.error(error)
//     }
// }