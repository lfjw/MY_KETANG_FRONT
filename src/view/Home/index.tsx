import React, { PropsWithChildren, useRef } from 'react'
import './index.scss'
import HomeHeader from './components/HomeHeader'
import HomeSliders from "./components/HomeSliders";
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, HomeState } from 'src/typings'
import mapDispatchToProps from 'src/store/actions/home'
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
  // 刚开始是null ，渲染之后，会把div真实的dom元素赋值给current
  let homeContainer = useRef<HTMLDivElement>(null) // {current:null } => {current:HTMLDivElement}

  console.log(props);
  
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
      />

      <div className='home-container' ref={homeContainer}>
        <HomeSliders
          sliders={props.sliders}
          getSliders={props.getSliderList}
        />
      </div>
    </>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => state.home

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// connect(state=> state, action)