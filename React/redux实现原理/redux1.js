const listerns = []
const state = {
  count: 1
}
// 订阅事件
function subscribe(listern){
  listerns.push(listern)
}
function changeState (count) {
  state.count = count
  for(var i = 0; i<listerns.length; i++){
    listerns[i]()
  }

}
// 订阅state.count 的输出事件 注册
subscribe(()=> {
  console.log(state.count)
})
// 若数据发生了改变
changeState(2) // 修改

