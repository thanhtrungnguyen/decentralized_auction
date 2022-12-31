
const AuthDAO = require('../../dal/AuthDAO');
const  {expect, test} = require('@jest/globals')

const { getAllAuction, findPropertyById } = require('../../dal/auctionDAO');



require("dotenv").config();


// const chai = require('chai');
// const expect = chai.expect;
// const assert = chai.assert;


test('create findPropertyById()', async()=>{
    var test =null;
    expect(await findPropertyById('a0O5g00000AOUggEAH')).toBeDefined();
})


// test('function getAllAuction() ', async ()=>{
   
//       user= {userName:'long0912', password:'long091'};


//        expect(await getAllAuction()).toBeDefined();

        
    
// })
// describe('my beverage', async() => {

//     // it('is delicious', async () => {
//     //     user= {userName:'long0912', password:'long091'};
//     //     const record =  await AuthDAO.createUser(user);
//     //    await assert.typeOf(record, 'string');
//     // });
//      it('should have a client secret', () => {
//         assert.equal(process.env.JWT, 'dhgaasdiq231231wdahuioSDHFYGUIAFUIAF12345');       
//     })
// });


