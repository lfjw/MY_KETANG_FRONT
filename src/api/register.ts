// 注册

import request from "./index";
import { RegisterPayload } from "src/typings/register";
//import { AxiosResponse } from "axios";


// T 其实代表真正的的返回的数据
// TODO  可以option 点击post 进入，查看具体的内容
export function register<T>(data: RegisterPayload) {
  //return request.post<T, AxiosResponse>(`/user/validate`, data)
  return request.post<T, T>(`/user/register`, data)
}











