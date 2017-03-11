import React, {Component} from 'react';

export default class RadioStats extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getIcecastData = () => {
    fetch(`${this.props.url}/status-json.xsl`)
    .then(response => {
      response.json().then(json => {
        this.setState({
          stats: json
        })

        if (!this.fetchInterval) {
          this.fetchInterval = setInterval(this.getIcecastData, 15000)
        }
      })
    })
    .catch(() => {
      if (this.fetchInterval) {
        clearInterval(this.fetchInterval)
      }
    })
  }

  get heading() {
    if (!this.state.stats) {
      return "Ei yhteydessä nettiradiopalvelimeen."
    }

    if (!this.state.stats.icestats.source) {
      return "Lähetys ei ole käynnissä."
    }

    if (this.state.stats.icestats.source && !this.state.stats.icestats.source.listeners) {
      return "Ei kuuntelijoita."
    }

    if (this.state.stats.icestats.source.listener_peak) {
      return `Kuuntelijoita ${this.state.stats.icestats.source.listeners}, huippu ${this.state.stats.icestats.source.listener_peak}`
    }

    return null;
  }

  componentDidMount() {
    this.getIcecastData()
  }

  render() {
    return (
      <h2>
        { this.heading }
      </h2>
    )
  }
}
