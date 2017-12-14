import React from 'react'
import { connect } from 'react-redux'
import { getMyRecentlyPlayed } from '../actions/actions'
import RecentTrack from './RecentTrack'

class RecentTracks extends React.Component {
  componentDidMount () {
    this.props.getMyRecentlyPlayed()
  }

  render () {
    const recentlyPlayed = this.props.recentlyPlayed.items
    const loadingStatus = this.props.loading.loading

    if (loadingStatus) {
      return (<h2>Loading...</h2>)
    }

    return (
      <div>
        <h2>Your recently played</h2>
        {recentlyPlayed.map(function(item) {
          return (
            <div key={item.tracks.played_at}>
              <RecentTrack 
                title={item.tracks.track.name}
                album={item.album}
                artists={item.tracks.track.artists}
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
    recentlyPlayed: state.recentlyPlayed
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getMyRecentlyPlayed: () => dispatch(getMyRecentlyPlayed())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentTracks)