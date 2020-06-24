import React, { PropsWithChildren, useEffect } from 'react'
import './index.scss'
import { Lesson, Lessons } from "src/typings";
import { Card, Button, Alert } from 'antd';
import { Link } from "react-router-dom";

type Props = PropsWithChildren<{
  lessons: Lessons,
  getLessons: () => void
}>

function HomeLesson(props: Props) {
  const { getLessons, lessons } = props

  useEffect(() => {
    getLessons()
  }, [getLessons])
  return (
    <>
      {lessons.list.map((item: Lesson, index: number) => (

        <Link key={index} to={{ pathname: `/detail/${item.id}`, state: item }}>
          <Card
            key={index}
            hoverable={true}
            style={{ width: '100%' }}
            cover={<img src={item.poster} alt='图片' />}
          >
            <Card.Meta title={item.title} description={`价格¥${item.price}元${item.id}`}></Card.Meta>
          </Card>
        </Link>

      ))}
      {/* 加载下一页 */}

      {
        lessons.hasMore ? <Button onClick={getLessons} type='primary' block loading={lessons.loading}>{lessons.loading ? '' : '加载更多'}</Button> :
          <Alert style={{ textAlign: "center" }} message='到底了' type='warning'></Alert>
      }

    </>
  )
}

export default HomeLesson