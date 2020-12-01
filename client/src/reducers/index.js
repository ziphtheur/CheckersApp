import { combineReducers } from 'redux';
import {createReducer} from '@reduxjs/toolkit';

const checkerLocationReducer = {
        0:  { 
                location: 'A1',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'odd'
                
            },
        1:  {
                location:'A3',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'odd'
            },
        2:  {
                location:'A5',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'odd'
            },
        3:  {
                location:'A7',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'odd'
            },
        4:  {
                location:'B2',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'even'
            },
        5:  {
                location:'B4',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'even'
            },
        6:  {
                location:'B6',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'even'
            },
        7:  {
                location:'B8',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'even'
            },
        8:  {
                location:'C1',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'odd'
            },
        9:  {
                location:'C3',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'odd'
            },
        10: {
                location:'C5',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'odd'
            },
        11: {
                location:'C7',
                color: 'blue',
                king: false,
                highlight: false,
                row: 'odd'
            },
        12: {
                location:'D2',
                color: null,
                king: false,
                highlight: false,
                row: 'even'
            },
        13: {
                location:'D4',
                color: null,
                king: false,
                highlight: false,
                row: 'even'
            },
        14: {
                location:'D6',
                color: null,
                king: false,
                highlight: false,
                row: 'even'
            },
        15: {
                location:'D8',
                color: null,
                king: false,
                highlight: false,
                row: 'even'
            },
        16: {
                location:'Z1',
                color: null,
                king: false,
                highlight: false,
                row: 'odd'
            },
        17: {
                location:'Z3',
                color: null,
                king: false,
                highlight: false,
                row: 'odd'
            },
        18: {
                location:'Z5',
                color: null,
                king: false,
                highlight: false,
                row: 'odd'
            },
        19: {
                location:'Z7',
                color: null,
                king: false,
                highlight: false,
                row: 'odd'
            },
        20: {
                location:'F2',
                color: 'white',
                king: false,
                highlight: false,
                row: 'even'
            },
        21: {
                location:'F4',
                color: 'white',
                king: false,
                highlight: false,
                row: 'even'
            },
        22: {
                location:'F6',
                color: 'white',
                king: false,
                highlight: false,
                row: 'even'
            },
        23: {
                location:'F8',
                color: 'white',
                king: false,
                highlight: false,
                row: 'even'
            },
        24: {
                location:'G1',
                color: 'white',
                king: false,
                highlight: false,
                row: 'odd'
            },
        25: {
                location:'G3',
                color: 'white',
                king: false,
                highlight: false,
                row: 'odd'
            },
        26: {
                location:'G5',
                color: 'white',
                king: false,
                highlight: false,
                row: 'odd'
            },
        27: {
                location:'G7',
                color: 'white',
                king: false,
                highlight: false,
                row: 'odd'
            },
        28: {
                location:'H2',
                color: 'white',
                king: false,
                highlight: false,
                row: 'even'
            },
        29: {
                location:'H4',
                color: 'white',
                king: false,
                highlight: false,
                row: 'even'
            },
        30: {
                location:'H6',
                color: 'white',
                king: false,
                highlight: false,
                row: 'even'
            },
        31: {
                location:'H8',
                color: 'white',
                king: false,
                highlight: false,
                row: 'even'
            }
    }

const clickReducer = createReducer(checkerLocationReducer,{
    CHECKER_HIGHLIGHT: (state, action) => {
        state[action.payload].highlight = true;
    },
    CLEAR_HIGHLIGHT: (state) => {
        const stateArr = Object.keys(state)
        stateArr.forEach((num) =>{
            state[num].highlight = false
        })
    },
    CHECKER_MOVE: (state, action) => {
        state[action.payload.oldIndex].color = null;
        state[action.payload.oldIndex].king = false;
        state[action.payload.newIndex].color = [action.payload.color];
        state[action.payload.newIndex].king = [action.payload.king]
    },
    SET_KING: (state, action) => {
         state[action.payload].king = true
    },
    DELETE_CHECKER: (state, action) => {
        state[action.payload].color = null;
        state[action.payload].king = false;
    },
    RESET_BOARD: (state, action) => {
        state = checkerLocationReducer;
        return state
    }
})

const turnTracker = createReducer(
    {turn: 'blue'}, 
    {
        CHANGE_TURN: (state, action) => {
            if(state.turn === 'blue'){ state.turn = 'white'}
            else {state.turn = 'blue'}
        },
        RESET_TURN: (state, action) => {
            state.turn = 'blue';
        }
    })

const loginTracker = createReducer(
    {player: '',
    room: '',
    id: '',
    path:'',
    opponent: ''
    }, 
    {
        SET_LOGIN: (state, action) => {
            state.player = action.payload.player;
            state.room = action.payload.room;
            state.path = action.payload.path;
        },
        SET_ID: (state, action) => { 
            state.id = action.payload
        }       
    }
)

const chatBox = createReducer([],
    {
        ADD_TEXT: (state, action) => {
            return [action.payload, ...state]
        }

    }
    

)

const opponentName = createReducer(
    {name: ''},
    {
        OPPONENT_NAME: (state, action) => {
            state.name = action.payload
        }
    }
     
)

export default combineReducers({
    turnTracker: turnTracker,
    movementReducer : clickReducer,
    loginTracker: loginTracker,
    chatBox: chatBox,
    opponentName: opponentName
})