import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleNewSearch = this.handleNewSearch.bind(this);

    this.state = {
      searchResult: '',
      pastSearch: '',
      focus: null
    }
  }

  componentDidMount() {
    const input = document.getElementById(this.props.id)
    input.onfocus = () => {
      this.setState({ focus: true })
    }
    input.onblur = () => {
      this.setState({ focus: false })
    }
  }

  handleSelection(searchedObj) {
    const { name, address } = searchedObj
    const searchedResult = `${name} ${address}`
    this.props.onSearchSelection(searchedObj)

    this.setState({ searchResult: searchedResult });
    this.setState({ pastSearch: searchedResult })
  }

  handleNewSearch(event) {
    if(this.state.searchResult && this.state.pastSearch) {
      event.target.classList.add('active')
      this.setState({ searchResult: '' })
      this.setState({ [this.props.id]: '' })
    }
  }

  handleSearch(event) {
    const { target } = event;
    const { id, value } = target;

    this.setState({ searchResult: ''})
    this.setState({ pastSearch: '' })

    this.setState({
      [id]: value
    });
  }

  render() {
    const { id, searchData } = this.props;
    const { searchResult, pastSearch, focus } = this.state;
    const filterSearch = searchData.filter(data => {
      const dataString = Object.values(data).join(' ').toLowerCase();
      return dataString.includes(this.state[id])
    })
    return (
      <div className="searchContainer">
        <div className="searchContainerInner">
          <input
            type="text"
            id={id}
            className="searchBarFirst"
            placeholder={!pastSearch ? "Search" : null}
            onClick={this.handleNewSearch}
            onChange={this.handleSearch}
            value={!searchResult ? this.state[id] : searchResult} />
          <span><Icon icon="arrowRight" /></span>
        </div>
        {pastSearch && (
          <div className="pastSearch">
            {pastSearch}
          </div>
        )}
        {(this.state[id] && focus) && (
          <div className="searchResultsContainer">
            {filterSearch.map(term =>
              <div
                key={term.id}
                id="searchResult"
                className="results"
                onClick={() => this.handleSelection(term)}
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
  onSearchSelection: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  searchData: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default Search
