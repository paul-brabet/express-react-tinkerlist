import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import api from '../api'
import Home from './Home'
import Login from './Login'
import User from './User'
import Error from './Error'

export default class App extends React.Component {

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/user/:accessToken/:refreshToken' component={User} />
          <Route path='/error/:errorMsg' component={Error} />
        </div>
      </Router>
    )
  }
}
