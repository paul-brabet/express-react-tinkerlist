import React from 'react'
import RecentTrackArtists from './RecentTrackArtists'

function RecentTrack (props) {
  const artists = props.artists
  if (artists.length > 1) {
    for (let i = 0; i < artists.length -1; i++) {
      artists[i].name = artists[i].name + ','
    }
  }
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

// <p>Album: {props.album.title}</p>

// <img src = {props.album.images[1].url} />