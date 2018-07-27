import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

import './SearchForm.scss';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchTerm: ''
    };
  }

  handleSearch(event) {
    if (event) event.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <form action="" className="search" onSubmit={this.handleSearch}>
        <div className="search__wrapper width-wrapper">
          <Icon icon="search" />
          <input
            type="search"
            placeholder="Search"
            onChange={this.handleChange}
            value={this.state.searchTerm}
          />
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SearchForm;
