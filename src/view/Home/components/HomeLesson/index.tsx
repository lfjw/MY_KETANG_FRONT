import React, { PropsWithChildren, useEffect } from 'react'
import './index.scss'
import { Lesson } from "src/typings";

type Props = PropsWithChildren<{
  lessons: any;//Lessons[],
  getLessons: () => void
}>

function HomeLesson(props: Props) {
  const { getLessons, lessons } = props
  
  useEffect(() => {
    getLessons()
  }, [getLessons])
  return (
    <>
      {lessons.list.map((res: Lesson, index: number) => (
        <div key={index}>{res.poster}</div>
      ))}
    </>
  )
}

export default HomeLesson