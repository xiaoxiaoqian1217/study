// 创建一个react的虚拟DOM，实际上是一个js对象
// 我们后续所做的任何的操作，都是操作这个js对象
// 尽可能少的操作真实的DOM
import { createVNode } from './vdom'
function createElement(type, props, ...children){
  props.children = children
  delete props.__source
  delete props.__self
  let vtype;
  if(typeof type === 'string'){
    vtype = 1
  }else if(typeof type ==='function'){
      if(type.isClassComponent){
        //  
        vtype = 2
      }else{
        vtype = 3
      }
  }
  return createVNode (vtype, type, props)
}
export class Component {
  // 区分是class组件还是function组件
  static isClassComponent = true;
  constructor(props){
    this.props = props
    this.state = {}

  }
  setState(){

  }
}
export default  {
  createElement
}