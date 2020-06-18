import React, { PropsWithChildren } from 'react'
import './index.scss'
import HomeHeader from './components/HomeHeader'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, HomeState } from '../../typings/state'
import mapDispatchToProps from '../../store/actions/home'
/**
 * 因为此组件是由路由渲染出来的
 * 所以属性对象会包含路由属性
 */
// TODO 深入了解一下 typeof 泛型
// PropsWithChildren 用到children要写
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>
// 等价于
// type Prop = RouteComponentProps &  HomeState

function Home(props: Props) {
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
      />
    </>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => state.home

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// connect(state=> state, action)