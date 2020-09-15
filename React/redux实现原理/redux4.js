// 新增计划，让它按照我们的计划去改，而不是随便修改
// 1.定计划
// 2.修改计划
// 原理其实就是发布订阅
const infoState = {
  name: 'info',
  count:1
}
const detailState = {
  name: 'detail',
  count:1
}
//  reducer 是一个函数
var reducer = combinedReducer({
  infoState: infoReducer,
  detailState: detailReducer
})
function combinedReducer(reducers){
  return function  combine(state, action){
    const reducersKeys = Object.keys(reducers)
    console.log('reducerKeys', reducersKeys)
    // 单一的数据流
    const nextState = {}
    // 单独执行每个reducer
    for(var i = 0; i< reducersKeys.length; i++){
      const key = reducersKeys[i]
      const reducer = reducers[key]
      const prevState = state[key]
      nextState[key] = reducer(prevState,action)
    }
    return nextState

  }
}
// reducer
/**
 * @param state 数据
 * @param action 指令
 */
function infoReducer(state, action){
  switch(action.type){
    case'INFO_INCREMENT':
    return {
      ...state,
      count: state.count + 1
    }
    default:
    return state
  }
}

function detailReducer(state, action){
  switch(action.type){
    case'DETAIL_INCREMENT':
    return {
      ...state,
      count: state.count + 1
    }
    default:
    return state
  }
}
function createStore(reducer,initState){
  const listerns = []
  let state = initState
  function subscribe(listern){
    listerns.push(listern)
  }
  function dispatch (action) {
    // 通过计划去修改state
    state = reducer(state,action)
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
    dispatch
  }
}

const store = createStore(reducer,{
  infoState: infoState,
  detailState: detailState
})
// 监听到数据改变然后获取数据
store.subscribe(()=>{
  const state = store.getState()
  console.log('state', state.infoState)
})
// 改变数据
store.dispatch({
  type:'INFO_INCREMENT',
  count: 1
})

// 合并reducer



