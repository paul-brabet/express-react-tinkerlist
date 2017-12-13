import React from 'react'

// import {login} from '../api'

class Login extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  //   this.handleClick = this.handleClick.bind(this)
  // }

  // handleClick (e) {
  //   e.preventDefault()
  //   login((err, res) => {
  //     if (err) {
  //       console.log(err.message)
  //     }
  //     console.log(res)
  //   })
  // }

  // Uses an <a> tag to interact with the server, because if handleClick() is used
  // Spotify thinks the client_secret is coming from the browser, and nopes out of
  // sending the server information.
  render () {
    return (
      <div>
        <a href='/api/v1/login'>Login</a>
      </div>
    )
  }
}

export default Login

// <a href='/api/v1/login'>Login</a>
// <button onClick={this.handleClick}>Login</button>
