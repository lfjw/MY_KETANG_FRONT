

import { CartState, CartItem } from 'src/typings'
import * as types from 'src/store/action-types'
import { AnyAction } from 'redux'

let initialState: CartState = []

export default function (state: CartState = initialState, action: AnyAction): any {
  switch (action.type) {
    // 向购物车里添加一个条目，如果有商品数量加1，没有则加一个条目
    case types.ADD_CART_ITEM:

      let oldLesson = state.find(item => item.lesson.id === action.payload.id)
      if (oldLesson) {
        oldLesson.count += 1
      } else {
        state.push({ count: 1, checked: false, lesson: action.payload })
      }
      return state
    // 删除一个
    case types.REMOVE_CART_ITEM:
      let removeIndex = state.findIndex(item => item.lesson.id === action.payload)
      if (removeIndex !== -1) {
        state.splice(removeIndex, 1)
      }
      return state

    // 清空购物车
    case types.CLEAR_CART_ITEM:
      return []

    // 改变数量
    case types.CHANGE_CART_ITEM_COUNT:
      let changeLesson = state.find(item => item.lesson.id === action.payload.id);
      if (changeLesson) {
        changeLesson.count = action.payload.count;
      }
      return state

    // 选中的条目
    case types.CHANGE_CHECKED_CART_ITEMS:
      let checkedIds = action.payload;
      return state.map((item: CartItem) => {
        // 选中
        if (checkedIds.includes(item.lesson.id)) {
          item.checked = true
        } else {
          item.checked = false;
        }
        return item
      })
    // 结算
    case types.SETTLE:
      return state.filter((item: CartItem) => !item.checked)
    default:
      break;
  }
  return state
}