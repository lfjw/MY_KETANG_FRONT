
import request from "./index";

export function sliderList<T>() {
  return request.get<T, T>(`/slider/list`)
}


export function getLessons<T>(category: string = 'all', offset: number, limit: number) {
  return request.get<T, T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`)
}