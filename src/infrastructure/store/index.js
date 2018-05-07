import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducer'
import App from "../../application";

export const sagaMiddleware = createSagaMiddleware()
const middlewares = [
    sagaMiddleware,
];

let enhancer;
if (!process.env.prod) {
    const { composeWithDevTools } = require('redux-devtools-extension')

    enhancer = composeWithDevTools(applyMiddleware(...middlewares))
} else {
    enhancer = applyMiddleware(...middlewares);
}

export function initStore(initialState = {}) {
    const store = createStore(
        createReducer({}),
        initialState,
        enhancer
    )

    sagaMiddleware.setContext({
        browser: process.env.BROWSER,
    });

    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(App.sagas.rootSaga)
    }

    store.runStartUpSagaTask = (startUpConfig) => sagaMiddleware.run(App.sagas.startUpSaga, startUpConfig).done;

    // run the rootSaga initially
    store.runSagaTask()

    return store
}