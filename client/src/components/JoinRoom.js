import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setLogin, setId } from '../actions';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './JoinRoom.css';

const JoinRoom = ({loginTracker}) => {
    const [rooms, setRooms] = useState([]);
    const [name , setName] = useState('');
    const [password, setPassword] = useState('');
    const [roomName, setRoomName] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {

        axios.get('https://mern-checkers.herokuapp.com/')
            .then(res => {
                    setRooms(res.data)                    
            })
            .catch(err => console.log(err))
    }, [])

    const onClickSubmit = (event) => {
        event.preventDefault();
        let addPlayer;
        let color;
        const select = rooms.filter(room =>  room.room === roomName ? true : false)
        if(select.length === 0) {
            alert('room doesnt exist')
        }else if(select[0].password !== password){
            alert('wrong password');
        }else if(select[0].player2 && select[0].player1){
            alert('game is full')
        }else{
            
            if(select[0].player1){
                color = select[0].player1.color === 'blue' ? 'white': 'blue'; 
                addPlayer = {
                    id : select[0]._id,
                    player2 : {
                        name: name,
                        color: color
                    }
                }
            }else{
                color = select[0].player2.color === 'blue' ? 'white': 'blue'; 
                addPlayer = {
                    id : select[0]._id,
                    player1 : {
                        name: name,
                        color: color
                    }
                }
                
            }
            
           
            axios.post('https://mern-checkers.herokuapp.com/join', addPlayer )
            .then(res=> console.log(res.data))
            .catch(err => console.log(err))
            let setLoginObj = {
                room: roomName,
                player: {
                    name: name,
                    color: color
                },
                path: 'joined'
            }

            dispatch(setLogin(setLoginObj))
            dispatch(setId(select[0]._id))
            history.push(`/checkers/${roomName}`)
        }
        
        
        console.log(loginTracker)
        
    }

    const onClickRoomName = (event) => {
        setRoomName(event.currentTarget.querySelector('.table-room-name').innerHTML)
    }

    const roomTable = () => {
        return rooms.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1 ).map((room, i) => {
            let pass = () => room.password === ''? 'not required' : 'required';
            let players = () => {
                if((room.player1 && 'socketid' in room.player1) && (room.player2 && 'socketid' in room.player2)){
                    return '2/2'
                } else {
                    return '1/2'
                } 
            }
            return <TableRow room={room.room} password={pass()} players={players()} key={room._id} onclick={onClickRoomName} />
        })
    }


    return (
        <div className="join-container invis">
            <form className="join-room-form" onSubmit={onClickSubmit}>
                <div className="join-game-div">
                    <label className="label-input" htmlFor="join-name">Username: </label>
                    <input className="join-input" required type="text" id="join-name" value={name} onChange={(event)=> setName(event.target.value)}  />
                    <label className="label-input" htmlFor="room-name">Room name:</label>
                    <input className="join-input" required type="text" id="room-name" value={roomName} onChange={(event) => setRoomName(event.target.value)}  />
                    <label className="label-input" htmlFor="join-password">Password: </label>
                    <input className="join-input" type="text" id="join-password" placeholder="if needed" value={password} 
                    onChange={(event) => setPassword(event.target.value)} />
                </div>
                <table className="room-table">
                    <thead>
                        <tr key='1'>
                            <th>Room</th>
                            <th>Password</th>
                            <th>Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomTable()}
                    </tbody>                   
                </table>
                <input type="submit" value="Join Game" className="join-button" />
            </form>
        </div>
    )
}

const TableRow = (props) => {
    return (
        <tr onClick={props.onclick}>
            <td className="table-room-name" value={props.room}>{props.room}</td>
            <td>{props.password}</td>
            <td>{props.players}</td>
        </tr>
    )
}

const mapsStateToProps = (state) => {
   return { loginTracker: state.loginTracker }
}

export default connect(mapsStateToProps, { setId, setLogin })(JoinRoom);