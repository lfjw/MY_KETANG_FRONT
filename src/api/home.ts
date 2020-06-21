
import request from "./index";
import { SliderData } from "src/typings";

export function sliderList() {
  return request.get<SliderData, SliderData>(`/slider/list`)
}


export function getLessons<T>(category: string = 'all', offset: number, limit: number) {
  return request.get<T, T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`)
}