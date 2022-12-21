const socketio = require("socket.io");
// const { getAllAuction } = require("./dal/ContractInteractionDAO");
const { Server } = require("socket.io");
const http = require("http");
const jsforce = require("jsforce");
const { getAllAuction } = require("./dal/auctionDAO");
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
    var latestData;
    
    io.on("connection", async (socket) => {
        socket.emit("data", latestData);
        console.log(latestData);
    });
    
    setInterval(async () => {
        var listAuction = await getAllAuction();
         listAuction.map(async auction =>{
            await console.log(auction.Name)
        })
        
        console.log('Last updated: ' + new Date());
      
      }, 1000);



    return server;
};
