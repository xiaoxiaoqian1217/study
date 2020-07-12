import React, { Component } from 'react'
import './App.css';
import VirtualList from './virtuallist'
import PropTypes from 'prop-types'

export default class App extends Component {
  static propTypes = {

  }
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  

  render() {
    return (
      <div className='app'>
        <VirtualList></VirtualList>
      </div>
    )
  }
}