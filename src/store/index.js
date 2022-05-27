import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from "connected-react-router";
import {configureStore} from "@reduxjs/toolkit";
import {createRootReducer} from './rootReducer';
import createRootSaga from './rootSaga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
];

export const store = configureStore({
    reducer: createRootReducer(history),
    middleware: middlewares,
});

sagaMiddleware.run(createRootSaga);