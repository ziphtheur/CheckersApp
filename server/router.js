const { json } = require('express');
const express = require('express');
const router = express.Router();
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

router.route('/disconnectplayer1').put((req, res) => {
    Rooms.findByIdAndUpdate(req.body.id, {player1: {}})
        .then(() => console.log('room disconnected!'))
        .catch(err => console.log(err));
    
})
router.route('/disconnectplayer2').put((req, res) => {
    Rooms.findByIdAndUpdate(req.body.id, {player2: {}})
        .then(() => console.log('room disconnected!'))
        .catch(err => console.log(err));
    
})
//Rooms.find({ player1: { id: req.body.id }})
router.route('/checkers/updateplayer1').put((req, res) => {
    let newRoom = {
        player1: {
            color: req.body.color,
            name: req.body.name,
            socketid: req.body.socket
        }
    }

    Rooms.findByIdAndUpdate(req.body.id, newRoom)
    .then(() => console.log('socket updated'))
    .catch(err => console.log(err));
    console.log('socket added')
    
})
router.route('/checkers/updateplayer2').put((req, res) => {
    let newRoom = {
        player2: {
            color: req.body.color,
            name: req.body.name,
            socketid: req.body.socket
        }
    }
    Rooms.findByIdAndUpdate(req.body.id, newRoom)
    .then(() => res.json('socket added'))
    .catch(err => console.log(err));
    console.log('socket added')
})

module.exports = router;