import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import Card from '../card/Card';
import './Tile.scss';

class Tile extends Component {
  static Top({ title }) {
    return (
      <div className="admin__tile--heading">
        <h3>{title}</h3>
        <Icon icon="arrowRight"/>
      </div>
    )
  }

  static Content({ children }) {
    return <div className="admin__tile--body">{children}</div>
  }

  static Inner({ children }) {
    return <div className="admin__tile--body-inner">{children}</div>
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <div className="admin__tile">
            {React.Children.map(this.props.children, child =>
              child
            )}
          </div>
        </Card.Content>
      </Card>
    )
  }
}

Tile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

Tile.defaultProps = {
  children: undefined
}

export default Tile
