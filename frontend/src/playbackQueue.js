import React, {Component} from 'react'
import TrackName from './trackName'

export default class PlaybackQueue extends Component {
  get nextTrack() {
    return this.props.queue[0]
  }

  playTrack = (track) => {
    return fetch(`/play/${track.uri}`)
    .then(() => this.props.deleteTrack(track))
    .then(() => this.props.addToPlayedTracks(track))
  }

  handlePlayNext = () => {
    this.playTrack(this.nextTrack)
  }

  get nextTrackInfo () {
    return (
      <span>
        Seuraavaksi: 
        <TrackName track={ this.nextTrack } />
      </span>
    )
  }

  render() {
    const tracks = this.props.queue.map(track => {
      return (
        <PlaybackQueueItem key={ track.id }
                           track={ track }
                           deleteTrack={ this.deleteTrack }
                           playTrack={ this.playTrack } />
      )
    })

    if (this.props.queue.length === 0) {
      return (
        <div>
          <h2>Soittojono on toistaiseksi tyhjä.</h2>
        </div>
      )
    }

    return (
      <div>
        <h2>Jono</h2>
        <button onClick={ this.handlePlayNext}>
          Toista seuraava
        </button>
        <h3>{ this.nextTrackInfo }</h3>
        <ol>
          { tracks }
        </ol>
      </div>
    )
  }
}

class PlaybackQueueItem extends Component {
  handleDeleteTrack = () => {
    this.props.deleteTrack(this.props.track)
  }

  handlePlayTrack = () => {
    this.props.playTrack(this.props.track)
  }

  render() {
    return (
      <li>
        <a onClick={ this.handlePlayTrack }>
          <TrackName track={ this.props.track } />
        </a> - 
        <button onClick={ this.handleDeleteTrack }>Poista</button>
      </li>
    )
  }
}
