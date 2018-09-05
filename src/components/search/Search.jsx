import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleShowOptionsList = this.handleShowOptionsList.bind(this);
    this.handleHideOptionsList = this.handleHideOptionsList.bind(this);

    this.state = {
      searchTerm: '',
      pastSearch: '',
      focus: null
    }
  }


  handleBlur(event) {
    if(this.node && this.node.contains(event.target)) {
      return
    }
    this.handleFocus(event);
  }

  handleFocus(event) {
    const { focus } = this.state;
    if(focus && this.node && this.node.contains(event.target)) {
      return
    }
    if(focus) {
      this.handleHideOptionsList();
    } else {
      this.handleShowOptionsList();
    }
  }

  handleTab(event) {
    if(event.key !== 'Tab' || event.which !== 9) {
      return
     }
     this.handleBlur(event);
  }

  handleShowOptionsList() {
    document.addEventListener("click", this.handleBlur, false);
    document.addEventListener("keyup", this.handleTab, false);
    this.setState({ focus: true });
  }

  handleHideOptionsList() {
    document.removeEventListener("click", this.handleBlur, false);
    document.removeEventListener("keyup", this.handleTab, false);
    this.setState({ focus: false });
  }

  handleSelection(searchedObj) {
    const { name, address } = searchedObj
    const searchedResult = `${name} ${address}`
    this.props.onSearchSelection(searchedObj)
    this.setState({ searchTerm: '' });
    this.setState({ pastSearch: searchedResult })
    this.handleHideOptionsList();
  }

  handleSearch(event) {
    const { target } = event;
    const { value } = target;

    this.setState({
      searchTerm: value
    });
  }

  render() {
    const { id, searchData, label } = this.props;
    const { pastSearch, focus, searchTerm } = this.state;
    const filterSearch = searchData.filter(data => {
      const dataString = Object.values(data).join(' ').toLowerCase();
      return dataString.includes(searchTerm.toLowerCase())
    })
    return (
      <div className="searchContainer">
        <div className="searchContainerInner" ref={node => { this.node = node }}>
          <div className="input inline-input">
            <div className="inline-input__text">
            <label htmlFor={id}>
              <span className={label.length > 20 ? "inline-input__label sml-text" : "inline-input__label"}>{label}</span>
              <input
                type="text"
                id={id}
                className="searchBar"
                placeholder={!pastSearch ? "Search" : pastSearch}
                onFocus={this.handleFocus}
                onChange={this.handleSearch}
                value={searchTerm} />
            </label>
            <span className="dropdownIcon"><Icon icon="arrowRight" /></span>
            </div>
          </div>
          {(searchTerm && focus) && (
            <div className="searchResultsContainer">
              {filterSearch.map(data =>
                <button
                  key={data.id}
                  id="searchResult"
                  type="button"
                  aria-label={`searchResult - ${data.name}`}
                  className="results"
                  onClick={() => this.handleSelection(data)}>
                  {data.name} {data.address}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSearchSelection: PropTypes.func.isRequired,
  searchData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Search
