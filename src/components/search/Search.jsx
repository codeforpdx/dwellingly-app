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
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleShowOptionsList = this.handleShowOptionsList.bind(this);
    this.handleHideOptionsList = this.handleHideOptionsList.bind(this);

    this.state = {
      searchResult: '',
      pastSearch: '',
      focus: null
    }
  }


  handleBlur(event) {
    if(this.node && this.node.contains(event.target)) {
      console.log('BLUR', event.target);
      return
    }
    this.handleFocus();
  }

  handleFocus() {
    const { focus } = this.state;
    this.handleNewSearch();
    if(focus) {
      this.handleHideOptionsList();
    } else {
      this.handleShowOptionsList();
    }
  }

  handleShowOptionsList() {
    console.log('SHOW OPTIONS');
    document.addEventListener("click", this.handleBlur, false);
    this.setState({ focus: true });
  }

  handleHideOptionsList() {
    console.log('HIDE OPTIONS');
    document.removeEventListener("click", this.handleBlur, false);
    this.setState({ focus: false });
  }

  handleSelection(searchedObj) {
    const { name, address } = searchedObj
    const searchedResult = `${name} ${address}`
    this.props.onSearchSelection(searchedObj)
    this.setState({ searchResult: searchedResult });
    this.setState({ pastSearch: searchedResult })
    this.handleHideOptionsList();
  }

  handleNewSearch() {
    if(this.state.searchResult && this.state.pastSearch) {
      // event.target.classList.add('active')
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
        <div className="searchContainerInner" ref={node => { this.node = node }}>
          <input
            type="text"
            id={id}
            className="searchBar"
            placeholder={!pastSearch ? "Search" : pastSearch}
            onFocus={this.handleFocus}
            onChange={this.handleSearch}
            defaultValue={!searchResult ? this.state[id] : searchResult} />
          <span><Icon icon="arrowRight" /></span>
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
