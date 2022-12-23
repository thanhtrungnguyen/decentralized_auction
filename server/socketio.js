const socketio = require("socket.io");
const { Server } = require("socket.io");
const http = require("http");
const jsforce = require("jsforce");
const ContractInteractionService = require("./services/ContractInteractionService");
const AuctionService = require("./services/AuctionService");
require("dotenv").config();

// const SocketEvents = require("./constants/SocketEvents");

module.exports = (app) => {



    // const io = socketio(http, {
    //     cors: {
    //         origin: "http://localhost:3000",
    //         methods: ["GET", "POST", "PUT"],
    //     },
    // });

    // let interval;

    // io.on("SocketEvents.CONNECT", (socket) => {
    //     console.log("New client connected");
    //     if (interval) {
    //         clearInterval(interval);
    //     }
    //     interval = setInterval(() => getApiAndEmit(socket), 1000);
    //     socket.on("disconnect", () => {
    //         console.log("Client disconnected");
    //         clearInterval(interval);
    //     });
    // });
    // const getApiAndEmit = (socket) => {
    //     const response = new Date();
    //     const auction = getAllAuction();
    //     console.log(auction);
    //     // Emitting a new message. Will be consumed by the client
    //     socket.emit("FromAPI", response);
    // };

    // return io;

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
    io.on("connection", async (socket) => {

        socket.on("disconnect", function()
			{
			});

        // auctionlist = await AuctionService.getAllAuction();
        
        // if (auctionLastest != auctionlist) {
        //     io.emit('data', auctionlist);
        //     auctionLastest = auctionlist;
        // }

    });
    setInterval(async () => {
        var auctionlist = null;
        var auctionlistUpdate = await ContractInteractionService.getAllAuction();
        auctionlistUpdate.map(async (auction) => {
            var timeStartRegistrationFN = new Date(0).setUTCSeconds(parseInt(auction._doc.startRegistrationTime)); 
            var timeEndRegistrationFN = new Date(0).setUTCSeconds(parseInt(auction._doc.endRegistrationTime)); 
            var timeStartAuctionFN = new Date(0).setUTCSeconds(parseInt(auction._doc.startAuctionTime));
            var timeEndAuctionFN = new Date(0).setUTCSeconds(parseInt(auction._doc.endAuctionTime));
            var timeEndAuctionFN = new Date(0).setUTCSeconds(parseInt(auction._doc.duePaymentTime));
            var currentTime = new Date();
        
           
            
            if (currentTime - timeStartRegistrationFN >= 0 && currentTime - timeEndRegistrationFN <= 0) {
                var auctionget = await AuctionService.findStatusAuction(auction._doc.auctionId);
                if (auctionget.status != "RegistrationTime") {
                    await AuctionService.updateStatusAuctionMongo(auction._doc.auctionId,"RegistrationTime");
                    await AuctionService.updateStatusForAuction(auction._doc.auctionId,"RegistrationTime");
                    
                }

            }
            if (currentTime - timeEndRegistrationFN > 0 && currentTime - timeStartAuctionFN < 0) {
                var auctionget = await AuctionService.findStatusAuction(auction._doc.auctionId);
                if (auctionget.status != "UpcomingforBid") {
                    await AuctionService.updateStatusAuctionMongo(auction._doc.auctionId,"UpcomingforBid");
                    await AuctionService.updateStatusForAuction(auction._doc.auctionId,"UpcomingforBid");
                }

            }


            if (currentTime - timeStartAuctionFN >= 0 && currentTime - timeEndAuctionFN <= 0) {
                var auctionget = await AuctionService.findStatusAuction(auction._doc.auctionId);
                if (auctionget.status != "Bidding") {
                    await AuctionService.updateStatusAuctionMongo(auction._doc.auctionId,"Bidding");
                    await AuctionService.updateStatusForAuction(auction._doc.auctionId,"Bidding");
                }

            }

            if (currentTime - timeEndAuctionFN > 0 && currentTime - duePaymentTimeFN <= 0) {
                var auctionget = await AuctionService.findStatusAuction(auction._doc.auctionId);
                if (auctionget.status != "Closed") {
                    await AuctionService.updateStatusAuctionMongo(auction._doc.auctionId,"Closed");
                    await AuctionService.updateStatusForAuction(auction._doc.auctionId,"Closed");
                }

            }
            
        })       
        // auctionlistUpdate.map(async (auction) => {
        //     // var currentTime = new Date();
        //     // var timeStartAuction = auction.Start_Aution_Time__c || '';
        //     // var timeStartAuctionVN = timeStartAuction.split('+')[0] + '+07:00';
        //     // var timeStartAuctionFN = new Date(timeStartAuctionVN);


        //     // var timeEndAuction = auction.End_Auction_Time__c || '';
        //     // var timeEndAuctionVN = timeEndAuction.split('+')[0] + '+07:00';
        //     // var timeEndAuctionFN = new Date(timeEndAuctionVN);


        //     // var timeStartRegistration = auction.Start_Registration_Time__c || '';
        //     // var timeStartRegistrationVN = timeStartRegistration.split('+')[0] + '+07:00';
        //     // var timeStartRegistrationFN = new Date(timeStartRegistrationVN);


        //     // var timeEndRegistration = auction.End_Registration_Time__c || '';
        //     // var timeEndRegistrationVN = timeEndRegistration.split('+')[0] + '+07:00';
        //     // var timeEndRegistrationFN = new Date(timeEndRegistrationVN);


        //     // var duePaymentTime = auction.Due_Payment_Time__c || '';
        //     // var duePaymentTimeVN = duePaymentTime.split('+')[0] + '+07:00';
        //     // var duePaymentTimeFN = new Date(duePaymentTimeVN);




        // });
    }, 10000);



    return server;
};
