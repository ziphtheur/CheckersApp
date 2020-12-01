export const checkerHighlight = (location) => {
    return {
        type:  'CHECKER_HIGHLIGHT',
        payload : location
    }
}   

export const checkerMove = (newIndex, oldIndex, color, king) => {
    return {
        type: 'CHECKER_MOVE',
       payload: {
            newIndex,
            oldIndex,
            color,
            king
       }
    }
}

export const clearHighlight = () =>{
    return{
        type: 'CLEAR_HIGHLIGHT',
        
    }
}

export const setKing = (location) => {
    return {
        type: 'SET_KING',
        payload: location
    }
}
export const deleteChecker = (location) => {
    return {
        type: 'DELETE_CHECKER',
        payload: location
    }
}
export const changeTurn = () => {
    return{
        type: 'CHANGE_TURN'
    }
}
export const resetBoard = () => {
    return{
        type: 'RESET_BOARD'
    }
}
export const setLogin = (obj) => {
    return{
        type: 'SET_LOGIN',
        payload: obj
    }
}
export const setId = (id) => {
    return{
        type: 'SET_ID',
        payload: id
    }
}
export const resetTurn = () => {
    return{
        type: 'RESET_TURN'
    }
}
export const addText = (msg) => {
    return{
        type: 'ADD_TEXT',
        payload: msg
    }
}
export const setOpponentName = (name) => {
    return{
        type: "OPPONENT_NAME",
        payload: name
    }
}
    