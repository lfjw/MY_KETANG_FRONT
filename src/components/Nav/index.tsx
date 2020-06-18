import React, { PropsWithChildren } from 'react'
import './index.scss'
//import { RouteComponentProps } from 'react-router-dom'
import { History } from 'history';

//type Props = PropsWithChildren<RouteComponentProps>
type Props = PropsWithChildren<{
  history: History
}>
function Nav(props: Props) {
  return (
    <div className='nav-header'>
      <span onClick={() => props.history.goBack()}>返回</span>
      <span>{props.children}</span>
    </div>
  )
}

export default Nav