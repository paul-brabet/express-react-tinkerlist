import React from 'react'
import {connect} from 'react-redux'
import {getMyInfo, setTokens} from '../actions/actions'
import {Link} from 'react-router-dom'

class User extends React.Component {
  componentDidMount () {
    const params = this.props.match.params
    const {accessToken, refreshToken} = params
    this.props.setTokens(accessToken, refreshToken)
    this.props.getMyInfo()
  }

  render () {
    const {tokens, loading, user} = this.props
    const {accessToken, refreshToken} = tokens
    const loadingStatus = loading.loading
    const {images, id, email, href, country, product} = user
    const displayName = user.display_name
    const externalUrls = user.external_urls
    const imageUrl = images[0] ? images[0].url : ''

    if (loadingStatus) {
      return <h2>Loading...</h2>
    }
    return (
      <div>
        <h2>{`Logged in as  ${displayName}`}</h2>
        <img src={imageUrl} />
        <Link to="/recentTracks">See recent tracks</Link>
        <Link to="/allPlaylists">See all playlists</Link>
        <Link to="/everyPlaylistTrack">Make superlist</Link>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tokens: state.tokens,
    loading: state.loading,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setTokens: (accessToken, refreshToken) => {
      dispatch(setTokens({accessToken, refreshToken}))
    },
    getMyInfo: () => dispatch(getMyInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
