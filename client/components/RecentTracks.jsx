import React from 'react'
import { connect } from 'react-redux'
import { getMyRecentlyPlayed } from '../actions/actions'
import RecentTrack from './RecentTrack'

class RecentTracks extends React.Component {
  componentDidMount () {
    this.props.getMyRecentlyPlayed()
  }

  render () {
    const recentlyPlayed = this.props.recentlyPlayed
    const loadingStatus = this.props.loading.loading

    if (loadingStatus) {
      return (<h2>Loading...</h2>)
    }

    return (
      <div>
        <h2>Your recently played</h2>
        {recentlyPlayed.map(function(item) {
          return (
            <div key={item.played_at}>
              <RecentTrack 
                title={item.track.name}
                album={item.track.album}
                artists={item.track.artists}
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
    loading: state.loading,
    recentlyPlayed: state.recentlyPlayed.tracks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getMyRecentlyPlayed: () => dispatch(getMyRecentlyPlayed())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentTracks)