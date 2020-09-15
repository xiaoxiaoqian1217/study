// 上一版本的问题是每一个reduce初始化的时候传入的都是一个是所有的state 过于耦合了
// 若是一个模块初问题了，可能会相互影响，加强容错能力
// 1.实际上每一个reducer都应该只管理自己的state
// 2.当每一一个reducer都管理自己的state时，又如何合并state


const infoState = {
  info: {
    name: 'info',
    count:1
  }
}
const detailState = {
  detail: {
    name: 'detail',
    count:1
  }
}
const initState = {
  info: {
    name: 'info',
    count:1
  },
  detail: {
    name: 'detail',
    count:1
  }
}
//  reducer 是一个函数
var reducer = combinedReducer({
  info: infoReducer,
  detail: detailReducer
})
function combinedReducer(reducers){
  return function  combine(state, action){
    const nextState = {}
    const reducersKeys = Object.keys(reducers)
    console.log('reducerKeys', reducersKeys)
    // 单一的数据流
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
  // 执行每个reducer 为state
  if(!state){
    state = infoState
  }
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
  if(!state){
    state = detailState
  }
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
  // 
  dispatch({
    type: Symbol() 
  })
  function getState() {
    return state
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore(reducer,initState)
// 监听到数据改变然后获取数据
store.subscribe(()=>{
  const state = store.getState()
  console.log('state', state.info, state.detail, state)
})
// 改变数据
store.dispatch({
  type:'INFO_INCREMENT',
  count: 1
})

// 合并reducer



