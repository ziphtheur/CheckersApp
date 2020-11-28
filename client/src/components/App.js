import React from 'react';
import Board from './Board';
import { connect, } from 'react-redux';
import './Board.css';
import './Checker.css';

class App extends React.Component{

    turnName = () => {
        if(this.props.turnTracker.turn === this.props.loginTracker.player.color){
            return 'Your Turn'
        }else{
            return 'Opponent\'s Turn'
        }
    }

    render(){
        return(
            <div className="app-container">
                <Board />
                <div className="turn">{` Player Turn: ${this.turnName()} `}</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { turnTracker : state.turnTracker,
        loginTracker: state.loginTracker }
}

export default connect(mapStateToProps)(App);;