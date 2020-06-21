import React, { PropsWithChildren, useEffect } from 'react'
import './index.scss'
import { Lessons } from 'src/typings'


type Props = PropsWithChildren<{
  lessons: Lessons[],
  getLessons: () => void
}>
function HomeLesson(props: Props) {
  console.log(props);
  
  useEffect(() => {
    const { getLessons} = props
    getLessons()
    console.log(11);
    
  }, [props])
  return (
    <>
      
    </>
  )
}

export default HomeLesson