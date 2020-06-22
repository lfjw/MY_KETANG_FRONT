import { Slider, Lesson } from './index'


export interface Lessons {
  loading: boolean; // 正在加载中 true
  list: Lesson[];
  hasMore: boolean;
  offset: number;
  limit: number
}


export interface HomeState {
  currentCategory: string;
  sliders: Slider[];
  lessons: Lessons,
}