
import { User } from "src/typings";

//注册接口返回的响应体类型
export interface RegisterData {
  success: boolean;
  data: User
}

export interface LoginData {
  success: boolean;
  data: string
}