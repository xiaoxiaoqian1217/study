JSX 
* 表示HTML元素的一种语法
* 用来构建虚拟DOM - 虚拟DOM其实就是js对象
* 经过babel编译以后，就可以转换成React可以执行的代码。React.createElement()
React 中的事件系统

React 中的diff算法
#### diff的三种策略
* DOM 节点的跨层级比较少  tree-diff
* 相同类的结构会sheng    component-diff
* element diff

###### tree-diff
react 两棵树只会对同一层级的DOM节点进行比较，对于不同的层级，只有创建和删除的操作，不会有位置的变换。 ---保持稳定的DOM结构
#####  component-diff
* 若是同一类型的组件，则比较虚拟DOM
* 若是不同类型的组件， 则直接替换这个组件下的所有子节点
* 对于同一类型的组件，虚拟dom可能没有什么变化，若是我们明确知道这个组件没有变化，我们就可以通过shouldComponentUpdate来判断组件是否需要进行diff算法
###### element-diff
* 插入
* 移动 满足元素在旧集合中的位置 < lastIndex (当前访问当新集合的索引)
* 删除 

redux
Redux 的核心api createStore 
* getState() 
* dispatch (action)

react-redux 
* <Provider>
* connect()

react-thunk 
> 让action支持异步流
React Router
* 路由的基本原理 -保证view和URL同步

输入url的过程
* DNS解析
* TCP连接
* HTTP请求
* HTTP响应
* 渲染
网络层面 渲染层面

webpack 按需加载


