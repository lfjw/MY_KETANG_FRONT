import * as types from '../action-types'

export default {
  // 设置分类
  setCurrentCategory(currentCategory: string) {
    return {
      type: types.SET_CURRENT_CATEGORY,
      payload: currentCategory
    }
  },
  
}