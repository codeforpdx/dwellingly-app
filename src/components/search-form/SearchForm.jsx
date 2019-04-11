import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

import './SearchForm.scss';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.focusSearchBox = this.focusSearchBox.bind(this);
    this.blurSearchBox = this.blurSearchBox.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchTerm: ''
    };
  }

  componentDidMount() {
    const searchBox = document.querySelector('.search .search__wrapper');
    if (searchBox) {
      searchBox.addEventListener('click', this.focusSearchBox, false);
    }
  }

  focusSearchBox() {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }

  blurSearchBox() {
    if (this.searchInput) {
      if (this.searchInput.value.length > 0) {
        this.searchInput.classList.add('active');
      } else {
        this.searchInput.classList.remove('active');
      }
    }
  }

  handleSearch(e) {
    if (e) e.preventDefault();
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
            onBlur={this.blurSearchBox}
            value={this.state.searchTerm}
            ref={el => {
              this.searchInput = el;
            }}
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
