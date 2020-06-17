import React, { useState, CSSProperties } from 'react'
import './index.scss'
import { MenuFoldOutlined } from '@ant-design/icons';

import classnames from 'classnames' // 动态类型
import { Transition } from 'react-transition-group'

//import class from 'classnames'
/**
 * let logo = require('../../logo./png')
 * require加载图片，返回值default属性才是图片地址
 * <img src={logo.default}>
 * 
 * 
 * import logo from 'logo.png' ts会有问题
 */


/**
 * 动画如何实现
 * 动态的给元素添加和删除类名
 * 不同到类名对应不同的样式
 * 另外在一个transition
 */


const duration = 600; //动画持续时间
const defauleStyle: CSSProperties = {
  transition: `all ${duration} ease-in-out`,
  opacity: 0,
  display: 'none'
}
// 不同阶段的样式
const transitionStyles = {
  entering: { opacity: 1, },
  entered: { opacity: 1 },
  exiting: { opacity: 0, },
  exited: { opacity: 0, },
  unmounted: { opacity: 0 }
}

interface Props {
  currentCategory: string; //当前选中的分类 此数据会放在redux仓库中
  setCurrentCategory: (currentCategory: string) => any; // 改变仓库中的分类
}
function HomeHeader(props: Props) {
  let [isMenuvisible, setIsMenuvisible] = useState(false)
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLUListElement = event.target as HTMLUListElement
    let category: any = target.dataset.category;
    props.setCurrentCategory(category)
    setIsMenuvisible(false)
  }
  return (
    <header className='home-header'>
      <div className='logo-header'>
        <div className='img'>logo</div>
        <MenuFoldOutlined className='icon' onClick={() => setIsMenuvisible(!isMenuvisible)} />
      </div>
      <Transition in={isMenuvisible} timeout={duration}>
        {
          (state) => (
            <ul className='category'
              onClick={setCurrentCategory}
              style={{
                ...defauleStyle, ...transitionStyles[state]
              }}>
              <li data-category='all' className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
              <li data-category='react' className={classnames({ active: props.currentCategory === 'react' })}>react</li>
              <li data-category='vue' className={classnames({ active: props.currentCategory === 'vue' })}>vue</li>
            </ul>
          )
        }
      </Transition>
      {/* {
        isMenuvisible && (
          <ul className='category' onClick={setCurrentCategory}>
            <li data-category='all' className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
            <li data-category='react' className={classnames({ active: props.currentCategory === 'react' })}>react</li>
            <li data-category='vue' className={classnames({ active: props.currentCategory === 'vue' })}>vue</li>
          </ul>
        )

      } */}

    </header>
  )
}

export default HomeHeader