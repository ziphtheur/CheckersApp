import React, {useState, useEffect} from 'react';
import { connect, useDispatch} from 'react-redux'; 
import { checkerHighlight, clearHighlight, checkerMove, setKing, deleteChecker, changeTurn, resetBoard, resetTurn , addText} from '../actions';
import axios from 'axios';
import io from 'socket.io-client';


let socket;
const Checker = ({movementReducer, turnTracker, loginTracker}) => {
    const [selected, setSelected] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedKing, setSelectedKing] = useState(false);
    const [alreadyJumped, setAlreadyJumped] = useState(false);     

    const dispatch = useDispatch();
    const stateArr = [];
    const edgeRegex = /^7?(15)?(23)?(31)?(24)?(16)?8?0?$/
    for(const property in movementReducer){
        stateArr.push(movementReducer[property])        
    }

    useEffect(() => {
        socket = io('https://mern-checkers.herokuapp.com/');
        let socketid = socket.id;

        if(loginTracker.path === 'created'){
            socket.emit('create room', loginTracker.room)
        }
        if(loginTracker.path === 'joined'){
            socket.emit('join room', loginTracker.room, resetBoard(), resetTurn())
        }
        socket.on('send logic', func =>{ 
            console.log(func) 
            dispatch(func)
        })
        socket.on('recieve msg', msg => {
            console.log(msg)
            dispatch(addText(msg));
        })
                
        let room =  {
            name: loginTracker.player.name,
            color: loginTracker.player.color,
            socket: socketid,
            id: loginTracker.id                
        }
                
        if(loginTracker.path === 'created'){
            axios.post('https://mern-checkers.herokuapp.com/checkers/updateplayer1', room)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
        if(loginTracker.path === 'joined'){
            axios.post('https://mern-checkers.herokuapp.com/checkers/updateplayer2', room)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }            
          

    }, [loginTracker, dispatch])
    

    const onClickHighlight = (clicked) => {
        let getAttrib = (attrib) => clicked.currentTarget.getAttribute(attrib);
        const stateIndexSouth = (int) => movementReducer[parseInt(getAttrib("data-key"), 10) + int];
        const stateIndexNorth = (int) =>movementReducer[getAttrib("data-key") - int];
        const highlightNorth = (int) => dispatch(checkerHighlight(getAttrib("data-key") - int));
        const highlightSouth = (int) => dispatch(checkerHighlight(parseInt(getAttrib("data-key"), 10) + int));
        let highlight = false;
        console.log(loginTracker)
        //if clicked square is highlighted move selected checker and unselect it clear all highlights
        if(getAttrib("data-highlight") === "true"){
            if(selected - getAttrib("data-key") === 7){
                if(getAttrib("data-row") === 'even'){
                    socket.emit('send logic', deleteChecker(selected - 3), loginTracker.room, error => {
                        if (error) console.log(error)
                    })
                    
                }
                if(getAttrib("data-row") === 'odd'){
                    socket.emit('send logic', deleteChecker(selected - 4), loginTracker.room, error => {
                        if (error) console.log(error)
                    })
                }
            }

            if(selected - getAttrib("data-key") === 9){
                if(getAttrib("data-row") === 'even'){
                    socket.emit('send logic', deleteChecker(selected - 4), loginTracker.room, error => {
                        if (error) console.log(error)
                    })

                }
                if(getAttrib("data-row") === 'odd'){
                    socket.emit('send logic', deleteChecker(selected - 5), loginTracker.room, error => {
                        if (error) console.log(error)
                    })
                }
            }
            if(getAttrib("data-key") - selected === 7){
                if(getAttrib("data-row") === 'even'){
                    socket.emit('send logic', deleteChecker(parseInt(selected) + 4), loginTracker.room, error => {
                        if (error) console.log(error)
                    })
                }
                if(getAttrib("data-row") === 'odd'){
                    socket.emit('send logic', deleteChecker(parseInt(selected) + 3), loginTracker.room, error => {
                        if (error) console.log(error)
                    })
                }
            }
            if(getAttrib("data-key") - selected === 9){
                if(getAttrib("data-row") === 'even'){
                    socket.emit('send logic', deleteChecker(parseInt(selected) + 5), loginTracker.room, error => {
                        if (error) console.log(error)
                    });
                }
                if(getAttrib("data-row") === 'odd'){
                    socket.emit('send logic', deleteChecker(parseInt(selected) + 4), loginTracker.room, error => {
                        if (error) console.log(error)
                    });
                }
            }
            
            dispatch(clearHighlight());
            socket.emit('send logic', checkerMove(getAttrib("data-key"), selected, selectedColor, selectedKing), loginTracker.room, error => {
                if (error) console.log(error)
            });

            //set King if on the king row
            if((/A/).test(getAttrib("data-grid")) && selectedColor === 'white'){
                socket.emit('send logic', setKing(getAttrib("data-key")), loginTracker.room, error => {
                    if (error) console.log(error)
                })
            }
            if((/H/).test(getAttrib("data-grid")) && selectedColor === 'blue'){
                socket.emit('send logic', setKing(getAttrib("data-key")), loginTracker.room, error => {
                    if (error) console.log(error)
                })
            }

            // multiple jumps highlight code
            if((/A|H|B|G/).test(getAttrib("data-grid")) && selectedKing !== 'true'){
                setSelectedColor(null)
                setSelected(null)
                setSelectedKing(null)
            }else if( selected - getAttrib("data-key") > 6 || getAttrib("data-key") - selected > 6){
                setSelected(getAttrib("data-key"))
                if(getAttrib("data-row") === "even"){
                    if(getAttrib("data-key") > 7 && stateIndexNorth(9).color === null && 
                    ((String(stateIndexNorth(4).color) === "blue" && turnTracker.turn === 'white' && selectedColor === 'white' && !edgeRegex.test(parseInt(getAttrib("data-key")) - 4) ) ||
                    (String(stateIndexNorth(4).color) === "white" && turnTracker.turn === 'blue' && selectedKing === 'true' && selectedColor === 'blue' && !edgeRegex.test(parseInt(getAttrib("data-key")) - 4)))){
                        highlightNorth(9)
                        highlight = true;
                    }
                    if(!edgeRegex.test(getAttrib("data-key")) && getAttrib("data-key") > 7 && stateIndexNorth(7).color === null && 
                    ((String(stateIndexNorth(3).color) === "blue" && turnTracker.turn === 'white' && selectedColor === 'white')  ||
                    (String(stateIndexNorth(3).color) === "white" && turnTracker.turn === 'blue' && selectedKing === 'true' && selectedColor === 'blue'))){
                        highlightNorth(7)
                        highlight = true;
                    } 
                    if(getAttrib("data-key") < 24 && stateIndexSouth(7).color === null &&  
                    ((String(stateIndexSouth(4).color) === "white" && turnTracker.turn === 'blue' && selectedColor === 'blue' && !edgeRegex.test(parseInt(getAttrib("data-key")) + 4) )  ||
                    (String(stateIndexSouth(4).color) === "blue" && turnTracker.turn === 'white' && selectedKing === 'true' && selectedColor === 'white' && !edgeRegex.test(parseInt(getAttrib("data-key")) + 4) ))){
                        highlightSouth(7)
                        highlight = true;
                    }
                    if(!edgeRegex.test(getAttrib("data-key")) &&  getAttrib("data-key") < 24 && stateIndexSouth(9).color === null  && 
                    ((String(stateIndexSouth(5).color) === "white" && turnTracker.turn === 'blue' && selectedColor === 'blue')  ||
                    (String(stateIndexSouth(5).color) === "blue" && turnTracker.turn === 'white' && selectedKing === 'true' && selectedColor === 'white' ))){
                        highlightSouth(9)
                        highlight = true;
                    }
                }else if(getAttrib("data-row") === "odd"){
                    if(getAttrib("data-key") > 7 && stateIndexNorth(7).color === null &&  
                    ((String(stateIndexNorth(4).color) === "blue" && turnTracker.turn === 'white' && selectedColor === 'white' && !edgeRegex.test(parseInt(getAttrib("data-key")) - 4)) || 
                    (String(stateIndexNorth(4).color) === "white" && turnTracker.turn === 'blue' && selectedKing === 'true' && selectedColor === 'blue' && !edgeRegex.test(getAttrib("data-key")) - 4)  )){
                        highlightNorth(7)
                        highlight = true;
                    }
                    if(!edgeRegex.test(getAttrib("data-key")) && getAttrib("data-key") > 7 && stateIndexNorth(9).color === null &&  
                    ((String(stateIndexNorth(5).color) === "blue" && turnTracker.turn === 'white' && selectedColor === 'white') ||
                    (String(stateIndexNorth(5).color) === "white" && turnTracker.turn === 'blue' && selectedKing === 'true' && selectedColor === 'blue')  )){
                        highlightNorth(9)
                        highlight = true;
                    }
                    if(getAttrib("data-key") < 24 && stateIndexSouth(9).color === null && 
                    ((String(stateIndexSouth(4).color) === "white" && turnTracker.turn === 'blue' && selectedColor === 'blue' && !edgeRegex.test(parseInt(getAttrib("data-key")) + 4)) ||
                    (String(stateIndexSouth(4).color) === "blue" && turnTracker.turn === 'white' && selectedKing === 'true' && selectedColor === 'white' && !edgeRegex.test(parseInt(getAttrib("data-key")) + 4) ))){
                        highlightSouth(9)
                        highlight = true;
                    }
                    if(!edgeRegex.test(getAttrib("data-key")) && getAttrib("data-key") < 24 && stateIndexSouth(7).color === null && 
                    ((String(stateIndexSouth(3).color) === "white" && turnTracker.turn === 'blue' && selectedColor === 'blue')  ||
                    (String(stateIndexSouth(3).color) === "blue" && turnTracker.turn === 'white' && selectedKing === 'true' && selectedColor === 'white'))){
                        highlightSouth(7)
                        highlight = true;
                    }
                }
               
                
                

                 
            }
            if(!highlight){
                setAlreadyJumped(false)
                socket.emit('send logic', changeTurn(), loginTracker.room, error => {
                    if (error) console.log(error)
                })
            }else{ setAlreadyJumped(true) }
        // if selected element is a checker set it as state
        }else if (getAttrib("data-color") !== null && alreadyJumped !== true){
            setSelected(getAttrib("data-key"))
            setSelectedColor(getAttrib("data-color"))
            setSelectedKing(getAttrib("data-king"))
            dispatch(clearHighlight())
        }
        
        //on even row create highlights for movement
        if(getAttrib("data-row") === "even" && alreadyJumped !== true && loginTracker.player.color === turnTracker.turn){
            if(getAttrib("data-key") > 3 && ((getAttrib("data-color") === 'white' && turnTracker.turn === 'white') || (getAttrib("data-king") === 'true' && turnTracker.turn === 'blue' && getAttrib("data-color") === 'blue' ))  ){
                if(stateIndexNorth(4).color === null && (getAttrib("data-color") === 'white' ||( getAttrib("data-color") === 'blue' || getAttrib('data-king') === 'true'))){
                    highlightNorth(4)
                    
                } else if(getAttrib("data-key") > 7 && !edgeRegex.test(parseInt(getAttrib("data-key")) - 4) && stateIndexNorth(9).color === null && 
                ((String(stateIndexNorth(4).color) === "blue" && turnTracker.turn === 'white' && getAttrib("data-color") === 'white') ||
                 (String(stateIndexNorth(4).color) === "white" && turnTracker.turn === 'blue' && getAttrib("data-king") === 'true' && getAttrib("data-color") === 'blue'))){
                    highlightNorth(9)
                }
                if(!edgeRegex.test(getAttrib("data-key")) && stateIndexNorth(3).color === null && 
                (getAttrib("data-color") === 'white' ||( getAttrib("data-color") === 'blue' || getAttrib('data-king') === 'true'))){
                    highlightNorth(3)

                }  else if(!edgeRegex.test(getAttrib("data-key")) && getAttrib("data-key") > 7 && stateIndexNorth(7).color === null && 
                ((String(stateIndexNorth(3).color) === "blue" && turnTracker.turn === 'white'&& getAttrib("data-color") === 'white')  ||
                 (String(stateIndexNorth(3).color) === "white" && turnTracker.turn === 'blue' && getAttrib("data-king") === 'true' && getAttrib("data-color") === 'blue'))){
                    highlightNorth(7)
                }    
            }
            if(getAttrib("data-key") < 28 && ((getAttrib("data-color") === 'blue' && turnTracker.turn === 'blue') || (getAttrib("data-king") === 'true' && turnTracker.turn === 'white' && getAttrib("data-color") === 'white'))  ){
                if(stateIndexSouth(4).color === null ){
                    highlightSouth(4)

                }else if(stateIndexSouth(7).color === null && !edgeRegex.test(parseInt(getAttrib("data-key")) + 4) &&
                ((String(stateIndexSouth(4).color) === "white" && turnTracker.turn === 'blue' && getAttrib("data-color") === 'blue')  ||
                 (String(stateIndexSouth(4).color) === "blue" && turnTracker.turn === 'white' && getAttrib("data-king") === 'true' && getAttrib("data-color") === 'white' ))){
                    highlightSouth(7)
                }
                if(!edgeRegex.test(getAttrib("data-key")) && stateIndexSouth(5).color === null){
                    highlightSouth(5)

                }else if(!edgeRegex.test(getAttrib("data-key")) && stateIndexSouth(9).color === null  && 
                ((String(stateIndexSouth(5).color) === "white" && turnTracker.turn === 'blue' && getAttrib("data-color") === 'blue')  ||
                 (String(stateIndexSouth(5).color) === "blue" && turnTracker.turn === 'white' && getAttrib("data-king") === 'true' && getAttrib("data-color") === 'white' ))){
                    highlightSouth(9)
                }
            }
        }
        //on odd row create highlights for movement
        if(getAttrib("data-row") === "odd" && alreadyJumped !== true && loginTracker.player.color === turnTracker.turn ){
            if(getAttrib("data-key") > 3 && ((getAttrib("data-color") === 'white' && turnTracker.turn === 'white') || (getAttrib("data-king") === 'true' && turnTracker.turn === 'blue' && getAttrib("data-color") === 'blue'))  ){
                if(stateIndexNorth(4).color === null && (getAttrib("data-color") === 'white' ||( getAttrib("data-color") === 'blue' || getAttrib('data-king') === 'true'))){
                    highlightNorth(4)

                }else if(stateIndexNorth(7).color === null && !edgeRegex.test(parseInt(getAttrib("data-key")) - 4) &&
                ((String(stateIndexNorth(4).color) === "blue" && turnTracker.turn === 'white' && getAttrib("data-color") === 'white') || 
                (String(stateIndexNorth(4).color) === "white" && turnTracker.turn === 'blue' && getAttrib("data-king") === 'true' && getAttrib("data-color") === 'blue')  )){
                    highlightNorth(7)
                }
                if(!edgeRegex.test(getAttrib("data-key")) && stateIndexNorth(5).color === null && 
                (getAttrib("data-color") === 'white' ||( getAttrib("data-color") === 'blue' || getAttrib('data-king') === 'true')) ){
                    highlightNorth(5) 

                }else if(!edgeRegex.test(getAttrib("data-key")) && stateIndexNorth(9).color === null && 
                ((String(stateIndexNorth(5).color) === "blue" && turnTracker.turn === 'white' && getAttrib("data-color") === 'white') ||
                 (String(stateIndexNorth(5).color) === "white" && turnTracker.turn === 'blue' && getAttrib("data-king") === 'true' && getAttrib("data-color") === 'blue')  )){
                    highlightNorth(9)
                }

            }
            if(getAttrib("data-key") < 28 && ((getAttrib("data-color") === 'blue' && turnTracker.turn === 'blue') || (getAttrib("data-king") === 'true'  && turnTracker.turn === 'white' && getAttrib("data-color") === 'white'))  ){
                if(stateIndexSouth(4).color === null && (getAttrib("data-color") === 'blue' ||( getAttrib("data-color") === 'white' || getAttrib('data-king') === 'true'))){
                    highlightSouth(4)

                }else if(getAttrib("data-key") < 24 && !edgeRegex.test(parseInt(getAttrib("data-key")) + 4) && stateIndexSouth(9).color === null && 
                ((String(stateIndexSouth(4).color) === "white" && turnTracker.turn === 'blue' && getAttrib("data-color") === 'blue') ||
                 (String(stateIndexSouth(4).color) === "blue" && turnTracker.turn === 'white' && getAttrib("data-king") === 'true' && getAttrib("data-color") === 'white' ))){
                    highlightSouth(9)
                }
                if(!edgeRegex.test(getAttrib("data-key")) && stateIndexSouth(3).color === null && 
                (getAttrib("data-color") === 'blue' ||( getAttrib("data-color") === 'white' || getAttrib('data-king') === 'true'))){
                    dispatch(checkerHighlight(parseInt(getAttrib("data-key"), 10) + 3))

                }else if(!edgeRegex.test(getAttrib("data-key")) && getAttrib("data-key") < 24 && stateIndexSouth(7).color === null && 
                ((String(stateIndexSouth(3).color) === "white" && turnTracker.turn === 'blue' && getAttrib("data-color") === 'blue')  ||
                 (String(stateIndexSouth(3).color) === "blue" && turnTracker.turn === 'white' && getAttrib("data-king") === 'true' && getAttrib("data-color") === 'white'))){
                    highlightSouth(7)
                }

            }
        }
        
        console.log(getAttrib("data-key"))
    }
    
    
    const onClickReset = () => {
        socket.emit('send logic', resetBoard(), loginTracker.room, error => {
            if (error) console.log(error)
        })
        if(turnTracker.turn !== ' blue'){
            socket.emit('send logic', resetTurn(), loginTracker.room, error => {
                if (error) console.log(error)
            })
        }
    }
    

    

    return (
        <>
             {stateArr.map((obj, i) => {
                return <div className="checker" data-row={obj.row} data-key={i} data-highlight = {obj.highlight} data-grid = {`${obj.location}`} 
                data-color= {obj.color} data-king={obj.king} key= {i} data-selected = {obj.selected} onClick = {onClickHighlight} >
                <div className = "king">KING</div>                        
                </div>
                })
            }
            <button className="reset" onClick = {onClickReset} >Reset</button>
        </>
    );
}


const mapStateToProps = (state) => {
    return { movementReducer: state.movementReducer,
             turnTracker: state.turnTracker,
             loginTracker: state.loginTracker };
}

export default connect(mapStateToProps, { checkerHighlight, clearHighlight, checkerMove, setKing, addText, deleteChecker, changeTurn ,resetBoard, resetTurn })(Checker);