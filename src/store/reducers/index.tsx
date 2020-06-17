import { combineReducers, ReducersMapObject, Reducer } from "redux";
import {
  connectRouter,
  LocationChangeAction,
} from "connected-react-router";
import home from "./home";
import mine from "./mine";
import profile from "./profile";
import history from "../../history";
import { CombinedState } from '../../typings/state'

let reducers: ReducersMapObject<CombinedState, LocationChangeAction> = {
  home,
  mine,
  profile,
  router: connectRouter(history),
};

const rootReducer: Reducer<CombinedState, LocationChangeAction> = combineReducers<
  CombinedState
>(reducers);

export default rootReducer;
