import React, { Component } from 'react';

export default class SearchForm extends Component {
  handleChange = (event) => {
    this.props.handleQueryChange(event.target.value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.performSearch();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          Hae:
          <input type="search" value={ this.props.query }
          onChange={ this.handleChange } />
        </label>
        <input type="submit" value="Hae" />
      </form>
    )
  }
}
