

import { RegisterPayload } from "../../typings/register";
import { message } from "antd";
import { register } from "src/api/register";
import { RegisterData } from "src/typings/response";
//import { AxiosResponse } from "axios";
import { push } from "connected-react-router";

export default {
  register(data: RegisterPayload) {
    return function (dispatch: any, getState: any) {
      // 此处为什么要套一层async函数呢，就是为了使用await 

      (async function () {
        try {
          // AxiosResponse data 才是响应体
          let result: RegisterData = await register<RegisterData>(data)
          //if (result.data.success) {
          if (result.success) {
            dispatch(push('/login'))
          } else {
            message.error(`注册失败，请重试！`)
          }
        } catch (error) {
          message.error(`注册失败${error}`)
        }
      })()
    }
  }
}