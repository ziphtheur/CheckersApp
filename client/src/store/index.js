import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loginTracker']
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    version: 1,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]

});

export default store;