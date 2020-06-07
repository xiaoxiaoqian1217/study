最好的解决焦虑的方法就是不停的学习

------------
**EventBus/ EventEmitter**
: 发布者和订阅者沟通的桥梁 


 实际上这个文件并没有出现具体的订阅者和发布者，全程都由EventBus事件中心类创建的实例进行发布订阅

代码参见 EventBus.js

接下来说一下观察者模式 
: 产品经理拉了一个钉钉群
>我们可以看到观察者模式和发布-订阅模式还是有一些区别的，观察者模式是，发布者和订阅之间直接就可以进行交流，多少还是有一些耦合。
> 而发布订阅则是以事件中心作为沟通的桥梁，我们并没有看他们各自都做了什么，而是各自独立的模块，我们可以根据实际情况去选择

代码参见observer.html
π
---


**代理模式**
- 事件代理
子元素绑定的事件委托给父元素

**虚拟代理**
- 图片预加载 --- 实践见真理
  预加载其实是为了避免网络不好，或者图片太大时图片留白用户体验不好

    
    ```
    // 创建一个预加载图片类
    class PreLoadImg{
      constructor(imgNode){
        this.imgNode =  imgNode
      }
      setSrc(targetSrc){
        this.imgNode.src = targetSrc
      }
    }
    ```
    ```
    // 创建一个代理图片类

    class ProxyImg {
    static LOADING_URL = './IMG_1823.JPG'
    constructor(imgNode){
      // 获取真实的img节点
      this.targetImg = imgNode
    }
    setSrc(src){
      this.targetImg.setSrc(ProxyImg.LOADING_URL)
      // 新建一个虚拟的dom ，在图片加载成功后设置真实图片地址
      const virtualImg = new Image()
      virtualImg.onload = () => {
            this.targetImg.src = src
            this.targetImg.setSrc(src)
      }
      virtualImg.src = src
    }
  }
    ```
    ```
    // demo.html 

    const  img = document.createElement('img')
  document.body.appendChild(img)
  const targetImg = new PreLoadImg(img)
  console.log('targetImg',targetImg)
  targetImg.setSrc('https://images.pexels.com/photos/1928151/pexels-photo-1928151.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')
  // 设置代理
  const proxyImg = new ProxyImg(targetImg)
  proxyImg.setSrc('https://images.pexels.com/photos/1928151/pexels-photo-1928151.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')

    ```
  [preLoadProxy.html](./preLoadProxy.html)
+ 缓存代理








