
import request from "./index";
import { SliderData } from "src/typings";
export function sliderList(){
  return request.get<SliderData, SliderData>(`/slider/list`)
}
