// 遍历creatElement生成的js对象，生成相应的DOM
// 虚拟Dom转化成真实的DOM
import {initVNode} from './vdom'
function render(vDom, container) {
  console.log(vDom)
  const node = initVNode(vDom)
  container.appendChild(node)
  // container.innerHTML= `<pre>${JSON.stringify(vDom,null, 2)}</pre>`
}
export default {
  render
}
