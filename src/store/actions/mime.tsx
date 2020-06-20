import * as types from "../action-types";
import { validate } from "../../api/mime";
//import { push } from "connected-react-router";


// JWT 如何退出登录
// 删除本地存储的token

export default {
  validate() {
    return {
      type: types.VALIDATE,
      payload: validate()
    }
  },
  // logout() {
  //   return function (dispatch: any) {
  //     sessionStorage.removeItem('access_token');
  //     dispatch(push('/login'))
  //   }
  // }
}
