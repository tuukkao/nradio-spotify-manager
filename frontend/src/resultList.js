import React, {Component} from 'react'
import TrackName from './trackName'

export default class ResultList extends Component {
  get hasResults () {
    return this.props.results.tracks && this.props.results.tracks.items.length !== 0
  }

  get results () {
    if (!this.hasResults) {
      return (<p>Ei hakutuloksia.</p>)
    }

    const tracks = this.props.results.tracks.items.map(track => {
      return (
        <ResultListItem key={ track.id } track={ track } addToQueue={ this.props.addToQueue } />
      )
    });

    return (
      <ul>
        { tracks }
      </ul>
    )
  }

  render() {
    if (this.props.results.tracks) {
      return (
        <div>
          <h2>Haku</h2>
          { this.results }
        </div>
      )
    }

    return null;
  }
}

class ResultListItem extends Component {
  handleAddToQueue = () => {
    this.props.addToQueue(this.props.track)
  }

  render() {
    return (
      <li>
        <a onClick={ this.handleAddToQueue }>
          <TrackName track={ this.props.track } />
        </a>
      </li>
    )
  }
}
