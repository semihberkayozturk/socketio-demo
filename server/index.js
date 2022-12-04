const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../app/index.html"))
});

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", `${socket.id.substr(0,2)}: ${msg}`)
    })
    socket.broadcast.emit("chat message", "A user joined the chat!")
    socket.on("disconnect", () => {
        socket.broadcast.emit("chat message", "A user left the chat!")
    })
});

server.listen(3000, () => {
    console.log("Server listening on port 3000!");
});