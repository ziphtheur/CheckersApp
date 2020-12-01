import React from 'react';
import Checker from './Checker';
import Chat from './Chat';
import { connect } from 'react-redux';

class Board extends React.Component {

     buildBoard = () => {
        this.board1 = [];
        this.board1.push({
            number : 1,
            key : 0
        },
        {
            number : 0,
            key: 1
        })

        for(let i = 2; i < 64; i++){
            if((i < 8) ||( i > 15 && i <24) || (i > 31 && i <40) || (i > 47 && i <56)){
                if( i % 2 === 0 ){
                    this.board1.push({
                        number: 1,
                        key: i
                    })
                }else{
                    this.board1.push({
                        number: 0,
                        key: i
                    })
                }
            }else{
                if( i % 2 === 0 ){
                this.board1.push({
                    number: 0,
                    key: i
                })
                }else{
                this.board1.push({
                    number: 1,
                    key: i
                })
            }
            }
        }   
        return this.board1      
    }

    boxColor1 = () => {
        return this.props.loginTracker.player.color === "blue" ? "red" : "black"        
    }
    boxColor2 =  () => {
         return this.props.loginTracker.player.color === "blue" ? "black" : "red" 
    }

    
render(){
    return (
        <>
        
        <div className="board-container">
            <div className="boardwhite">
                <Checker />
            </div>
            <div className="board">                
                    {this.buildBoard().map((num, i) => num.number === 1 
                    ? <Rows class={`${this.boxColor1()} box`} key={i + 64} />
                    : <Rows class={`${this.boxColor2()} box`} key={i + 64} />)}
            </div>
            <Chat />
        </div>
        </>
    );
}
}
const Rows = (props) => {
    return <div className={props.class}></div>
}

const mapStateToProps = (state) => {
    return {
        loginTracker: state.loginTracker
    }
}

export default connect(mapStateToProps)(Board);