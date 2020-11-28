import React from 'react';
import Checker from './Checker';
import Chat from './Chat';

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
    

    
render(){
    
    return (
        <>
        
        <div className="board-container">
            <div className="board2">
                <Checker />
            </div>
            <div className="board">                
                    {this.buildBoard().map((num, i) => num.number === 1 
                    ? <Rows class="black box" key={i + 64} />
                    : <Rows class="red box" key={i + 64} />)}
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



export default Board;