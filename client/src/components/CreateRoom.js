import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { setLogin, setId } from '../actions';
import './CreateRoom.css';


const CreateRoom = ({loginTracker}) => {
    const [rooms, setRooms] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const [ color, setColor] = useState('');

    let history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://mern-checkers.herokuapp.com/')
        .then(res => {
            setRooms(res.data)

        })
        .catch(err => console.log(err));

    }, [])

    const onChangePlayer = (event) => {
        setPlayerName(event.target.value)
    }
    const onChangeRoom = (event) => {
        setRoomName(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const onChangeRadio = (event) => {
        setColor(event.target.id)
        
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let filtered = rooms.filter((room) => room.room === roomName)
        if(filtered.length === 0){
            const room = {
                room: roomName,
                player: { name: playerName, color: color, socketid: ''},
                password: password,
                path: 'created'            
            }
            dispatch(setLogin(room))
           
            await axios.post('https://mern-checkers.herokuapp.com/add', room)
            .then(res => {
                dispatch(setId(res.data._id))
                console.log(res.data._id)
            })
            .catch(err => console.log(err))
    
            history.push(`/checkers/${roomName}`);
        }
        else{
            alert('room with that name already')
        }
       
    }

     
    return(
        <div className="create-container invis">
            <form className="create-room-form" onSubmit={onSubmit}>
                <label className="label-input">Username: </label>
                <input className="create-input" type="text" required value={playerName} onChange={onChangePlayer} />
                <br />
                <label className="label-input">Room name: </label>
                <input className="create-input" type="text" required value={roomName} onChange={onChangeRoom} />
                <br />
                <label className="label-input">Password: </label>
                <input className="create-input" type="text" placeholder="not required" value={password} onChange={onChangePassword}  />
                <br />
                <p  className="label-input">Select piece color.<i>(hint: blue goes first)</i></p>
                <label className="label-input radio" htmlFor="white">White</label>
                <input className="create-input radio" name="color" type="radio" required id="white" onChange={onChangeRadio} />
                <label className="label-input radio" htmlFor="blue">Blue</label>
                <input className="create-input radio" name="color" type="radio" required id="blue" onChange={onChangeRadio} />
                <br />
                <input type="submit" value="Create Game" className="create-button" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginTracker : state.loginTracker
    }
}

export default connect(mapStateToProps, { setLogin, setId })(CreateRoom);