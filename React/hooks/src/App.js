import React, { useState, useEffect, useReducer }from 'react';
import axios from "axios";

const dataFetchReducer = ( state, action) => {
  switch(action.type){
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_SUCCESS': 
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
    dispatch({type: 'FETCH_INIT'})
    const fetchData = async(url) => {
      try {
        const res = await axios(url)
        console.log('res', res)

      } catch (error) {
        dispatch({type: 'FETCH_FAIL'})
      }
    }
    fetchData(url)
    return () => {
      
    }
  }, [url])

  const doFetch = () => {
    setUrl(url)
  }
  return {...state, doFetch}
}
function App() {
  const [query, setQuery] = useState('redux')
  const {data, isLoading, isError, doFetch} = useDataApi( "http://hn.algolia.com/api/v1/search?query=redux",{ hits: [] })
  return (
    <div className="App">
       <div>
            <input value={query} onChange={(e)=>{setQuery(e.target.value)}}></input>
            <button onClick={()=>doFetch(query)}>搜索</button>
            <ul>
              {data.hits.map((item, index)=><li key={index}>
                {item.name}
              </li>)}
            </ul>
        </div>
    </div>
  );
}

export default App;
