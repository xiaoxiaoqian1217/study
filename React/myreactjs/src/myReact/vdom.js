// 创建虚拟DOM
function createVNode(vtype, type, props){
  return {vtype, type, props}
}

function initVNode(vnode){
  console.log('vnode', vnode) 
   const {vtype} = vnode
  if(!vtype) return document.createTextNode(vnode)

  if(vtype === 1){
    // 原生元素
    return createElement(vnode)
  }else if(vtype === 2){
    // 类组件
    return createClassComp(vnode)
  }else if(vtype ===3){
    // 函数组件
    return createFuncComp(vnode)
  }
}

function createElement(vnode){
  const  {type, props} = vnode;
  const node = document.createElement(type)
  const { key, children, ...rest} = props;
  //  处理属性
  Object.keys(rest).forEach(k=> {
    if(k==='className'){
      node.setAttribute('class', rest[k])
    }else if(k==='style' &&  typeof rest[k] === "object"){
      const style = Object.keys(rest[k]).map(s => `${s}:${rest[k][s]}`).join(';')
      node.setAttribute('style', style)
    }else if(k==='htmlFor'){
      node.setAttribute('for', rest[k])
    }else if(k.startsWith('on')){
      const event = k.toLowerCase()
      node[event] = rest[k]
    }else{
      node.setAttribute(k, rest[k])

    }
  })
  // 递归子元素
  children.forEach(c => {
    if(Array.isArray(c)){
      c.forEach(n=>
        node.appendChild(initVNode(n)))
    }else{
        node.appendChild(initVNode(c))
    }
  });
  return node
}

function createFuncComp(vnode){
  const  {type, props} = vnode;
  const vdom = type(props)
  return initVNode(vdom)



}

function createClassComp(vnode){
  const  {type, props} = vnode;
  const component = new type(props)
  const vdom = component.render()
  return initVNode(vdom)
}

export {
  createVNode,
  initVNode
}