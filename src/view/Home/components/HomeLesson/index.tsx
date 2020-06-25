import React, { PropsWithChildren, useEffect, useState } from 'react'
import './index.scss'
import { Lesson, Lessons } from "src/typings";
import { Card, Button, Alert, Skeleton } from 'antd';
import { Link } from "react-router-dom";

type Props = PropsWithChildren<{
  lessons: Lessons,
  getLessons: () => void,
  container: any,
  // callback:any;
}>

// 想让函数组件强行刷新，通过useState
function HomeLesson(props: Props) {
  // forceUpdate 模拟类组件的forceUpdate方法
  // 因为函数组件没有forceUpdate方法，我又想组件强制刷新
  const { getLessons, lessons, container: { current } } = props
  const [_, forceUpdate] = useState(0)



  useEffect(() => {

    current && current.addEventListener('scroll', () => {
      console.log(111);
      forceUpdate((num) => num + 1)
    })
    return () => {

      current && current.removeEventListener('scroll', () => {
        console.log(2);

      })
    }
  }, [current])

  useEffect(() => {
    getLessons()
    // TODO 刷新
    // callback.current = () => forceUpdate((num) => num + 1)
  }, [_, getLessons])

  let start: number = 0; //开始真正渲染的起始索引，从它开始向下渲染3条数据，除此之外卡片都用空的div撑开

  // 获取根元素的大小  50
  let rootFontSize: number = parseFloat(document.documentElement.style.fontSize)


  // 说明容器div已经有了
  if (props.container.current) {
    let scrollTop: number = props.container.current.scrollTop;
    // 轮播图 rem转成px
    let slidersHeight: number = 2.6 * rootFontSize
    // header rem 转成px 
    let headerHeight: number = 1 * rootFontSize
    // 课程列表高度
    let lessonHeight: number = 6.94 * rootFontSize
    // 起始索引应该是向上滑动的高度，抛去header 轮播图 才开始计算的
    if (scrollTop !== 0) {
      start = Math.floor((scrollTop - slidersHeight - headerHeight) / lessonHeight)
    }
  }

  // TODO 下拉会出现加载的loading bug

  return (
    <>

      <Skeleton loading={props.lessons.loading && props.lessons.list.length === 0} active paragraph={{ rows: 8 }}>

        {
          lessons.list.map((item: Lesson, index: number) =>
            index >= start && index <= start + 3 ? (
              <Link key={index} to={{ pathname: `/detail/${item.id}`, state: item }}>
                <Card
                  key={index}
                  hoverable={true}
                  style={{ width: "100%" }}
                  cover={<img src={item.poster} alt="图片" />}
                  className="lesson_box"
                >
                  <Card.Meta
                    title={item.title}
                    description={`价格¥${item.price}元${item.id}`}
                  ></Card.Meta>
                </Card>
              </Link>
            ) : (
                <div key={index} style={{ height: `${6.94 * rootFontSize}px` }}></div>
              )
          )
        }

      </Skeleton>

      {/* 加载下一页 */}

      {
        lessons.hasMore ? <Button onClick={getLessons} type='primary' block loading={lessons.loading}>{lessons.loading ? '' : '加载更多'}</Button> :
          <Alert style={{ textAlign: "center" }} message='到底了' type='warning'></Alert>
      }

    </>
  )
}
//TODO  forwardRef处理组件，返回的新组件可以接收ref
// 组件因为没有实例，是不能使用ref来获取dom的
export default HomeLesson