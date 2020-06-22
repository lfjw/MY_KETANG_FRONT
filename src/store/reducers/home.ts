import { AnyAction } from "redux";
import { HomeState } from "../../typings";
import * as types from "../action-types";

const initialState: HomeState = {
  currentCategory: "all", //当前分类
  sliders: [], // 图片
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5
  }

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
    case types.SET_LESSONS_LOADING:
      state.lessons.loading = action.payload
      return state
    // 上拉加载
    case types.SET_LESSONS:
      state.lessons.loading = false;
      state.lessons.list = [...state.lessons.list, ...action.payload.list]
      state.lessons.hasMore = action.payload.hasMore
      state.lessons.offset = state.lessons.offset + action.payload.list.length
      return state

    // reducer 规定不要改对象，永远都会返回一个新对象
    // scu优化
    // immer 优化
    // return {
    //   ...state, // 老状态
    //   lessons: {
    //     ...state.lessons,
    //     loading: false,
    //     list: [...state.lessons.list, ...action.payload.list],
    //     hasMore: action.payload.hasMore,
    //     offset: state.lessons.offset + action.payload.list.length,
    //   }
    // }; 

    // 下拉刷新
    case types.REFRESH_LESSONS:
      state.lessons.loading = false;
      state.lessons.list = action.payload.list
      state.lessons.hasMore = action.payload.hasMore
      state.lessons.offset = action.payload.list.length
      return state
    default:
      break;
  }

  return state;
}
