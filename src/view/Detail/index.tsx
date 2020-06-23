import React, { useState, useEffect, PropsWithChildren } from 'react'
import './index.scss'
import { Lesson, CombinedState } from 'src/typings';
import Nav from 'src/components/Nav';
import { Card, Button } from 'antd';

import { connect } from "react-redux";

import actions from "src/store/actions/cart";
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from "react-router";

interface Params {
  id: string;
}


// TODO 添加& typeof actions 拿到cart actions的方法
type Props = PropsWithChildren<
  RouteComponentProps<Params, StaticContext, Lesson> & typeof actions
>;


function Detail(props: any) {

  const [lesson] = useState<Lesson>(props.location.state)
  useEffect(() => {

  }, [])



  const addCart = (lesson: Lesson) => {
    console.log(lesson);
    props.addCartItem(lesson)

  }
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

export default connect((state: CombinedState): CombinedState => state, actions)(Detail)