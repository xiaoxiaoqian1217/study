# study - 学习记录

最好的解决焦虑的方法就是不停的学习

------------
### 设计模式
 * 观察者模式

 在学习设计模式的时候，打算先从最熟悉的设计模式开始，好巧不巧，在工作中正好有个需求刚好涉及到发布-订阅模式，实际上还是和观察者模式有些区别，这区别我也是看掘金小册子了解到。

 需求中有个功能，就是拖拽或者放大缩小一个元素结束后需要通知发请求到后端，很菜🐔的我觉得貌似和发布-订阅可以扯上些关系，所以马不停蹄的用了起来，想起来刚毕业一年去头条面试的时候有被问到，真的啪啪打脸啊。

 先直接写一个 EventBus/ EventEmitter
 > 发布者和订阅者沟通的桥梁 
 代码参见 EventBus.js
 实际上这个文件并没有出现具体的订阅者和发布者，全程都由EventBus（`事件中心`）类创建的实例进行发布订阅

 接下来说一下观察者模式
 >产品经理拉了一个钉钉群
代码参见observer.html
+ 我们可以看到观察者模式和发布-订阅模式还是有一些区别的，观察者模式是，发布者和订阅之间直接就可以进行交流，多少还是有一些耦合。
+ 而发布订阅则是以事件中心作为沟通的桥梁，我们并没有看他们各自都做了什么，而是各自独立的模块，我们可以根据实际情况去选择






