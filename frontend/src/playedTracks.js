import React, {Component} from 'react'
import TrackName from './trackName'

export default class PlayedTracks extends Component {
  render() {
    if (this.props.tracks.length === 0) {
      return (
        <div>
          <h2>Ei soitettuja kappaleita.</h2>
        </div>
      )
    }

    const tracks = this.props.tracks.map(track => {
      return (
        <li>
          <TrackName key={ track.id } track={ track } />
        </li>
      )
    })

    return (
      <div>
        <h2>Soitetut kappaleet ({ this.props.tracks.length })</h2>
        <ol>
          { tracks }
        </ol>
      </div>
    )
  }
}
