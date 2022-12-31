const socketio = require("socket.io");
const { Server } = require("socket.io");
const http = require("http");
const jsforce = require("jsforce");
const ContractInteractionService = require("./services/ContractInteractionService");
const AuctionService = require("./services/AuctionService");
const cron = require("node-cron");
require("dotenv").config();

module.exports = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT"],
        },
    });
    let interval;
    // var auctionLastest = AuctionService.getAllAuction();

    if (interval) {
        clearInterval(interval);
    }
    var auctionIdlocal;
    io.on("connection", (socket) => {
        // socket.on("disconnect", function () {});

        socket.on("send_message", async (data) => {
            let highest = 0;
            auctionIdlocal = data.auctionId;
            await ContractInteractionService.getPlacedBidById(data.auctionId)
                .then(async (item) => {
                    item?.map((element) => {
                        if (element.bidAmount > highest) {
                            highest = element.bidAmount;
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            io.emit("receive_message", { auction: data.auctionId, highest: highest });
        });

        // auctionlist = await AuctionService.getAllAuction();

        // if (auctionLastest != auctionlist) {
        //     io.emit('data', auctionlist);
        //     auctionLastest = auctionlist;
        // }
    });
    io.on("error", (err) => {
        console.log("Caught flash policy server socket error: ");
        console.log(err.stack);
    });

    var i = 0;
    // const taskRegistrationTime = cron.schedule("*/3 * * * * *", async () => {
    //     var auctionlistUpdate = await ContractInteractionService.getAllAuction();
    //     auctionlistUpdate.map(async (auction) => {
    //         var timeStartRegistrationFN = new Date(0).setUTCSeconds(parseInt(auction._doc.startRegistrationTime));
    //         var timeEndRegistrationFN = new Date(0).setUTCSeconds(parseInt(auction._doc.endRegistrationTime));
    //         var timeStartAuctionFN = new Date(0).setUTCSeconds(parseInt(auction._doc.startAuctionTime));
    //         var timeEndAuctionFN = new Date(0).setUTCSeconds(parseInt(auction._doc.endAuctionTime));
    //         var duePaymentTimeFN = new Date(0).setUTCSeconds(parseInt(auction._doc.duePaymentTime));
    //         var currentTime = new Date();
    //         //console.log(currentTime-duePaymentTimeFN>0);
    //         if (currentTime - timeStartRegistrationFN >= 0 && currentTime - timeEndRegistrationFN <= 0) {
    //             var auctionget = await AuctionService.findStatusAuction(auction._doc.auctionId);
    //             if (auctionget.status != "RegistrationTime") {
    //                 await AuctionService.updateStatusAuctionMongo(auction._doc.auctionId, "RegistrationTime");
    //                 await AuctionService.updateStatusForAuction(auction._doc.auctionId, "RegistrationTime");
    //                 i = i + 1;
    //                 io.emit("data", i);
    //             }
    //         }
    //         if (currentTime - timeEndRegistrationFN > 0 && currentTime - timeStartAuctionFN < 0) {
    //             var auctionget = await AuctionService.findStatusAuction(auction._doc.auctionId);
    //             if (auctionget.status != "UpcomingforBid") {
    //                 await AuctionService.updateStatusAuctionMongo(auction._doc.auctionId, "UpcomingforBid");
    //                 await AuctionService.updateStatusForAuction(auction._doc.auctionId, "UpcomingforBid");
    //                 i = i + 1;
    //                 io.emit("data", i);
    //             }
    //         }

    //         if (currentTime - timeStartAuctionFN >= 0 && currentTime - timeEndAuctionFN <= 0) {
    //             var auctionget = await AuctionService.findStatusAuction(auction._doc.auctionId);
    //             if (auctionget.status != "Bidding") {
    //                 await AuctionService.updateStatusAuctionMongo(auction._doc.auctionId, "Bidding");
    //                 await AuctionService.updateStatusForAuction(auction._doc.auctionId, "Bidding");
    //                 i = i + 1;
    //                 io.emit("data", i);
    //             }
    //         }

    //         //         if (currentTime - timeEndAuctionFN > 0 && currentTime - duePaymentTimeFN <= 0) {
    //         //             var auctionget = await AuctionService.findStatusAuction(auction._doc.auctionId);
    //         //             //console.log(auctionget.status);
    //         //             if (auctionget.status != "Closed") {
    //         //                 await AuctionService.updateStatusAuctionMongo(auction._doc.auctionId, "Closed");
    //         //                 await AuctionService.updateStatusForAuction(auction._doc.auctionId, "Closed");
    //         //                 i = i + 1;
    //         //                 io.emit("data", i);
    //         //             }
    //         //         }
    //         //     });
    //         //     // auctionlistUpdate.map(async (auction) => {
    //         //     //     // var currentTime = new Date();
    //         //     //     // var timeStartAuction = auction.Start_Aution_Time__c || '';
    //         //     //     // var timeStartAuctionVN = timeStartAuction.split('+')[0] + '+07:00';
    //         //     //     // var timeStartAuctionFN = new Date(timeStartAuctionVN);

    //         //     // var timeEndAuction = auction.End_Auction_Time__c || '';
    //         //     // var timeEndAuctionVN = timeEndAuction.split('+')[0] + '+07:00';
    //         //     // var timeEndAuctionFN = new Date(timeEndAuctionVN);

    //         //     // var timeStartRegistration = auction.Start_Registration_Time__c || '';
    //         //     // var timeStartRegistrationVN = timeStartRegistration.split('+')[0] + '+07:00';
    //         //     // var timeStartRegistrationFN = new Date(timeStartRegistrationVN);

    //         //     // var timeEndRegistration = auction.End_Registration_Time__c || '';
    //         //     // var timeEndRegistrationVN = timeEndRegistration.split('+')[0] + '+07:00';
    //         //     // var timeEndRegistrationFN = new Date(timeEndRegistrationVN);

    //         //     // var duePaymentTime = auction.Due_Payment_Time__c || '';
    //         //     // var duePaymentTimeVN = duePaymentTime.split('+')[0] + '+07:00';
    //         //     // var duePaymentTimeFN = new Date(duePaymentTimeVN);
    //     });
    // });
    taskRegistrationTime.start();
    var j = 0;
    const transaction = cron.schedule("*/1 * * * * *", async () => {
        let highest = 0;
        await ContractInteractionService.getPlacedBidById(auctionIdlocal)
            .then(async (item) => {
                item?.map((element) => {
                    if (element.bidAmount > highest) {
                        highest = element.bidAmount;
                    }
                });
                io.emit("receive_message", { auction: auctionIdlocal, highest: highest });
            })
            .catch((error) => {
                console.error(error);
            });
    });
    transaction.start();
    return server;
};