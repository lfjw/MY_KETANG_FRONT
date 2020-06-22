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
    console.log(11);

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

//TODO 下拉距离不生效
export function downRefresh(element: HTMLDivElement, callback: Function) {
  let startY: number; // 变量 ，按下的纵坐标
  let distance: number; // 下拉的距离
  let originalTop = element.offsetTop; // 最初此元素距离顶部的距离  top = 55

  element.addEventListener('touchstart', function (event: TouchEvent) {
    // 为什么不能用防抖，如果防抖是最后一次才实现，那么当你拉的过程中没有任何的反应，一松手，就出现空隙，不合理
    // TODO 完善节流函数
    //let touchmove = throttle(_touchMove, 60)

    // 当此元素处于原始位置才能下拉，回弹的过程不能下拉，并且向上滚动的高度为0
    if (element.offsetTop === originalTop && element.scrollTop === 0) {
      startY = event.touches[0].pageX // 记录当前点击的纵坐标
      element.addEventListener('touchmove', _touchMove)
      element.addEventListener('touchend', _touchEnd)
    }

    function _touchMove(event: TouchEvent) {
      let pageY = event.touches[0].pageY // 拿到最新的纵坐标
      console.log(pageY, 'pageY', startY, 'startY');

      if (pageY > startY) {
        distance = pageY - startY
        element.style.top = originalTop + distance + 'px'
      } else {
        element.removeEventListener('touchmove', _touchMove)
        element.removeEventListener('touchend', _touchEnd)
      }
    }


    function _touchEnd() {
      element.removeEventListener('touchmove', _touchMove)
      element.removeEventListener('touchend', _touchEnd)
      let timer = setInterval(() => {
        if (distance < 1){
          element.style.top = originalTop + 'px'
          clearInterval(timer)
        }
        element.style.top = originalTop + (--distance) + 'px'
      }, 12)

      if(distance > 30){
        callback()
      }
    }
  })

}





// 防抖
export function debounce(fn: Function, wait: number) {
  let timeout: any = null;
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
// export function throttle(fn: Function, delay: number) {
//   let prev = Date.now() // 上次时间
  
//   return function () {
  
//     let context = this;
//     let args = arguments;
//     let now = Date.now()
//     if (now - prev >= delay){
//       fn.apply(context, args)
//       prev = now;
//     }
//   }
// }