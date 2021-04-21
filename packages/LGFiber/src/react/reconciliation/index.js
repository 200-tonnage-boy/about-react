import { createTaskQueue } from "../Misc";
const taskQueue = createTaskQueue();

let subTask = null; // 当前任务

const getFirstTask = () => {
  // 获取任务队列中的第一个任务
  const task = taskQueue.pop()
  // 根节点的Fiber对象
  return {
    props:task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
};
const excuteTask = () => {
  // 执行任务队列里的任务；执行任务就是根据Vdom对象创建Fiber对象，
  // 注意组件树的顺序，在构建过程中，只有第一个儿子算是父亲的儿子，其他的是第一个儿子的兄弟
};
const workLoop = (deadLine) => {
  if (!subTask) {
    // 当前没有任务的话就获取第一个,注意这个函数并不是指获取任务队列里的第一个，应该是指根节点
    subTask = getFirstTask();
  }
  while (subTask && deadLine.timeRemaining() > 1) {
    // 如果当前有任务，并且浏览器有空余时间，就循环执行任务；
    subTask = excuteTask(); // 执行计算任务，并返回下一个任务
  }
};

const performTask = (deadLine) => {
  workLoop(deadLine);// 循环执行任务
  if (subTask || taskQueue.isEmpty()) {
    // 如果在执行过程中有更高优先级的任务插入进来，会被打断执行，进入到这里，此时根据队列任务情况继续注册空闲时间执行；
    requesIdleCallback(performTask);
  }
};

export const render = (element, dom) => {
  // 1.向任务队列中添加任务
  // 2.指定浏览器空闲时执行任务
  //tips： 任务就是：通过vdom构建Fiber；

  taskQueue.push({
    dom, // 注意这里指的是root元素，根节点，与其他节点的处理方式不同；
    props: {
      children: element,
    },
  });

  requesIdleCallback(performTask); // 回调函数会有默认参数deadline，可以获取空余时间
};
