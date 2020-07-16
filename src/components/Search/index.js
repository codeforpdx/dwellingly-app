import React, {useState} from 'react';
import './search.scss';

//Necessary for search to work: input data, where you want the data output, isFiltered (true/false) location

//Potential Error: I'm using shift() to remove the id of each property before filtering. depending on the data within each search, we may or may not want this.

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
              dataPoint.shift();
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
