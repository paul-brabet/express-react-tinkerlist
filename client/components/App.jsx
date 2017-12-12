import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import api from '../api'
import Login from './Login'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null
    }
  }

  render () {
    return (
      <div>
        <h1>Tinkerlist!</h1>
        <Login />
      </div>
    )
  }
}
