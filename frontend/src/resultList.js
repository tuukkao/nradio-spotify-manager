import React, {Component} from 'react'
import TrackName from './trackName'

export default class ResultList extends Component {
  addToQueue = (track) => {
    this.props.addToQueue(track)
  }

  render() {
    if (this.props.results.length === 0) {
      return (<p>Ei hakutuloksia.</p>)
    }

    const tracks = this.props.results.map(track => {
      return (
        <ResultListItem key={ track.id } track={ track } addToQueue={ this.addToQueue } />
      )
    });

    return (
      <div>
        <h2>Hakutulokset</h2>
        <ul>
          { tracks }
        </ul>
      </div>
    )
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
