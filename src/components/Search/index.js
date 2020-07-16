import React, {useState} from 'react';
import './search.scss';

//Necessary for <Search> to work:

//Data (See src/views/properties.js):

//1. Input data (passed as input prop).

//2. Where you want the data output (passed as outputLocation prop).

//3. isFiltered (true/false) location (passed as isFilteredLocation prop).

//Functions: Need to write two functions in whatever parent component you import <Search> into.

//1. Function to set 'isFiltered' state (T/F) in the parent component. Pass this function to <Search> via setIsFilteredStateFalse props. (See src/views/properties.js)

//2. Function to set 'filteredResults' state within the parent component, and also 'isFiltered' state back to true. (See src/views/properties.js)

//Search is designed to not include the ID as a searchable paramater.

function Search(props) {
    const { input, outputLocation, isFilteredLocation, setOutputState, setIsFilteredStateFalse } = props;

    const enterSearchHandler = (event) => {
      var keyCode = event.keyCode;
      if (keyCode === 13){
        this.searchProperties();
      }
    };

    const clearSearch = () => {
      props.setIsFilteredStateFalse();
      document.getElementById("searchQueryComponent").value = "";

    };

    const searchProperties = () => {
      let allData = input;
      let output = [];
      let searchQuery = document.getElementById("searchQueryComponent").value.toLowerCase().trim();

       if(searchQuery.length > 0){
          for (var i=0;i < allData.length; i++) {
              let dataPoint = Object.values(allData[i]);
              delete dataPoint.id;
              if (dataPoint.toString().toLowerCase().includes(searchQuery)){
                  output.push(allData[i]);
            }
          };
      props.setOutputState(output, true)
      }
  };


    return (
      <div className="search-section">
        <input className="input search is-rounded" id="searchQueryComponent" onKeyDown={enterSearchHandler} placeholder="Search properties by name, address, or property manager"></input>
          <button className="save_button button is-rounded" onClick={searchProperties}type="submit">
             Search
          </button>
          <button className="save_button button is-rounded clearButton" onClick={clearSearch}type="submit">
             Clear Search
          </button>
      </div>
    );
};

export default Search;
