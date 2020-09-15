// 关于中间件  -- 其实就是扩展dispath 方法
// redux-promise redux-thunk  redux-logger


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

var next = store.dispatch

// logger-middleWare.js 
function loggerMiddleWare(action) {
  console.log('修改前',store.getState())
  next(action)
  console.log('修改后',store.getState())
}
// function loggerMiddleWare(action) {
  
//   next(action)
//   console.log('修改后',store.getState())
// }
// 改变数据
store.dispatch= (action) => {
  try {
    loggerMiddleWare(action)
  } catch (error) {
    console.log('error', error)
  }
}

store.dispatch({
  type:'INFO_INCREMENT',
  count: 1
})