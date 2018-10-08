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
          <div className="selectedOptions">
            {this.state.selected.map(({firstName, lastName}) =>
              <div className="selectedPill"><span>{firstName} {lastName}</span><Icon icon="close" /></div>
            )}
          </div>
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
