import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
// import { Input, Toggle } from "../../components/input/Input";
import Input from '../../components/input/Input';
import Toggle from '../../components/input/Toggle';
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
    // do stuff
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
            <div className="width-wrapper">
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
            <Toggle
              id="outOfOffice"
              label="Out of Office"
              model="outOfOffice"
              onToggle={this.handleToggle}
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
                <Toggle
                  id="person-brendenSmith"
                  label="Brenden Smith"
                  model="brenenSmith"
                  onToggle={this.handleToggle}
                  value={this.state.brendenSmith}
                />
                <Toggle
                  id="person-alexAlder"
                  label="Alex Alder"
                  model="alexAlder"
                  onToggle={this.handleToggle}
                  value={this.state.alexAlder}
                />
                <Toggle
                  id="person-beverlyBurnside"
                  label="Beverly Burnside"
                  model="beverlyBurnside"
                  onToggle={this.handleToggle}
                  value={this.state.beverlyBurnside}
                />
                <Toggle
                  id="person-donaldDavis"
                  label="Donald Davis"
                  model="donaldDavis"
                  onToggle={this.handleToggle}
                  value={this.state.donaldDavis}
                />
                <Toggle
                  id="person-batman"
                  label="Bruce Wayne"
                  model="batman"
                  onToggle={this.handleToggle}
                  value={this.state.batman}
                />
                <Toggle
                  id="person-enderWiggins"
                  label="Andrew Wiggins"
                  model="enderWiggins"
                  onToggle={this.handleToggle}
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
