## Event Loop 事件循环
Event Loop 是在HTML Standard 中定义的：
为了协调事件，用户交互，脚本，渲染， 网络等，用户代理必须使用事件循环。
MarcoTask （宏任务）
一个Event Loop可以有一个或者多个task（macroTask）队列，它是一个先进先出的队列,由指定的任务源去提供任务。
有哪些操作可以称为任务源（宏任务）呢：
1. Dom操作任务
一些Dom操作，比方插入一个文本等
2. 用户交互任务源
对用户的交互作出反应，比方键盘键入和鼠标操作，响应用户的操作事件（click）必须使用task队列。
3. 网络任务源
网络任务源被用来响应用户操作
4. history traversal 任务源
history.back() 等一些路由操作
MarcoTask任务源十分广泛，基本ajax的onload，鼠标click事件，以及数据库操作（IndexDB），还有setTimeOut等。 基本宏任务可以分为以下几类。
• setTimeOut ， setTimeInterval , setImmediate
• I/O
• UI rendering
MicroTask (微任务)
一个 Event Loop 只有一个MicroTask队列，同样也是先进先出的原则
Note ：  每执行完一个宏任务，就会当前任务中查找MicroTask队列中查没有任务，有的话先执行再去执行下一个宏任务。微任务会在当轮任务中清空。
若是task队列中有大量等待的任务，把DOM操作放入MicroTask中执行能更快把修改呈现给用户。
事件循环的大致循环过程大致如下：
• 现在任务执行到 currently running task，我们对批量的dom进行异步修改，我们将此任务插进task:
• 此任务插进microtasks
参考： https://github.com/aooy/blog/issues/5 涨了知识，这篇关于事件循环写的太好了。