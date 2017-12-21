import React from 'react'
import { connect } from 'react-redux'
import { getEveryPlaylistTrack } from '../actions/actions'
import TrackNoImage from './TrackNoImage'

class EveryPlaylistTrack extends React.Component {
  componentDidMount() {
    const accessToken = this.props.tokens.accessToken    
    this.props.getEveryPlaylistTrack(accessToken)
  }

  render () {
    const everyPlaylistTrack = this.props.everyPlaylistTrack
    const loadingStatus = this.props.loading.loading
    const remainingPlaylists = this.props.remainingPlaylists.playlistsRemaining

    if(loadingStatus) {
      return (
        <div>
          <h2>Loading...</h2>
          <p>{remainingPlaylists ? remainingPlaylists : 'Lots of'} playlists left to process</p>
        </div>
      )
    }

    return (
      <div>
        <h2>Super playlist</h2>
        {everyPlaylistTrack.map(function(trackData) {
          return (
            <div key={trackData.track.id + trackData.added_at}>
              <TrackNoImage 
                title={trackData.track.name}
                album={trackData.track.album.name}
                artists={trackData.track.artists}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tokens: state.tokens,
    loading: state.loading,
    everyPlaylistTrack: state.everyPlaylistTrack.everyPlaylistTrack,
    remainingPlaylists: state.remainingPlaylists
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getEveryPlaylistTrack: (accessToken) => dispatch(getEveryPlaylistTrack(accessToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EveryPlaylistTrack)