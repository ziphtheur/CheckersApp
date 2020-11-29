const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const mongoose = require('mongoose');
let Rooms = require('./models/room.model');


require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server)(httpServer, {
    cors: {
        origin: "https://mern-checkers.netlify.app/",
        methods: ["GET", "POST"]
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const URI = process.env.ATLAS_URI;

mongoose.connect(URI, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database Connection established')
})



 io.on('connection', (socket) => {
    console.log('user connected') 
    console.log(socket.id) 
     
    socket.on('send logic', (msg, roomName) => {
        console.log(msg);
        io.in(roomName).emit('send logic', msg) 
    })

    socket.on('create room', (roomName) => {
        socket.join(roomName)
        console.log(`${roomName} created`)
    })

    socket.on('join room', (roomName, func, func2) => {
        socket.join(roomName)

        io.in(roomName).emit('send logic' , func)
        io.in(roomName).emit('send logic' , func2)
        console.log(`${roomName} joined`, func)
    })
    socket.on('send msg', (roomName, msg) => {
        console.log(roomName, msg)
        io.in(roomName).emit('recieve msg', msg)
    })
    
    socket.on('disconnect', async () => {
        let newSocket = await socket.id;
       await Rooms.find({})
       .then(rooms => {
           let room1 = rooms.filter((room) => {
               if(room.player1){
                return room.player1.socketid === newSocket
               }
               
           })
           let room2 = rooms.filter((room) => {
               if(room.player2){
                return room.player2.socketid === newSocket
                }
            })
           if(room1.player2 && room1.player2.socketid){
               Rooms.findByIdAndUpdate(room1._id, {$unset : {player1: {} } })
           }else if(room2.player1 && room2.player1.socketid){
               Rooms.findByIdAndUpdate(room2._id, {$unset : {player2 : {} } })
           }else{
               if(room1){
                Rooms.findByIdAndDelete(room1[0]._id, (err, docs) => {
                    err ? console.log(err) : console.log("Deleted: " + docs);
                })
               }else{
                console.log('else')
                Rooms.findByIdAndDelete(room2[0]._id)
              }
                
           }
       })
       .catch(err => console.log(err))
         console.log('user disconneted')
         
     })
 })

 
 app.use(router);

server.listen(port, () => console.log(`server has started on port ${port}`))