import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

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

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleNewSearch = this.handleNewSearch.bind(this);
    // this.onFocus = this.onFocus.bind(this);

    this.state = {
      // searchText: '',
      searchResult: '',
      // focus: false
    }
  }

  // onFocus() {
  //   this.setState(prevState => ({ focus: !prevState.focus }))
  // }

  handleSelection(event) {
    const { searchId } = this.state;
    this.setState({
      [event.target.id]: event.target.textContent
    });
    this.setState({ [searchId]: event.target.textContent })
  }

  handleNewSearch(event) {
    const { searchId } = this.state;
    if(this.state.searchResult && this.state[searchId]) {
      event.target.classList.add('active')
      this.setState({ [searchId]: '' })
    }
  }

  handleSearch(event) {
    const inputId = this.props.onSearch();
    const { target } = event;
    const { id } = target;
    const { value } = target;
    console.log(inputId);
    this.setState({ searchId: id });

    this.setState({ searchResult: ''})

    this.setState({
      [id]: value
    });
  }

  render() {
    const { id, searchData } = this.props;
    const { searchId, searchResult } = this.state;
    const filterSearch = searchData.filter(data => {
      const nameAndAddress = `${data.name} ${data.address}`.toLowerCase();
      return nameAndAddress.includes(this.state[id])
    })
    return (
      <div className="searchContainer">
        <div className="searchContainerInner">
          <input
            type="text"
            id={id}
            className="searchBarFirst"
            placeholder={!searchResult ? "Search" : null}
            onClick={this.handleNewSearch}
            onChange={this.handleSearch}
            value={this.state[id]} />
          <span><Icon icon="arrowRight" /></span>
        </div>
        {searchResult && (
          <div className="pastSearch">
            {searchResult}
          </div>
        )}
        {searchId && (
          <div className="searchResultsContainer">
            {filterSearch.map(term =>
              <div
                className="results"
                key={term.id}
                id="searchResult"
                onClick={this.handleSelection}
                role="presentation">
                {term.name} {term.address}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  searchData: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default Search
