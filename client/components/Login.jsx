import React from 'react'

import {login} from '../api'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    login((err, res) => {
      if (err) {
        console.log(err.message)
      }
      console.log(res)
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.handleClick}>Login</button>
      </div>
    )
  }
}

export default Login
