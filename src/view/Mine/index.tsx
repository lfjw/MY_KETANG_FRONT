import React, { PropsWithChildren, useEffect } from 'react'
import './index.scss'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, MineState, LOGIN_TYPES } from '../../typings/state'
import mapDispatchToProps from '../../store/actions/mime'
import Nav from '../../components/Nav'
import history from '../../history';
import { Descriptions, Button, Alert } from 'antd'

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>
function Mine(props: Props) {
  const { validate, loginState, user } = props
  // TODO []概念 props 会导致死循环，深入了解一下
  useEffect(() => {
    validate()
  }, [validate])

  let content;

  if (loginState === LOGIN_TYPES.UN_VALIDATE) {
    // 未验证
    content = null
  } else if (loginState === LOGIN_TYPES.LOGINED) {
    console.log(user, '----');
    // 登录
    content = (
      <div className='user-info'>
        <Descriptions title='当前用户'>
          <Descriptions.Item label='用户名'>
            jw
          </Descriptions.Item>
          <Descriptions.Item label='邮箱'>
            jw
          </Descriptions.Item>
        </Descriptions>
        // TODO 退出函数有问题
        <Button>退出</Button>
      </div>
    )
  } else {
    //未登录
    content = (
      <>
        <Alert type='warning' message='未登录' description='亲爱的用户，你尚未登录'></Alert>
        <div style={{ textAlign: 'center', padding: '.5rem' }}>
          <Button onClick={() => props.history.push('/login')}>登录</Button>
          <Button onClick={() => props.history.push('/register')}>注册</Button>
        </div>
      </>
    )
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