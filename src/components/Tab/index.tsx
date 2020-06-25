import React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import './index.scss'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
// interface Props {

// }


type Props = RouteComponentProps
function Tab(props: Props) {
  if(props.location.pathname === '/cart'){
    return null
  }
  return (
    <footer>
      <NavLink exact to='/'><StarOutlined /><span>首页</span></NavLink>
      <NavLink to='/cart' className='cart-box'><StarFilled />购物车</NavLink>
      <NavLink to='mine'><StarTwoTone />个人中心</NavLink>
    </footer>
  )
}

export default withRouter(Tab)