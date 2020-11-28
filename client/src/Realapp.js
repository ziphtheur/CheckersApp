import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import LandingPage from './components/LandingPage';

const Realapp = () => {
    return (
        <Router>            
            <Route path='/' exact component ={LandingPage} />
            <Route path='/checkers/:room' component={App} />
        </Router>
    )
}

export default Realapp;