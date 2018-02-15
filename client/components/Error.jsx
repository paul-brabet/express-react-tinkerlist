import React from 'react'
import {connect} from 'react-redux'

const Error = (props) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.error
  }
}

export default connect(mapStateToProps)(Error)
