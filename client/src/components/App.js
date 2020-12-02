import React from 'react';
import Board from './Board';
import { connect, } from 'react-redux';
import './Board.css';
import './Checker.css';


class App extends React.Component{

    turnName = () => {
        if(this.props.turnTracker.turn === this.props.loginTracker.player.color){
            return `${this.props.loginTracker.player.name}'s Turn`
        }else{
            return `${this.props.opponentName.name}'s Turn`
        }
    }

    render(){
        return(
            <div className="app-container">
                <Board />
                <div className="turn">{this.turnName()}</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { turnTracker : state.turnTracker,
        loginTracker: state.loginTracker,
        opponentName: state.opponentName }
}

export default connect(mapStateToProps)(App);;