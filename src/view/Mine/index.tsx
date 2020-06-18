import React, { PropsWithChildren } from 'react'
import './index.scss'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, MineState, LOGIN_TYPES } from '../../typings/state'
import mapDispatchToProps from '../../store/actions/home'
import Nav from '../../components/Nav'
import history from '../../history';

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>
function Mine(props: Props) {
  let content;

  // 未验证
  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null
  }
  return (
    <>
      <Nav history={history}>个人中心</Nav>
      {content}
    </>
  )
}

const mapStateToProps = (state: CombinedState): MineState => state.mine

export default connect(mapStateToProps, mapDispatchToProps)(Mine)