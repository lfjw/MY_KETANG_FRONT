import * as types from '../action-types'
import { sliderList, getLessons } from 'src/api/home'
import { StoreDispatch, StoreGetState } from 'src/store'
import { LessonData, SliderData } from 'src/typings'
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
    // return {
    //   type: types.GET_SLIDERS,
    //   payload: sliderList()
    // }

    return function (dispatch: StoreDispatch, getState: StoreGetState) {
      (async function () {
        const res: SliderData = await sliderList<SliderData>();
        dispatch({
          type: types.GET_SLIDERS,
          payload: res
        })
      })()
    }
  },
  // 获取课程列表
  getLessons() {
    return function (dispatch: StoreDispatch, getState: StoreGetState) {
      (async function () {
        let { currentCategory, lessons: { hasMore, offset, limit, loading } } = getState().home

        if (!loading && hasMore) {

          dispatch({
            type: types.SET_LESSONS_LOADING,
            payload: true
          }) // loading设置为true

          let result: LessonData = await getLessons<LessonData>(currentCategory, offset, limit) // loading设置为true

          // 调用接口加载数据
          dispatch({
            type: types.SET_LESSONS,
            payload: result.data
          })

        }
      })()
    }
  }

}