import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import Realapp from './Realapp';
import reducers from './reducers'

ReactDOM.render(
    <Provider store={configureStore({reducer: reducers,
    },window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <Realapp />
    </Provider>,
    document.querySelector('#root')
)