import React, { Component } from 'react';
// import PropTypes from 'prop-types';

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
      }
    ]

    this.handleChange = this.handleChange.bind(this);

    this.state = {}
  }

  handleChange(event) {
    const { target } = event;
    const { id } = target;
    const { value } = target;
    if(value) {
      this.setState({
        [id]: value
      });
    } else {
      this.setState({
        [id]: target.textContent
      });
    }

  }

  render() {
    const { testData } = this;
    // const { searchTerms } = this.props;
    const { searchText } = this.state;
    const filterSearch = testData.filter(data => {
      const nameAndAddress = `${data.name} ${data.address}`.toLowerCase();
      return nameAndAddress.includes(searchText)
    })
    return (
      <div className="searchContainer">
        <input type="text" className={!searchText ? "searchBarFirst active" : "searchBarFirst"} onChange={this.handleChange} id="searchText" />
        {searchText && (
          <div>
            <input type="text" className="searchBarSecond" onChange={this.handleChange} id="newSearchText" />
            {/* <div className="text">test</div> */}
            {filterSearch.map(term =>
              <div
                className="results"
                key={term.id}
                id="searchResult"
                onClick={this.handleChange}
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

// Search.propTypes = {
//   // searchTerms: PropTypes.shape({
//   //   test: PropTypes.string
//   // }).isRequired
// }


export default Search
