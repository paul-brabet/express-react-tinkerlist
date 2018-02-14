import React from 'react'
import {connect} from 'react-redux'
import {createAndFillSuperlist} from '../actions/actions'

class User extends React.Component {
  componentDidMount () {
    const accessToken = this.props.tokens.accessToken
    this.props.createAndFillSuperlist(accessToken, this.props.userId, this.props.everyPlaylistTrack)
  }

  // &apos; inside the p tag represents a '
  render () {
    const loadingStatus = this.props.loading.loading

    if (loadingStatus) {
      return (
        <div>
          <h2>Creating new playlist...</h2>
        </div>
      )
    }

    return (
      <div>
        <p>You have a new playlist called &apos;Superlist&apos;! It contains all your playlists&apos; tracks.</p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tokens: state.tokens,
    loading: state.loading,
    userId: state.user.id,
    everyPlaylistTrack: state.everyPlaylistTrack.everyPlaylistTrack
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createAndFillSuperlist: (accessToken, userId, tracks) => dispatch(createAndFillSuperlist(accessToken, userId, tracks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
