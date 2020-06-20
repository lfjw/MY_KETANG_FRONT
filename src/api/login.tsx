
import request from "./index";
import { LoginPayload } from "src/typings/login";

export function login<T>(data: LoginPayload) {
  return request.post<T, T>(`/user/login`, data)
}
