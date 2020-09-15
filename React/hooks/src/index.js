import React, { useState, useEffect, useReducer }from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import './index.css';
import * as serviceWorker from './serviceWorker';

const dataFetchReducer = ( state, action) => {
  switch(action.type){
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_SUCCESS': 
    console.log('payload',action.payload)
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'FETCH_FAIL': 
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default: 
    throw new Error()
  }
}
const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [ state, dispatch ] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  })
  useEffect(() => {
    let didCancel = false
    dispatch({type: 'FETCH_INIT'})
    const fetchData = async(url) => {
      try {
        // if(!didCancel){
          const res = await axios(url)
          const hits = res.data.hits
          console.log('res', hits)
          dispatch({type: 'FETCH_SUCCESS', payload:{
            hits
          }})
        // }
        
      } catch (error) {
        // didCancel = false
        dispatch({type: 'FETCH_FAIL'})
      }
    }
    fetchData(url)
    return () => {
      didCancel = true
    }
  }, [url])

  const doFetch = (url) => {
    setUrl(url)
  }
  return {...state, doFetch}
}
function App() {
  const [query, setQuery] = useState('redux')
  const {data, isLoading, isError, doFetch} = useDataApi( "http://hn.algolia.com/api/v1/search?query=redux",{ hits: [] })
  console.log('data', data)
  return (
    <div className="App">
       <div>
            <input value={query} onChange={(e)=>{setQuery(e.target.value)}}></input>
            <button onClick={() => doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`)}>搜索</button>
            <ul>
              {data.hits.map((item, index)=><li key={index}>
                <a href={item.url}>{item.url}</a>
              </li>)}
            </ul>
        </div>
    </div>
  );
}

// let _state, _deps;
// function useState(intialState, ) {
//   _state = _state || intialState
//   function setState(newState){
//     console.log('newState', newState  )
//     _state = newState
//     render()
//   }

//   return [_state, setState]
// }
// // 1.没有依赖，每次都执行
// // 2.有依赖，执行一次
// // 3.当依赖变化重新执行
// function useEffect(callBack,depArray){
//   const hasDep = !depArray
//   const hasNoChange = _deps ? !depArray.every((el,i) => _deps[i]=== el) : true
//   if(hasDep || hasNoChange){
//     _deps = depArray;
//     callBack()
//   }
// }
// function App() {
//   const [count, setCount] = useState(0)
//   useEffect(()=>{
//     console.log('count', count)
//   }, [count])
//   return (
//     <div className="App">
//        <div>
//             <div>{count}</div>
//             <button
//                 onClick={() => {
//                     setCount(count + 1);
//                 }}
//             >
//                 点击
//       </button>
//         </div>
//     </div>
//   );
// }
ReactDOM.render(<App />, document.querySelector('#root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
