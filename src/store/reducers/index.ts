import { ReducersMapObject, Reducer } from "redux";
import {
  connectRouter
} from "connected-react-router";
import home from "./home";
import mine from "./mine";
import profile from "./profile";
import cart from "./cart";
import history from "src/history";
import { CombinedState } from 'src/typings'

import produce from 'immer'
// combineReducers之前是从redux 引入
import { combineReducers } from 'redux-immer'


let reducers: ReducersMapObject<CombinedState, any> = {
  home,
  mine,
  profile,
  cart,
  router: connectRouter(history),
};

const rootReducer: Reducer<CombinedState, any> = combineReducers(produce, reducers);

export default rootReducer;
