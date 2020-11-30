const express = require('express');
const router = express.Router();
const cors = require('cors')
let Rooms = require('./models/room.model')

router.route('/add').post((req, res) => {
    const room = req.body.room;
    const player1 = req.body.player;
    const password = req.body.password;
    const newRoom = new Rooms({
        room,
        player1,
        password
    })
    
    newRoom.save()
    .then(() => res.json(newRoom))
    .catch(err => console.log(err));
})

router.route('/').get((req, res) => {
    Rooms.find()
    .then(room => res.json(room))
    .catch(err => console.log(err))
})

router.route('/join').post((req, res) => {
    Rooms.findById(req.body.id)
    .then(room => {
        room.player2 = req.body.player2

        room.save()
        .then(() => res.json('player added'))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})

router.route('/checkers/:room').get((req, res) => {
    Rooms.findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => res.status(400).jsone(err))
})

router.route('/checkers/:room').delete((req,res) => {
    Rooms.findByIdAndDelete(req.body.id)
    .then(() => res.json('room deleted'))
    .catch(err => console.log(err))
})

router.route('/checkers/update').post(cors(), (req, res) => {
    if(req.body.path === 'created'){
        let newRoom = {
            player1: {
                color: req.body.color,
                name: req.body.name,
                socketid: req.body.socket
            }
        }        
        Rooms.findByIdAndUpdate({ _id: req.body.id }, newRoom)  
                  
    }
    if(req.body.path === 'joined'){
        let newRoom = {
            player2: {
                color: req.body.color,
                name: req.body.name,
                socketid: req.body.socket
            }
        }
        Rooms.findByIdAndUpdate({ _id: req.body.id }, newRoom)
    }   
})

module.exports = router;