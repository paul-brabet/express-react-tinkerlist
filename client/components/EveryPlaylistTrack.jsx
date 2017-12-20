import React from 'react'
import { connect } from 'react-redux'
import { getEveryPlaylistTrack } from '../actions/actions'

class EveryPlaylistTrack extends React.Component {
  componentDidMount() {
    const accessToken = this.props.tokens.accessToken    
    this.props.getEveryPlaylistTrack(accessToken)
  }

  render () {
    const everyPlaylistTrack = this.props.everyPlaylistTrack
    const loadingStatus = this.props.loading.loading

    if(loadingStatus) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        <h2>Super playlist</h2>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tokens: state.tokens,
    loading: state.loading,
    everyPlaylistTrack: state.everyPlaylistTrack
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getEveryPlaylistTrack: (accessToken) => dispatch(getEveryPlaylistTrack(accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EveryPlaylistTrack)