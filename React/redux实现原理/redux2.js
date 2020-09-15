// 原理其实就是发布订阅
function createStore(initState){
  const listerns = []
  const state = initState
  function subscribe(listern){
    listerns.push(listern)
  }
  function changeState (count) {
    state.count = count
    for(var i = 0; i<listerns.length; i++){
      listerns[i]()
    }
  }
  function getState() {
    return state
  }

  return {
    getState,
    subscribe,
    changeState
  }
}
const initState = {
  name: 'xxq',
  count:1
}
const store = createStore(initState)
// 监听到数据改变然后获取数据
store.subscribe(()=>{
  const state = store.getState()
  console.log('state', state.count)
})
// 改变数据
store.changeState({
  name: 'weimiao',
  count:2
})

// 这个版本存在一个问题，就是数据可以瞎改
// 比方说执行 
// store.changeState({
//   b: '111',
// })