import React, { useRef, useEffect, PropsWithChildren } from 'react'
import './index.scss'
import HomeHeader from './components/HomeHeader'
import HomeSliders from "./components/HomeSliders";
import HomeLesson from "./components/HomeLesson";
//import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, HomeState } from 'src/typings'
import mapDispatchToProps from 'src/store/actions/home'
import { loadMore, downRefresh } from 'src/utils'
import { Spin } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

/**
 * 因为此组件是由路由渲染出来的
 * 所以属性对象会包含路由属性
 */
// TODO 深入了解一下 typeof 泛型
// PropsWithChildren 用到children要写

// TODO 类型注释掉了，记得查看原因
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>
// 等价于
// type Prop = RouteComponentProps &  HomeState


interface Div {
  current: HTMLDivElement
}
function Home(props: Props) {
  // 刚开始是null ，渲染之后，会把div真实的dom元素赋值给current
  const homeContainer = useRef<HTMLDivElement>(null) // {current:null } => {current:HTMLDivElement}

  // let lessonList = useRef(null)
  // let n = {
  //   current: ''
  // }

  const { getLessons, refreshLessons, lessons } = props

  useEffect(() => {
    loadMore((homeContainer as Div).current, getLessons)
    downRefresh((homeContainer as Div).current, refreshLessons)
    
    if (lessons.list.length > 0) {
      (homeContainer as Div).current.scrollTop = Number(localStorage.getItem('homeScrollTop')) 
    }

    return () => {
      localStorage.setItem('homeScrollTop', (homeContainer as Div).current.scrollTop + "")
    }

  }, [getLessons, homeContainer, lessons.list.length, refreshLessons])
  return (
    <>
      <HomeHeader
        refreshLessons={refreshLessons}
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
      />
      <div className='refresh-loading'>
        <Spin size='large' />
      </div>
      <div className='home-container' ref={homeContainer}>
        <HomeSliders
          sliders={props.sliders}
          getSliders={props.getSliderList}
        />
        <HomeLesson
          container={homeContainer}
          // ref={lessonList}
          // callback={n}
          getLessons={props.getLessons}
          lessons={props.lessons}
        />
      </div>
    </>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => state.home

export default connect(mapStateToProps, mapDispatchToProps)(Home as any)