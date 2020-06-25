/**
 * 快到底部就加载下一页
 * 原理：
 * 
 * - 容器高度 - 向上滑动的高度
 * - 向上滑动的高度+ 容器的高度>= 内容高度，意味着到了底部，可以加载下一页了
 * 
 * @param element 元素
 * @param callback 回调函数
 */

export function loadMore(element: HTMLDivElement, callback: Function) {
  function _loadMore() {
    let conHeight = element.clientHeight // 容器高度
    let scrollTop = element.scrollTop // 向上滑动的高度
    let scrollHeight = element.scrollHeight // 内容高度
    if (conHeight + scrollTop >= scrollHeight) {
      callback()
    }
  }
  // 优化处理debounce 防抖 一段时间只执行一次
  element.addEventListener("scroll", debounce(_loadMore, 300))
}


/**
 * 下拉刷新
 * 
 * 容器距离顶部的距离 offsetTop
 */


export function downRefresh(element: HTMLDivElement, callback: Function) {

  let startY: number; //刚按下的时候，初始坐标
  let distance: number; //下拉的距离
  let originTop = element.offsetTop; // 最初的距离父级顶部的距离
  // 按下
  element.addEventListener('touchstart', function (event: TouchEvent) {


    console.log(element.scrollTop,'----element.scrollTop---element.scrollTop');
    
    // 回弹过程中在拉不生效
    if (element.offsetTop !== originTop) return

    // 上拉过程中不能下拉
    if (element.scrollTop !== 0) return

    startY = event.touches[0].pageY;
    element.addEventListener('touchmove', throttle(touchmove, 60))
    element.addEventListener('touchend', touchend)

    function touchmove(eventMove: TouchEvent) {
      let moveY = eventMove.touches[0].pageY;
      // 只要下拉距离大于初始值，那么就让页面向下滑动，否则移除事件
      if (moveY > startY) {
        distance = moveY - startY 
        element.style.top = originTop + distance + 'px'
      } else {
        element.removeEventListener('touchmove', touchmove)
        element.removeEventListener('touchend', touchend)
      }
    }

    // 松手弹回去
    function touchend() {
      element.removeEventListener('touchmove', touchmove)
      element.removeEventListener('touchend', touchend)
      // 每隔13毫秒回弹
      let timer = setInterval(() => {
        if (distance < 1) {
          element.style.top = originTop + 'px'
          clearInterval(timer)
        } else {
          element.style.top = originTop + (--distance) + 'px'
        }
      }, 13);
      console.log(timer);
      

      // element.style.transition = 'all 1s ease-in';
      // element.style.top = originTop + 'px'

      // 当下拉距离大于30px，就执行函数
      
      if (distance > 30) {
        callback()
      }
    }

  })

}

/**
 * 防抖
 * 一段时间只执行最后一次
 * @param fn 执行代码
 * @param wait 等待时间
 */
export function debounce(fn: Function, wait: number) {
  let timeout: number | null = null;
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait);
  }
}

/**
 * 节流 60ms执行一次
 * @param fn
 * @param delay 间隔时间
 */
export function throttle(fn: Function, delay: number) {
  let prev: number = Date.now() // 上次时间
  return function () {
    let context = this;
    let args = arguments;
    let now: number = Date.now()
    if (now - prev >= delay) {
      fn.apply(context, args)
      prev = now;
    }
  }
}