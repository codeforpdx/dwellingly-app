import React, {useState} from 'react';
import './search.scss';

//Necessary for search to work: input data, where you want the data output, isFiltered (true/false) location

//Potential Error: I'm using shift() to remove the id of each property before filtering. depending on the data within each search, we may or may not want this.

function Search(props) {
    const { input, outputLocation, isFilteredLocation } = props;

    const enterSearchHandler = (event) => {
      var keyCode = event.keyCode;
      if (keyCode === 13){
        this.searchProperties();
      }
    };

    const clearSearch = () => {
      this.setState({isFiltered: false});
      document.getElementById("searchQuery").value = "";
    };

    const searchProperties = () => {
      let allProperties = this.state.properties;
      let output = [];
      let searchQuery = document.getElementById("searchQuery").value.toLowerCase().trim();

       if(searchQuery.length > 0){
          for (var i=0;i < allProperties.length; i++) {
              let property = Object.values(allProperties[i]);
              property.shift();
              if (property.toString().toLowerCase().includes(searchQuery)){
                  output.push(allProperties[i]);
            }
          };

      this.setState({
            filteredProperties: output,
            isFiltered: true
          });
      }
  };


    return (
      <div className="search-section">
        <input className="input search is-rounded" id="searchQuery" onKeyDown={enterSearchHandler} placeholder="Search properties by name, address, or property manager"></input>
          <button className="save_button button is-rounded" onClick={this.searchProperties}type="submit">
             Search
          </button>
          <button className="save_button button is-rounded clearButton" onClick={this.clearSearch}type="submit">
             Clear Search
          </button>
      </div>
    );
};

export default Search;
