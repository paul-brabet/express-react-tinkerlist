import React from 'react'
import { connect } from 'react-redux'
import { getMyRecentlyPlayed } from '../actions/actions'
import RecentTrack from './RecentTrack'

class RecentTracks extends React.Component {
  componentDidMount () {
    this.props.getMyRecentlyPlayed()
  }

  render () {
    // Recently played needs to be converted from array-like to an array in order for forEach to work
    const recentlyPlayed = Array.from(this.props.recentlyPlayed)
    const loadingStatus = this.props.loading.loading

    if (loadingStatus) {
      return (<h2>Loading...</h2>)
    }

    return (
      <div>
        <h2>Your recently played</h2>
        {recentlyPlayed.forEach(function(item) {
          return (
            <div key ='key'>
              <RecentTrack 
                artist={item.track.artist.name}
                title={item.track.title}
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