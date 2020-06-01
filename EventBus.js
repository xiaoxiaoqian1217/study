class EventBus {
    constructor(){
      // 订阅的事件列表
      this.eventList = {}
    }
    // 添加监听的事件
    on(key, func){
      if(!this.eventList[key]){
        this.eventList[key] = []
      }
      // 回调函数推到事件队列里去，订阅同一个事件可能需要执行不同的回调的函数
      this.eventList[key].push(func)
    }
    //订阅事件后触发回调函数
    emit(key,...param){
      if(!this.eventList[key]) return
      this.eventList[key].forEach(func=>{
        func.apply(func, param)
      })
    }
    // 移除订阅模式并且删除指定的回调函数
    remove(key, callb){
      const funcs = this.eventList[key]
      funcs.forEach((func, idx)=>{
        if(func === callb){
          funcs.splice(idx, 1)
        }
      })
    }
    // 事件只可以订阅一次
    once(key,callb){
      // 包裹一下订阅事件，执行完就销毁
      const wrapper = (...arg) => {
        callb.apply(callb, arg)
        this.remove(key, wrapper)
      }
      this.on(key,wrapper)
    }
}
// 测试

const bus =  new EventBus()
bus.on('listen',(observer)=>{
  console.log(`${observer}发消息了`)
})
bus.emit('listen', 'observer')

bus.on('once', (...arg)=>{
  console.log(arg)
})
bus.once('once',(...arg)=>{
  console.log(arg)
  })
// bus.once('once',(...arg)=>{
//   console.log(arg)
//   })
bus.emit('once',1,2,3)
bus.emit('once', 2,3,4)