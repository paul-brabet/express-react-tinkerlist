import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import User from './User'
import Error from './Error'
import RecentTracks from './RecentTracks'
import AllPlaylists from './AllPlaylists'
import EveryPlaylistTrack from './EveryPlaylistTrack'
import CreateSuperlist from './CreateSuperlist'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Error />
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/recentTracks' component={RecentTracks} />
            <Route path='/allPlaylists' component={AllPlaylists} />
            <Route path='/everyPlaylistTrack' component={EveryPlaylistTrack} />
            <Route path='/createSuperlist' component={CreateSuperlist} />
            <Route path='/user/:accessToken/:refreshToken' component={User} />
            <Route path='/error/:errorMsg' component={Error} />
          </div>
        </Router>
      </div>
    )
  }
}
