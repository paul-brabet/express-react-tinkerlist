import React from 'react'
import {connect} from 'react-redux'

const Error = (props) => {
  if (props.message) {
    return (
      <div>
        <p>{props.message}</p>
      </div>
    )
  } else {
    return (
      <div />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.error.errorMessage
  }
}

export default connect(mapStateToProps)(Error)
