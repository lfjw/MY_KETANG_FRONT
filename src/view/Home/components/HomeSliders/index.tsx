import React, { PropsWithChildren, useEffect } from 'react'
import './index.scss'
import { Carousel } from 'antd';
import { Slider } from 'src/typings';

type Props = PropsWithChildren<{
  sliders: Slider[],
  getSliders: () => void;
}>
function HomeSliders(props: Props) {
  // TODO [prop]
  useEffect(() => {
    if (props.sliders.length === 0) {
      props.getSliders();
    }
  }, [props])

  return (
    <Carousel>
      {
        props.sliders.map((item: Slider, index: number) => (
          <div key={index} className='img'>
            <img src={item.url} alt='图片'></img>
          </div>
        ))
      }
    </Carousel>
  )
}

export default HomeSliders