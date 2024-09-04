import { applyMiddleware, createStore } from "redux"
import reducers from './reducers/index'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from "./sagas";


const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)

sagaMiddleware.run(rootSaga)