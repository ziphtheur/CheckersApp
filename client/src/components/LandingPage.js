import React from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import './LandingPage.css';


const LandingPage = () => {

    const onClickCreate = () => {
        if(!document.querySelector('.join-container').classList.contains('invis')){
            document.querySelector('.join-container').classList.toggle('invis')
        }
        document.querySelector('.create-container').classList.toggle('invis')
    }
    const onClickJoin = () => {
        if(!document.querySelector('.create-container').classList.contains('invis')){
            document.querySelector('.create-container').classList.toggle('invis')
        }
        document.querySelector('.join-container').classList.toggle('invis')
    }

    return (
        <div className="landingPage-container">
            <header className="landingPage-header">
                <img className="online-logo" src="https://businessblog.winweb.com/wp-content/uploads/2012/02/Business-Blog-WinWeb-Online.jpg" alt="online" />
                <img className="checkers-logo" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ61cel0LRj7O8VEV_-aP3Y3Nd47LaHa2nHcw&usqp=CAU" 
                alt="checkers" 
                /> 
            </header> 
            <div>
                <img className="landingPage-bodypic faded" 
                src="https://store-images.s-microsoft.com/image/apps.53192.14379170605024367.a314d276-3cdb-4d7d-afcc-ad09bd8549f9.e1b3fd52-2bfa-498f-9a3e-72a6173a7d99?mode=scale&q=90&h=1080&w=1920" alt="checkers board game" />
                <CreateRoom />
                <JoinRoom />
                <div className="button-container">
                    <button className="create-room button" onClick={onClickCreate}>Create Game</button>
                    <button className="join-room button" onClick={onClickJoin}>Join Game</button>
                </div>
                
            </div>           
           
       </div>
    )
}
export default LandingPage;