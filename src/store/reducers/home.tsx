import { AnyAction } from "redux";
import { HomeState } from "../../typings/state";
import * as types from "../action-types";

const initialState: HomeState = {
  currentCategory: "all", //当前分类
};

export default function (
  state: HomeState = initialState,
  action: AnyAction
): HomeState {
  switch (action.type) {
    case types.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };

    default:
      break;
  }

  return state;
}
