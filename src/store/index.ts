import {createStore, applyMiddleware, Dispatch} from 'redux'

import logger from 'redux-logger'
import promise from 'redux-promise' // 中间件 派发promise
import thunk from 'redux-thunk' // 中间件 派发函数

import {routerMiddleware} from 'connected-react-router'
import history from '../history'

import rootReducer from './reducers'


import { CombinedState } from 'src/typings'

//let store = createStore()
let store = applyMiddleware(routerMiddleware(history), promise, thunk, logger)(createStore)(rootReducer)




export type StoreDispatch = Dispatch;
export type StoreGetState = () => CombinedState;



export default store