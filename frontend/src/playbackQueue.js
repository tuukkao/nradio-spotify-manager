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

  get headingText () {
    if (this.props.queue.length === 0) {
      return "Soittojono on toistaiseksi tyhjä."
    }

    return `Jono (${ this.props.queue.length })`
  }

  get queue () {
    if (this.props.queue.length === 0) {
      return null;
    }

    const tracks = this.props.queue.map(track => {
      return (
        <PlaybackQueueItem key={ track.id }
                           track={ track }
                           deleteTrack={ this.props.deleteTrack }
                           playTrack={ this.playTrack } />
      )
    })

    return (
      <div>
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

  setFocusToHeading = () => {
    this.focusHeadingOnNextUpdate = true
  }

  componentDidUpdate(prevProps) {
    if (this.props.queue !== prevProps.queue && this.focusHeadingOnNextUpdate) {
      this.heading.focus()
      this.focusHeadingOnNextUpdate = false
    }
  }

  render() {
    return (
      <div>
        <h2 tabIndex="-1" ref={ (heading) => this.heading = heading }>
          { this.headingText }
        </h2>
        { this.queue }
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
