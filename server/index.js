const express = require("express");
const app = express();
const http = require("http"); // we can directly create server with express but still creating with http idk why?
const cors = require("cors"); // it is just use to tackle conection problem and fix those bugs if any
const { Server } = require("socket.io"); //the Server module refers to the main module provided by the Socket.IO library. It represents the Socket.IO server and provides the core functionality for managing socket connections, 
// emitting and receiving events, and handling real-time communication between clients and the server.
//middleware
app.use(cors()); //to tackle conection problem and fix those & handle bugs too
const server = http.createServer(app); //this work could be only done express but we are using here http server


const io = new Server(server, {
  //here we are creating the instance of the Server by socket.io like we did in express() we created its instance called app()
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//EVENT HANDLING isi io.on ke andar sara event hoga
io.on("connection",(socket)=>{ //The socket object provides methods and properties that allow you to interact with the client connected to that specific socket.
console.log(`USER CONNECTED ${socket.id}`)   //socket kya hai idhr

socket.on("join_room", (data) =>{ //this is an event to connect through the users

  socket.join(data)  //here the data is the user id which we are passing through frontend
  console.log(`User with ID:${socket.id} joined room: ${data}`)
})

//sending message from frontend event dealing
socket.on("send_data",(data)=>{
  // console.log(data)
  // socket.emit("receive_message",data)  this function is like broadcasting the message but we only want to send data to the person who is in the same room
  //below is the solution for the above problem

  socket.to(data.room).emit("receive_message",data)
})

socket.on("disconnect",()=>{
    console.log("USER DISCONNECTED",socket.id)
})
})

server.listen(3001, () => {
  //here we are using 3001 port because on 3000 port our frontend part or react will run
  console.log("SERVER STARTED SUCCESSFULLY");
});
