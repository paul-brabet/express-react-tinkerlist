import React from 'react'

function RecentTrack (props) {
  return (
    <div>
      <p>Title: {props.title}</p>      
      <p>Artist: {props.artist}</p>
    </div>
  )
}

export default RecentTrack