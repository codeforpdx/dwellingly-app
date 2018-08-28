import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props)
    this.testData = [
      {
        id: 0,
        name: 'Paul Flart',
        address: 'The Mall Security'
      },
      {
        id: 1,
        name: 'Burt Macklin',
        address: 'Quanico FBI HQ'
      },
      {
        id: 2,
        name: 'Janet Snakehole',
        address: 'The Snakehole Lounge'
      },
      {
        id: 3,
        name: 'Kurt Hackmin',
        address: 'Burts Brothers House'
      }
    ]

    this.handleChange = this.handleChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleNewSearch = this.handleNewSearch.bind(this);

    this.state = {
      searchText: '',
      searchResult: ''
    }
  }

  handleSelection(event) {
    this.setState({
      [event.target.id]: event.target.textContent
    });
    this.setState({ searchText: event.target.textContent })
  }

  handleNewSearch(event) {
    if(this.state.searchResult && this.state.searchText) {
      event.target.classList.add('active')
      this.setState({ searchText: '' })
    }
  }

  // handleUnfocus(event) {
  //   if(!event.target.activeElement) {
  //     event.target.classList.add('inactive')
  //     this.setState({ searchResult: '' })
  //   }
  // }

  handleChange(event) {
    const { target } = event;
    const { id } = target;
    const { value } = target;

    this.setState({ searchResult: ''})

    this.setState({
      [id]: value
    });
  }

  render() {
    const { testData } = this;
    const { placeholder } = this.props;
    const { searchText, searchResult } = this.state;
    const filterSearch = testData.filter(data => {
      const nameAndAddress = `${data.name} ${data.address}`.toLowerCase();
      return nameAndAddress.includes(searchText)
    })
    return (
      <div className="searchContainer">
        <input
          type="text"
          id="searchText"
          className="searchBarFirst"
          placeholder={placeholder}
          onClick={this.handleNewSearch}
          onChange={this.handleChange}

          value={searchText} />
        {searchResult && (
          <div className="pastSearch">
            {searchResult}
          </div>
        )}
        {searchText && (
          <div className="searchResultsContainer">
            {filterSearch.map(term =>
              <div
                className="results"
                key={term.id}
                id="searchResult"
                onClick={this.handleSelection}
                role="presentation">
                {term.name}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

Search.propTypes = {
  placeholder: PropTypes.string
}

Search.defaultProps = {
  placeholder: undefined
}

export default Search
