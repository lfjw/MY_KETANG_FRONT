import { combineReducers, ReducersMapObject, Reducer } from "redux";
import {
  connectRouter,
  RouterState,
  LocationChangeAction,
} from "connected-react-router";

import home, { HomeState } from "./home";
import mine, { MineState } from "./mine";
import profile, { ProfileState } from "./profile";
import history from "../../history";

interface RootState {
  home: HomeState;
  mine: MineState;
  profile: ProfileState;
  router: RouterState;
}

let reducers: ReducersMapObject<RootState, LocationChangeAction> = {
  home,
  mine,
  profile,
  router: connectRouter(history),
};

const rootReducer: Reducer<RootState, LocationChangeAction> = combineReducers<
  RootState
>(reducers);

export default rootReducer;
