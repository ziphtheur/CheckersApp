import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { countReset, resetTurn, resetBoard } from '../actions';


const WinScreen = ({ loginTracker, checkerCounter, opponentName, turnTracker }) => {
    const [winner, setWinner] = useState('');
    const [winColor, setWinColor] =useState('');

    useEffect(() => {

        if(checkerCounter.white === 0){
            
            setWinColor('blue')
            if(loginTracker.player.color === 'white'){
                setWinner(opponentName.name)
            }else{
                setWinner(loginTracker.player.name)
            }
            document.querySelectorAll('.win-screen').forEach(element => {
                element.classList.remove('invis');
            });
        }
        if(checkerCounter.blue === 0){
            setWinColor('white')
            if(loginTracker.player.color === 'blue'){
                setWinner(opponentName.name)
            }else{
                setWinner(loginTracker.player.name)
            }
            document.querySelectorAll('.win-screen').forEach(element => {
                element.classList.remove('invis');
            });
        }

        if(checkerCounter.blue > 0 && checkerCounter.white > 0 && !document.querySelector('.win-screen').classList.contains('invis')){
            document.querySelectorAll('.win-screen').forEach(element => {
                element.classList.add('invis');
            });
        }

    }, [checkerCounter, loginTracker, opponentName])

    return(
        <div className="win-screen invis" style={{ color: winColor}}>
            {winner} Wins!!!
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginTracker: state.loginTracker,
        checkerCounter: state.checkerCounter,
        opponentName: state.opponentName,
        turnTracker: state.turnTracker 
    }
}

export default connect(mapStateToProps, { countReset, resetTurn, resetBoard })(WinScreen)