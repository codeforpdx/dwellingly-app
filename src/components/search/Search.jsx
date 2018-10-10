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
    this.handleSelectionClasses = this.handleSelectionClasses.bind(this);
    this.handleUpdatingOptions = this.handleUpdatingOptions.bind(this);
    // this.handleDeletingSelected = this.handleDeletingSelected.bind(this);

    this.state = {
      searchTerm: '',
      selectedOptions: [],
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
    this.setState({ searchTerm: '' });
    this.setState({ focus: false });
  }

  handleUpdatingOptions(data) {
    const newDataObj = {
      id: data.id,
      text: this.props.filterSubset.map(item => data[item]).join(' ')
    };

    if(!this.state.selectedOptions.find(({id}) => id === data.id)) {
      this.setState(prevState => ({
        selectedOptions: [...prevState.selectedOptions, newDataObj]}));
    } else {
      this.setState(prevState => ({
        selectedOptions: prevState.selectedOptions.filter(({id}) => id !== data.id)
      }));
    }
  }

  // handleDeletingSelected(data) {
  //   this.setState(prevState => ({selectedOptions: prevState.selectedOptions.filter(item => item !== data)}))
  // }

  handleSelection(searchedObj) {
    // New Tenant Form Callback
    this.props.onSearchSelection(searchedObj);
    if(this.props.multiple) {
      this.handleUpdatingOptions(searchedObj);
    } else {
      this.handleHideOptionsList();
    }
  }

  handleSelectionClasses(data) {
    if(this.props.multiple && this.state.selectedOptions.find(({id}) => id === data)) {
      return "searchResults--multiple-active"
    }
    if(this.props.multiple) {
      return "searchResults--multiple"
    }
    return "searchResults"
  }

  handleSearch(event) {
    const { target } = event;
    const { value } = target;

    this.setState({
      searchTerm: value
    });
  }

  render() {
    const { id, searchData, multiple, placeholder, filterSubset } = this.props;
    const { focus, searchTerm } = this.state;
    const filterSearch = searchData.filter(data => {
      const dataString = filterSubset.map(item => data[item]).join(' ').toLowerCase();
      return dataString.includes(searchTerm.toLowerCase())
    })
    return (
      <div className="searchContainer">
        <div className="searchContainerInner" ref={node => { this.node = node }}>
        {/* needs class "input inline-input" */}
          <div className="align--left">
            <div>
            <label htmlFor={id}>
              {/* <span className={label.length > 20 ? "inline-input__label sml-text" : "inline-input__label"}>{label}</span> */}
              <input
                type="text"
                id={id}
                className="searchBar"
                placeholder={placeholder}
                onFocus={this.handleFocus}
                onChange={this.handleSearch}
                value={searchTerm} />
            </label>
            {/* <span className="dropdownIcon"><Icon icon="arrowRight" /></span> */}
            </div>
          </div>
          {(searchTerm && focus) && (
            <div className="searchResultsContainer">
              {filterSearch.map(data =>
                <div className="align--left" key={data.id}>
                  <button
                    key={data.id}
                    type="button"
                    aria-label={`searchResult - ${data.name}`}
                    className={this.handleSelectionClasses(data.id)}
                    onClick={() => this.handleSelection(data)}>
                    {filterSubset.map(item => <span>{data[item]}&nbsp;</span>)}
                    {/* !multiple ?
                      <span>{data.name} {data.address}</span> :
                      <span>{data.firstName} {data.lastName}</span>
                    */}
                  </button>
                </div>
              )}
            </div>
          )}
          {multiple && (
            <div className="selectedOptions">
              {this.state.selectedOptions.map(option =>
                <div className="selectedPill" key={option.id}>
                  <span>{option.text}</span>
                  <span className="pillClose" onClick={() => this.handleSelection(option)} role="presentation">
                    <Icon icon="close" />
                  </span>
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
  filterSubset: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string,
  onSearchSelection: PropTypes.func.isRequired,
  searchData: PropTypes.arrayOf(PropTypes.object).isRequired,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string
}
Search.defaultProps = {
  id: undefined,
  multiple: undefined,
  placeholder: undefined
}

export default Search
