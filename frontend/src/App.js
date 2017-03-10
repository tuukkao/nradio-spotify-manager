import React, { Component } from 'react'
import PlaybackQueue from './playbackQueue'
import PlayedTracks from './playedTracks'
import ResultList from './resultList'
import SearchForm from './searchForm'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: {},
      queue: [],
      playedTracks: []
    }
  }

  handleQueryChange = (query) => {
    this.setState({ query: query })
  }

  performSearch = async () => {
    this.setState({ results: {} })
    const response = await fetch(`https://api.spotify.com/v1/search?q=${this.state.query}&type=track&market=fi`);
    const json = await response.json()

    if (json.tracks) {
      this.setState({ results: json});
    } else {
      alert("Haussa tapahtui virhe.");
    }
  }

  addToQueue = (track) => {
    this.setState(prevState => {
      return {
        queue: prevState.queue.concat(track)
      }
    })
    this.refs.playbackQueue.setFocusToHeading()
  }

  deleteFromQueue = (track) => {
    this.setState(prevState => {
      return {
        queue: prevState.queue.filter(queueTrack => queueTrack.id !== track.id)
      }
    })
  }

  addToPlayedTracks = (track) => {
    this.setState(prevState => {
      return {
        playedTracks: prevState.playedTracks.concat(track)
      }
    })
  }

  render() {
    return (
      <div>
        <SearchForm query={ this.state.query}
        handleQueryChange={ this.handleQueryChange }
        performSearch={ this.performSearch } />
        <ResultList results={ this.state.results }
                    addToQueue={ this.addToQueue }  />
        <PlaybackQueue queue={ this.state.queue }
                       deleteTrack={ this.deleteFromQueue }
                       addToPlayedTracks={ this.addToPlayedTracks }
                       ref="playbackQueue" />
        <PlayedTracks tracks={ this.state.playedTracks } />
      </div>
    );
  }
}
