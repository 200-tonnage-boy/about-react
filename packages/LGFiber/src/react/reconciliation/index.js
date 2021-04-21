import {createTaskQueue} from '../Misc'
const taskQueue = createTaskQueue()
export const render = (element, dom) => {
  // 1.向任务队列中添加任务
  // 2.指定浏览器空闲时执行任务
  //tips： 任务就是：通过vdom构建Fiber；

  taskQueue.push({
    dom,// 注意这里指的是root元素，根节点，与其他节点的处理方式不同；
    props:{
      children: element
    }
  })
}