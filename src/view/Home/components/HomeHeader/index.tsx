import React, { useState, CSSProperties, useEffect } from "react";
import "./index.scss";
import { MenuFoldOutlined } from "@ant-design/icons";

import classnames from "classnames"; // 动态类型
import { Transition } from "react-transition-group";

//import class from 'classnames'
/**
 * let logo = require('../../logo./png')
 * require加载图片，返回值default属性才是图片地址
 * <img src={logo.default}>
 *
 *
 * import logo from 'logo.png' ts会有问题
 * 
 * ts不认识图片 只认识js jsx tsx 不能加载
 * 想要import 需要加文件
 * images.d.ts 
 * declare module '*.svg'
 * declare module '*.png'
 * declare module '*.jpg'
 * declare module '*.jpeg'
 * declare module '*.gif'
 * declare module '*.bmp'
 * declare module '*.tiff'
 */

/**
 * 动画如何实现
 * 动态的给元素添加和删除类名
 * 不同到类名对应不同的样式
 * 另外在一个transition
 */

const duration = 300;

const defaultStyle: CSSProperties = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

interface TransitionStyles {
  entering: CSSProperties;
  entered: CSSProperties;
  exiting: CSSProperties;
  exited: CSSProperties;
  unmounted: CSSProperties;
}
const transitionStyles: TransitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 }
};

interface Props {
  currentCategory: string; //当前选中的分类 此数据会放在redux仓库中
  setCurrentCategory: (currentCategory: string) => any; // 改变仓库中的分类
}
function HomeHeader(props: Props) {
  let [isMenuVisible, setIsMenuVisible] = useState(false);
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLUListElement = event.target as HTMLUListElement;
    let category: any = target.dataset.category;
    props.setCurrentCategory(category);
    setIsMenuVisible(false);
  };


  useEffect(() => {
    console.log('订阅');
    return () => {
      console.log('取消订阅');

    }

  })
  return (
    <header className="home-header">
      <div className="logo-header">
        <div className="img">logo</div>
        <MenuFoldOutlined
          className="icon"
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        />
      </div>
      <Transition in={isMenuVisible} timeout={duration}>
        {/* 类型声明 */}
        {(state: keyof TransitionStyles) => (
          <ul
            className="category"
            onClick={setCurrentCategory}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <li
              data-category="all"
              className={classnames({
                active: props.currentCategory === "all",
              })}
            >
              全部课程
            </li>
            <li
              data-category="react"
              className={classnames({
                active: props.currentCategory === "react",
              })}
            >
              react
            </li>
            <li
              data-category="vue"
              className={classnames({
                active: props.currentCategory === "vue",
              })}
            >
              vue
            </li>
          </ul>
        )}
      </Transition>
      {/* {
        isMenuVisible && (
          <ul className='category' onClick={setCurrentCategory}>
            <li data-category='all' className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
            <li data-category='react' className={classnames({ active: props.currentCategory === 'react' })}>react</li>
            <li data-category='vue' className={classnames({ active: props.currentCategory === 'vue' })}>vue</li>
          </ul>
        )

      } */}
    </header>
  );
}

export default HomeHeader;
