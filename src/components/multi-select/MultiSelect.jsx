import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '../search/Search';

class MultiSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }

    this.handleUpdatingSelected = this.handleUpdatingSelected.bind(this);
  }

  handleUpdatingSelected(data) {
    this.setState(prevState => ({selected: [...prevState.selected, data]}))
  }

  render() {
    const { placeholder, data, onSearchSelection } = this.props;
    return (
      <div>
        <Search
          onSearchSelection={onSearchSelection}
          onUpdatingSelected={this.handleUpdatingSelected}
          placeholder={placeholder}
          searchData={data}
          multiple />
      </div>
    )
  }
}

MultiSelect.propTypes = {
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSearchSelection: PropTypes.func.isRequired
}
MultiSelect.defaultProps = {
  placeholder: undefined
}

export default MultiSelect;
