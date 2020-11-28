import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import './Chat.css';

let socket;
const Chat = ({loginTracker, chatBox}) => {
    const [ inputText, setInputText] = useState('');
    

    useEffect(() => {
        socket = io('http://localhost:5000/')

        socket.emit('send msg', loginTracker.room, { name: 'Admin', text:`${loginTracker.player.name} has joined the game`, color: 'white' })
    }, [loginTracker])

    const inputChange = (event) => {
        setInputText(event.target.value);
    }
    const onClickSubmit = (event) => {
        console.log(chatBox)
        event.preventDefault();
        let textColor = () =>{
            return loginTracker.player.color === 'white' ? 'red' : 'blue'
        }

        const sendMsg = {
            name: loginTracker.player.name,
             text: inputText,
             color: textColor()
        }
        socket.emit('send msg', loginTracker.room, sendMsg)      
        setInputText('')
    }

    return (
        <div>
            <div  className="messages">{chatBox.map(text =><><div style={{ color: text.color, display: "inline"}} 
            className="username">{text.name}:_</div>{text.text} <br></br></>   )}</div>
            <form onSubmit={onClickSubmit}>
                <input className="msg-input" type="text" value={inputText} onChange={inputChange} required />
                <input className="msg-submit" type="submit" value="Send"/>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginTracker : state.loginTracker,
        chatBox: state.chatBox
    }
}

export default connect(mapStateToProps)(Chat);