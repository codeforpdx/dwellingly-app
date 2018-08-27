import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props)
    this.testData = [
      {
        name: 'Paul Flart',
        address: 'The Mall Security'
      },
      {
        name: 'Burt Macklin',
        address: 'Quanico FBI HQ'
      }
    ]

    this.handleChange = this.handleChange.bind(this);

    this.state = {}
  }

  handleChange(event) {
    const { target } = event;
    const { id } = target;
    const { value } = target;

    this.setState({
      [id]: value
    });
  }

  render() {
    const { testData } = this;
    // const { searchTerms } = this.props;
    const { searchText } = this.state;
    const filterSearch = testData.filter(data => data.name.includes(searchText))
    return (
      <div className="searchContainer">
        {!searchText && (
          <input type="text" className="searchBar" onChange={this.handleChange} id="searchText" />
        )}
        {searchText && (
          <div>
            <input type="text" className="searchBar" onChange={this.handleChange} id="newSearchText" />
            {/* <div className="text">test</div> */}
            {filterSearch.map(term =>
              <div className="results" id="searchResults" onClick={this.handleChange} role="presentation">{term.name}</div>
            )}
          </div>
        )}
      </div>
    )
  }
}

// Search.propTypes = {
//   searchTerms: PropTypes.shape({
//     test: PropTypes.string
//   }).isRequired
// }

export default Search
