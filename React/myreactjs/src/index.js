import React, { Component }from './myReact/react';
import ReactDOM from './myReact/react-dom';

const Test = (props) => {
return <div>{props.name}</div>
}


class ClassComp extends Component {
  render() {
    return (
      <div className='classComp' style={{'color': 'pink'}}>
        ClassComp
      </div>
    )
  }
}
const users = [{ name: "tom", age: 20 }, { name: "jerry", age: 20 }];
const name  = 'text'
var element = <div>
  <h1  onClick={() => alert("click")} className='title'>my react</h1>
  <Test key='1' onClick={()=> alert('这是test组件')}  name={name} ></Test>
  <a href='aaa'></a>
  <ClassComp name='classComp'></ClassComp>
  <ul>
      {users.map(user => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
</div>
ReactDOM.render(element,
  document.getElementById('root')
);


