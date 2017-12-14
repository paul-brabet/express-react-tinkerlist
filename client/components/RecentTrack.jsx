import React from 'react'
import RecentTrackArtists from './RecentTrackArtists'

function RecentTrack (props) {
  const artists = props.artists
  return (
    <div>
      <p>Title: {props.title}</p>
      <p>Artist:
        {artists.map(function(artist) {
          return (
            <span key={artist.id}>
              <RecentTrackArtists artist={artist} />
            </span>
          )
        })}
      </p>
    </div>
  )
}

export default RecentTrack