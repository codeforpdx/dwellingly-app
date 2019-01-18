import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import { formatDatepickerDate } from '../../utils';

class OutOfOffice extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.currentDate = new Date();

    this.state = {
      outOfOffice: false,
      startDate: formatDatepickerDate(this.currentDate),
      endDate: formatDatepickerDate(this.currentDate)
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit(event) {
    if (event) event.preventDefault();
    // TODO: do stuff
    return this;
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.handleToggle([name], value);
  }

  handleToggle(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    const { history } = this.props;
    return (
      <form action="" onSubmit={this.handleSubmit} className="page">
        <Header variants={['form']}>
          {() => (
            <div>
              <div className="actions">
                <button
                  type="button"
                  aria-label="Cancel"
                  className="action action--strong action--left"
                  onClick={() => history.push('/')}>
                  Cancel
                </button>
                <button
                  type="submit"
                  aria-label="Save"
                  className="action action--strong action--right disabled"
                  disabled>
                  Save
                </button>
              </div>
              <Header.Label label="Out of Office" type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <fieldset>
            <div className="message message--light">
              <p>
                When your OOO is ON, your tenants and their tickets will be
                automatically forwarded to other JOIN staff.
              </p>
            </div>
            <Input
              id="outOfOffice"
              label="Out of Office"
              name="outOfOffice"
              onChange={this.handleToggle}
              type="toggle"
              value={this.state.outOfOffice}
            />
          </fieldset>
          {this.state.outOfOffice && (
            <div>
              <fieldset>
                <div className="message message--light">
                  <p>Days Away</p>
                </div>
                <Input
                  id="settings-startDate"
                  label="Start"
                  name="startDate"
                  onChange={this.handleChange}
                  type="date"
                  value={this.state.startDate}
                />
                <Input
                  id="settings-endDate"
                  label="End"
                  name="endDate"
                  onChange={this.handleChange}
                  type="date"
                  value={this.state.endDate}
                />
              </fieldset>
              <fieldset>
                <div className="message message--light">
                  <p>Share With&hellip;</p>
                </div>
                <Input
                  id="person-brendenSmith"
                  label="Brenden Smith"
                  name="brenenSmith"
                  onChange={this.handleToggle}
                  type="toggle"
                  value={this.state.brendenSmith}
                />
                <Input
                  id="person-alexAlder"
                  label="Alex Alder"
                  name="alexAlder"
                  onChange={this.handleToggle}
                  type="toggle"
                  value={this.state.alexAlder}
                />
                <Input
                  id="person-beverlyBurnside"
                  label="Beverly Burnside"
                  name="beverlyBurnside"
                  onChange={this.handleToggle}
                  type="toggle"
                  value={this.state.beverlyBurnside}
                />
                <Input
                  id="person-donaldDavis"
                  label="Donald Davis"
                  name="donaldDavis"
                  onChange={this.handleToggle}
                  type="toggle"
                  value={this.state.donaldDavis}
                />
                <Input
                  id="person-batman"
                  label="Bruce Wayne"
                  name="batman"
                  onChange={this.handleToggle}
                  type="toggle"
                  value={this.state.batman}
                />
                <Input
                  id="person-enderWiggins"
                  label="Andrew Wiggins"
                  name="enderWiggins"
                  onChange={this.handleToggle}
                  type="toggle"
                  value={this.state.enderWiggins}
                />
              </fieldset>
            </div>
          )}
          {!this.state.outOfOffice && (
            <div className="form-meta">
              <p>
                Your Out of Office scheduled for Jan 22, 2018 at 8:00 am to Jan
                23, 2018 at 5:00 pm has ended.
              </p>
            </div>
          )}
        </section>
      </form>
    );
  }
}

OutOfOffice.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default OutOfOffice;
