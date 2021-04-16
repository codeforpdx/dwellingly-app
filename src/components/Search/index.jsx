import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search.scss";

//Necessary for <Search> to work:

//Data (See src/views/properties.js) (all should be state variables):

//1. Input data (passed as input prop).

//2. Where you want the data output (passed as outputLocation prop).

//3. isFiltered (true/false) location (passed as isFilteredLocation prop).

//4. The message you want displayed as a placeholder.

//Functions: Need to write two functions in whatever parent component you import <Search> into.

//1. Function to set 'isFiltered' state (T/F) in the parent component. Pass this function to <Search> via setIsFilteredStateFalse props. (See src/views/properties.js - setIsFilteredPropertiesFalse for example)

//2. Function to set 'filteredResults' state within the parent component, and also 'isFiltered' state back to true. (See src/views/properties.js - setOutputState for example)

//Search is designed to not include the ID as a searchable paramater.

function Search(props) {
  const { input, placeholderMessage } = props;
  let timerId;
  const throttleFunction = (func, delay) => {
    if (timerId) {
      return;
    }
    timerId = setTimeout(() => {
      func();
      timerId = undefined;
    }, delay);
  };

  const onChangeHandler = () => {
    throttleFunction(searchInput, 800);
  };

  const clearSearch = () => {
    props.setIsFilteredStateFalse();
    document.getElementById("searchQueryComponent").value = "";
  };

  const searchInput = () => {
    let allData = input;
    let output = [];
    let searchQuery = document
      .getElementById("searchQueryComponent")
      .value.toLowerCase()
      .trim();

    if (searchQuery.length > 0) {
      for (var i = 0; i < allData.length; i++) {
        let dataPoint = Object.assign({}, allData[i]);
        delete dataPoint.id;
        if (
          Object.values(dataPoint)
            .toString()
            .toLowerCase()
            .includes(searchQuery)
        ) {
          output.push(allData[i]);
        }
      }
      props.setOutputState(output, true);
    } else if (props.filteredTickets) {
      props.setFilteredTickets([]);
      props.setIsFilteredStateFalse();
    } else {
      props.setIsFilteredStateFalse();
    }
  };

  return (
    <div className="search-section">
      <span className="search-icon_span">
        <FontAwesomeIcon icon={faSearch} className="search-icon_svg" />
      </span>
      <input
        className="input search is-rounded"
        id="searchQueryComponent"
        type="search"
        onChange={onChangeHandler}
        placeholder={placeholderMessage}
      ></input>
    </div>
  );
}

export default Search;
