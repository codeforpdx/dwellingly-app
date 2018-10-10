import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '../search/Search';
import Icon from '../icon/Icon';

import './MultiSelect.scss'

class MultiSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }

    this.handleUpdatingSelected = this.handleUpdatingSelected.bind(this);
    this.handleDeletingSelected = this.handleDeletingSelected.bind(this);
  }

  handleUpdatingSelected(data) {
    if(!this.state.selected.includes(data)) {
      this.setState(prevState => ({selected: [...prevState.selected, data]}))
    } else {
      this.setState(prevState => ({selected: prevState.selected.filter((item) => item !== data)}))
    }
  }

  handleDeletingSelected() {
    this.state.selected.map((item) => this.state.selected.splice(item, 1));
    this.setState(prevState => ({selected: [...prevState.selected]}));
  }

  render() {
    const { placeholder, data, onSearchSelection, filterSubset } = this.props;
    return (
      <div>
        <Search
          multiSelectData={this.state.selected}
          onSearchSelection={onSearchSelection}
          onUpdatingSelected={this.handleUpdatingSelected}
          onTogglingOption={this.handleDeletingSelected}
          filterSubset={filterSubset}
          placeholder={placeholder}
          searchData={data}
          multiple />
          <div className="selectedOptions">
            {this.state.selected.map(({firstName, lastName, id}) =>
              <div className="selectedPill" key={id}>
                <span>{firstName} {lastName}</span>
                <span className="pillClose" onClick={this.handleDeletingSelected} role="presentation">
                  <Icon icon="close" />
                </span>
              </div>
            )}
          </div>
      </div>
    )
  }
}

MultiSelect.propTypes = {
  filterSubset: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSearchSelection: PropTypes.func.isRequired
}
MultiSelect.defaultProps = {
  placeholder: undefined
}

export default MultiSelect;
