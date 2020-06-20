import { AnyAction } from "redux";
import { MineState, LOGIN_TYPES } from '../../typings/state'
import * as types from "../action-types";

// 初始值
const initialState: MineState = {
  loginState: LOGIN_TYPES.UN_VALIDATE, // 登录状态
  user: null, // 用户信息
  error: null,
}

export default function (state: MineState = initialState, action: AnyAction): MineState {
  switch (action.type) {
    case types.VALIDATE:
      if (action.payload.success) {
        return {
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data,
          error: null,
        }
      } else {
        return {
          loginState: LOGIN_TYPES.UN_LOGINED,
          user: null,
          error: action.payload,
        }
      }

    case types.LOGOUT:
      return {
        loginState: LOGIN_TYPES.UN_LOGINED,
        user: null,
        error: null
      }

    default:
      break;
  }
  return state
}