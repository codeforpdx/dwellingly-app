import React, { useState } from 'react';
import "./SearchableDropDown.scss";

export default function SearchableDropDown({ value, onChange, array }) {

  const [displayArray, setDisplayArray] = useState([])
  const [searchText, setSearchText] = useState("")

  const filteringFunction = (text) => {
    if (text === "") {
      setDisplayArray(array);
      setSearchText("")
    } else {
      const filteredArray = array.filter(item => item.value.toLowerCase().includes(text.toLowerCase()))
      setDisplayArray(filteredArray)
      setSearchText(text)
    }
  }

  const handleClick = (item) => {
    setSearchText(item.value)
    setDisplayArray([])
    onChange(item.key);
  }

  return (
    <div>
      <input
        id={value}
        value={searchText}
        placeholder={(typeof value === 'string') ? value : "Search..."}
        onChange={({ target }) => filteringFunction(target.value)}
        onClick={() => filteringFunction("")}
        className="dropdown-input"
      />
      {displayArray !== [] ?
        <ul className={`dropdown-ul ${displayArray.length === 0 ? "empty" : ""}`}>
          {
            displayArray.map(item => (
              <li>
                <button
                  className="dropdown-button"
                  onClick={() => handleClick(item)}
                >
                  {item.value}
                </button>
              </li>
            ))
          }
        </ul>
        : null}
    </div>
  )
}
