import React, { PropsWithChildren, useEffect } from 'react'
import './index.scss'
import { Carousel } from 'antd';
import { Slider } from 'src/typings';

type Props = PropsWithChildren<{
  sliders: Slider[],
  getSliders: () => void;
}>

function HomeSliders(props: Props) {

  const { getSliders, sliders } = props

  useEffect(() => {
    
    if (sliders.length === 0) {
      getSliders()
    }
  }, [getSliders, sliders.length])

  return (
    <>
      {sliders.length !== 0 && <Carousel autoplay>
        {
          sliders.map((item: Slider, index: number) => (
            <div key={index} className='img'>
              <img src={item.url} alt='图片'></img>
            </div>
          ))
        }
      </Carousel>}
    </>

  )
}

export default HomeSliders