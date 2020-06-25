

import { Lesson } from "src/typings";
import * as types from 'src/store/action-types'
import { StoreDispatch } from "src/store";
import { message } from "antd";
export default {
  // 添加单挑数据
  addCartItem(lesson: Lesson) {

    return function (dispatch: StoreDispatch) {
      dispatch({
        type: types.ADD_CART_ITEM,
        payload: lesson
      })
      message.info('添加购物车成功')
    }
  },

  changeCartItemCount(id: string, count: number) {
    return {
      type: types.CHANGE_CART_ITEM_COUNT,
      payload: { id, count }
    }
  },
  removeCartItem(id: string) {
    return {
      type: types.REMOVE_CART_ITEM,
      payload: id
    }
  },

  changeCheckedCartItems(checkIds: string[]) {
    return {
      type: types.CHANGE_CHECKED_CART_ITEMS,
      payload: checkIds
    }
  },


  clearCartItems(){
    return {
      type: types.CLEAR_CART_ITEM
    }
  },

  settle(){
    return {
      type: types.SETTLE
    }
  }


}