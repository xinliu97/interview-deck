import { leetcodeQuestions } from './leetcodeData.js'

export const questions = [
  {
    id: 1,
    category: 'frontend',
    question: '什么是虚拟DOM？',
    answer: '虚拟DOM是对真实DOM的抽象表示，通过diff算法减少实际DOM操作。',
  },
  {
    id: 2,
    category: 'frontend',
    question: '解释事件委托的原理。',
    answer: '事件委托利用事件冒泡，只在父元素上绑定一次事件处理，从而管理子元素的事件。',
  },
  {
    id: 3,
    category: 'backend',
    question: '什么是RESTful API？',
    answer: 'RESTful API 遵循资源导向、使用HTTP动词及状态码来进行通信。',
  },
  {
    id: 4,
    category: 'backend',
    question: '如何理解事务的ACID特性？',
    answer: 'ACID代表原子性、一致性、隔离性和持久性，是数据库事务需满足的基本属性。',
  },
  {
    id: 5,
    category: 'system',
    question: '负载均衡的常见策略有哪些？',
    answer: '包括轮询、最少连接、源地址哈希等策略，用于分发请求到多台服务器。',
  },
  {
    id: 6,
    category: 'system',
    question: 'CDN 的作用是什么？',
    answer: 'CDN 通过在各地节点缓存内容，加速用户访问并减轻源站压力。',
  },
  {
    id: 7,
    category: 'algorithm',
    question: '快速排序的平均时间复杂度是多少？',
    answer: '平均时间复杂度为 O(n log n)。',
  },
  {
    id: 8,
    category: 'algorithm',
    question: '介绍一下动态规划的基本思想。',
    answer: '通过将问题分解为子问题，存储子问题结果，避免重复计算。',
  },
  {
    id: 9,
    category: 'frontend',
    question: 'CSS Flex 布局的主轴和交叉轴是什么？',
    answer: '主轴是 flex-direction 指定的方向，交叉轴与主轴垂直。',
  },
  {
    id: 10,
    category: 'backend',
    question: '什么是消息队列？',
    answer: '消息队列是一种异步通信模型，用于解耦和削峰填谷。',
  }
]

export const allQuestions = [...questions, ...leetcodeQuestions]
