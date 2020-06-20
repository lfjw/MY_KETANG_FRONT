

import { LoginPayload } from "src/typings/login";
import { message } from "antd";
import { login } from "src/api/login";
import { LoginData } from "src/typings/response";
import { push } from "connected-react-router";

export default {
  login(data: LoginPayload) {
    return function (dispatch: any, getState: any) {
      // 此处为什么要套一层async函数呢，就是为了使用await 

      (async function () {
        try {
          // AxiosResponse data 才是响应体
          let result: LoginData = await login<LoginData>(data)
          //if (result.data.success) {
          if (result.success) {
            sessionStorage.setItem('access_token', result.data)
            dispatch(push('/mine'))
          } else {
            message.error(`登录失败`)
          }
        } catch (error) {
          message.error(`登录失败`)
        }
      })()
    }
  }
}