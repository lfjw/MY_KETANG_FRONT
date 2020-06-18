import { AnyAction } from "redux";
import { MineState, LOGIN_TYPES } from '../../typings/state'


// 初始值
const initialState: MineState = {
    loginState: LOGIN_TYPES.UN_VALIDATE, // 登录状态
    user: null, // 用户信息
    error: null,
}

export default function (state: MineState = initialState, action: AnyAction): MineState {
    return state
}