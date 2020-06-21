import { AnyAction } from "redux";
import { HomeState } from "../../typings";
import * as types from "../action-types";

const initialState: HomeState = {
  currentCategory: "all", //当前分类
  sliders: [], // 图片
};

// TODO redux-immer 优化了解一下
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

    case types.GET_SLIDERS:
      return {
        ...state, // 老状态
        sliders: action.payload.data
      };

    default:
      break;
  }

  return state;
}
