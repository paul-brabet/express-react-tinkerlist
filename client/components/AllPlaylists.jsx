import React from 'react'
import {connect} from 'react-redux'
import {getUserPlaylists} from '../actions/actions'
import Playlist from './Playlist'

class AllPlaylists extends React.Component {
  componentDidMount () {
    this.props.getUserPlaylists()
  }

  render () {
    const allPlaylists = this.props.allPlaylists.items
    const loadingStatus = this.props.loading.loading

    if(loadingStatus) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        <h2>Playlists (temporary page)</h2>
        {allPlaylists.map(function(item) {
          return (
            <div key={item.id}>
              <Playlist name={item.name} />
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
    allPlaylists: state.allPlaylists
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUserPlaylists: () => dispatch(getUserPlaylists())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPlaylists)