import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
interface Props {

}

function Tab(props: Props) {
  return (
    <footer>
      <NavLink exact to='/'><StarOutlined /><span>首页</span></NavLink>
      <NavLink to='/profile'><StarFilled />购物车</NavLink>
      <NavLink to='mine'><StarTwoTone />个人中心</NavLink>
    </footer>
  )
}

export default Tab