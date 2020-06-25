import React, { useState, useEffect, PropsWithChildren, useCallback } from 'react'
import './index.scss'
import { Lesson, CombinedState } from 'src/typings';
import Nav from 'src/components/Nav';
import { Card, Button } from 'antd';

import { connect } from "react-redux";

import mapDispatchToProps from "src/store/actions/cart";
import { RouteComponentProps, StaticContext } from "react-router";

interface Params {
  id: string;
}

// 添加& typeof actions 拿到cart actions的方法
type Props = PropsWithChildren<
  RouteComponentProps<Params, StaticContext, Lesson> & typeof mapDispatchToProps
>;

// TODO props不应该为any
function Detail(props: any) {

  const [lesson] = useState<Lesson>(props.location.state)
  useEffect(() => {

  }, [])

  // 每次都是共一个函数，不会形成新的函数
  const addCart = useCallback((lesson: Lesson) => {
    // 动画效果
    // 1 获取dom
    const cover: HTMLDivElement = (document.querySelector('.ant-card-cover') as HTMLDivElement)
    const coverWidth = cover.offsetWidth;// 购物车图片
    const coverHeight = cover.offsetHeight;// 购物车图片

    const coverLeft = cover.getBoundingClientRect().left; // 距离左边的距离
    const coverTop = cover.getBoundingClientRect().top; // 距离顶部的距离


    // 2 放到购物车
    const card: HTMLDivElement = (document.querySelector('.cart-box') as HTMLDivElement)
    const cardWidth = card.offsetWidth;// 购物车图片
    const cardHeight = card.offsetHeight;// 购物车图片
    const cartRight = card.getBoundingClientRect().right; // 右边距离左边的距离
    const cardBottom = card.getBoundingClientRect().bottom; //底部距离顶部的距离


    // 3. 克隆
    const clonedCover = (cover.cloneNode(true) as HTMLAreaElement);

    clonedCover.style.cssText = (
      `
        z-index: 1000;
        opacity: .8;
        position:fixed;
        width:${coverWidth}px;
        height:${coverHeight}px;
        top:${coverTop}px;
        left:${coverLeft}px;
        transition:all 2s ease-in-out;
      `
    )


    document.body.appendChild(clonedCover)

    setTimeout(() => {
      clonedCover.style.left = `${cartRight - cardWidth / 2}px`
      clonedCover.style.top = `${cardBottom - cardHeight / 2}px`

      clonedCover.style.width = `0px`
      clonedCover.style.height = `0px`
      clonedCover.style.opacity = '0'


    }, 0);

    setTimeout(() => {
      (clonedCover.parentNode as Node).removeChild(clonedCover)

    }, 5000);

    props.addCartItem(lesson)
  }, [props])

  return (
    <>
      <Nav history={props.history}>课程详情</Nav>
      <Card hoverable style={{ width: '100%' }} cover={<img src={lesson.poster} alt='图片'></img>}>
        <Card.Meta title={lesson.title} description={
          <>
            <p>{`价格${lesson.price}元`}</p>
            <p>
              <Button className='add=cart' onClick={() => addCart(lesson)}>添加购物车</Button>
            </p>
          </>
        }>
        </Card.Meta>
      </Card>
    </>
  )
}

export default connect((state: CombinedState): CombinedState => state, mapDispatchToProps)(Detail)