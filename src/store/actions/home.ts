import * as types from '../action-types'
import { sliderList } from 'src/api/home'
export default {
  // 设置分类
  setCurrentCategory(currentCategory: string) {
    return {
      type: types.SET_CURRENT_CATEGORY,
      payload: currentCategory
    }
  },
  getSliderList() {
    //sliderList 返回一个promise
    // 你向仓库派发一个这样action.payload 是一个promise 
    // 中间件redux-promise会等待promise完成，完成之后，会再次派发action  dispatch({type:GET_SLIDERS, payload:SliderData}) SliderData返回结果
    return {
      type: types.GET_SLIDERS,
      payload: sliderList() 
    }
    
  }
}