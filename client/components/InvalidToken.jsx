import React from 'react'
import {connect} from 'react-redux'

const Error = (props) => {
  return (
    <div>
      <p>There was a problem logging in</p>
    </div>
  )
}

export default connect(null)(Error)
