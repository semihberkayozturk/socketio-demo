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

app.use(express.static(path.join(__dirname, "../app")));

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", `${socket.id.substring(0,2)}: ${msg}`)
    })
    socket.broadcast.emit("chat message", `${socket.id.substring(0,2)} has joined the chat!`)
    socket.on("disconnect", () => {
        socket.broadcast.emit("chat message", `${socket.id.substring(0,2)} has left the chat!`)
    })
});

server.listen(3000, () => {
    console.log("Server listening on port 3000!");
});