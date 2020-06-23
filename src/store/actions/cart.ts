

import { Lesson } from "src/typings";
import * as types from 'src/store/action-types'
import { StoreDispatch } from "src/store";
import { message } from "antd";
export default {
  addCartItem(lesson: Lesson) {

    return function (dispatch:StoreDispatch){
      dispatch({
        type: types.ADD_CART_ITEM,
        payload: lesson
      })
      message.info('添加购物车成功')
    }

  }
}