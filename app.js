const express = require('express');
const app = express();
const http = require("http");
const path = require('path');

// setup socket.io
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// setup ejs start
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')))
// setup ejs end

// socket io connection start
io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location",{id:socket.id, ...data})
    })
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
    console.log("Connected");
})
// socket io connection end
app.get("/", function(req,res){
    res.render("index")
})

server.listen(3000)