const socketio = require("socket.io");
// const SocketEvents = require("./constants/SocketEvents");

module.exports = (http) => {
    const io = socketio(http, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT"],
        },
    });

    let interval;

    io.on("SocketEvents.CONNECT", (socket) => {
        console.log("New client connected");
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
    });
    const getApiAndEmit = (socket) => {
        const response = new Date();
        // Emitting a new message. Will be consumed by the client
        socket.emit("FromAPI", response);
    };

    return io;
};
