import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { ACCORDION_TYPES } from '../../constants/constants';

import './Accordion.scss';

class Accordion extends Component {
  static Label({ label, onToggle }) {
    return (
      <div className="accordion__label" onClick={onToggle} role="presentation">
        {label}
      </div>
    )
  }

  static Table({ hidden }) {
    return (
      <div>
      {!hidden ?
        <div className="accordion__table">
          <table>
            <tbody>
              <tr>
                <td>Tenant Name</td>
                <td>Meerkat Manor<br/> Property Manager Name</td>
                <td>Outreach Name</td>
                <td>
                  <select>
                    <option>Retention Name</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Tenant Name</td>
                <td>Meerkat Manor<br/> Property Manager Name</td>
                <td>Outreach Name</td>
                <td>
                  <select>
                    <option>Retention Name</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Tenant Name</td>
                <td>Meerkat Manor<br/> Property Manager Name</td>
                <td>Outreach Name</td>
                <td>
                  <select>
                    <option>Retention Name</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Tenant Name</td>
                <td>Meerkat Manor<br/> Property Manager Name</td>
                <td>Outreach Name</td>
                <td>
                  <select>
                    <option>Retention Name</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="btn btn--lg">Save Assignments</button>
        </div>
      : null}
      </div>
    )
  }

  static List() {
    return (
      <div className="accordion__list">
        <div className="accordion__list--item">
          <ul>
            <li>Property Manager Name</li>
            <li>propertymanager@email.com</li>
            <li>(555)123-1234</li>
          </ul>
          <p>Capuchin Court, Gibbon Gardens</p>
          <button type="button" className="btn">Add</button>
        </div>
        <div className="accordion__list--item">
          <ul>
            <li>Property Manager Name</li>
            <li>propertymanager@email.com</li>
            <li>(555)123-1234</li>
          </ul>
          <p>Capuchin Court, Gibbon Gardens</p>
          <button type="button" className="btn">Add</button>
        </div>
        <div className="accordion__list--item">
          <ul>
            <li>Property Manager Name</li>
            <li>propertymanager@email.com</li>
            <li>(555)123-1234</li>
          </ul>
          <p>Capuchin Court, Gibbon Gardens</p>
          <button type="button" className="btn">Add</button>
        </div>
      </div>
    )
  }

  static Select() {
    return (
      <div className="accordion__select">
        <table>
          <tbody>
            <tr>
              <td><input type="checkbox" /> Tenant Name</td>
              <td>01/31/2017</td>
              <td>
                Building Name<br/>
                Property Manager Name
              </td>
              <td>
                3 issues<br/>
                1 compliment
              </td>
              <td><em>*1 open ticket</em></td>
            </tr>
            <tr>
              <td><input type="checkbox" /> Tenant Name</td>
              <td>01/31/2017</td>
              <td>
                Building Name<br/>
                Property Manager Name
              </td>
              <td>
                0 issues
              </td>
              <td><em>&nbsp;</em></td>
            </tr>
            <tr>
              <td><input type="checkbox" /> Tenant Name</td>
              <td>01/31/2017</td>
              <td>
                Building Name<br/>
                Property Manager Name
              </td>
              <td>
                0 issues
              </td>
              <td><em>&nbsp;</em></td>
            </tr>
            <tr>
              <td><input type="checkbox" /> Tenant Name</td>
              <td>01/31/2017</td>
              <td>
                Building Name<br/>
                Property Manager Name
              </td>
              <td>
                0 issues
              </td>
              <td><em>&nbsp;</em></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="admin__accordion">
        {React.Children.map(this.props.children, child =>
          child
        )}
      </div>
    )
  }
}

Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

Accordion.defaultProps = {
  children: undefined,
}

export default Accordion;
