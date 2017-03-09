import React, {Component} from 'react'

export default class TrackName extends Component {
  render() {
    const artists = this.props.track.artists.map(artist => artist.name).join(', ')

    return (
      <span>
        { this.props.track.name } - { artists } ({ this.props.track.album.name })
      </span>
    )
  }
}

