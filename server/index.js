const express = require("express");
const app = express();

const server = app.listen(8080, () => console.log("Server is listening on port 8080!"))

const io = require("socket.io")(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("A user connected!");

    socket.on("message", (message) => {
        console.log(message)
        io.emit("message", `${socket.id.substr(0,2)} said: ${message}`)
    })
});