import React, { useState, useEffect } from 'react'
import './index.scss'
import { Lesson, CombinedState } from 'src/typings';
import Nav from 'src/components/Nav';
import { Card } from 'antd';

import { connect } from "react-redux";

import actions from "src/store/actions/home";
type Props = any;
function Detail(props: Props) {

  const [lesson, setLesson] = useState<Lesson>(props.location.state)
  console.log(props,'---');
  
  useEffect(() => {
    // 1 没有传lesson，需要调接口
    // 2 或者刷新
    if (!lesson) {

    }

  }, [lesson])
  return (
    <>
      <Nav history={props.history}>课程详情</Nav>
      <Card hoverable style={{ width: '100%' }} cover={<img src={lesson.poster} alt='图片'></img>}>
        <Card.Meta title={lesson.title} description={<p>{`价格${lesson.price}元`}</p>}>
        </Card.Meta>
      </Card>
    </>
  )
}



export default connect((state: CombinedState): CombinedState => state, actions)(Detail)