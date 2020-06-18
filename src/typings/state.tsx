import {
  RouterState,
} from "connected-react-router";

export interface HomeState {
  currentCategory: string;
}

export interface User {
  username: string;
  email: string;
  avatar: string;
}
// 枚举
export enum LOGIN_TYPES {
  UN_VALIDATE = 'UN_VALIDATE', // 未验证
  LOGINED = 'LOGINED',  //已经登陆
  UN_LOGINED = 'UN_LOGINED' // 的确没有登录
}
export interface MineState {
  loginState:LOGIN_TYPES; // 登录状态
  user: User | null; // 用户信息
  error: string | null
}

export interface ProfileState {

}

export interface CombinedState {
  home: HomeState;
  mine: MineState;
  profile: ProfileState;
  router: RouterState;
}
