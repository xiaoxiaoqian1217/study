// 新增计划，让它按照我们的计划去改，而不是随便修改
// 1.定计划
// 2.修改计划
// 原理其实就是发布订阅
function createStore(plan,initState){
  const listerns = []
  let state = initState
  function subscribe(listern){
    listerns.push(listern)
  }
  function changeState (action) {
    // 通过计划去修改state
    state = plan(state,action)
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
const store = createStore(plan,initState)
// 监听到数据改变然后获取数据
store.subscribe(()=>{
  const state = store.getState()
  console.log('state', state.count)
})
// 改变数据
store.changeState({
  type:'INCREMENT',
  count: 1
})
// reducer
/**
 * @param state 数据
 * @param action 指令
 */
function plan(state, action){
  switch(action.type){
    case'INCREMENT':
    return {
      ...state,
      count: state.count + 1
    }
    default:
    return state
  }
}