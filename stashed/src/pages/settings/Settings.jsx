import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Icon from '../../components/icon/Icon';

import { dummyUser } from '../../data';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.issueOptions = [
      { unpaidRent: 'Unpaid Rent' },
      { otherFinancial: 'Other Financial' },
      { unauthorizedGuests: 'Unauthorized Guests' },
      { unitConditions: 'Unit Conditions' },
      { ruleViolations: 'Rule Violations' },
      { noise: 'Noise' },
      { propertyDamage: 'Property Damage' }
    ];

    this.user = dummyUser;

    this.state = {
      password: '',
      passwordNew: '',
      passwordConfirm: ''
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

    this.setState({
      [name]: value
    });
  }

  render() {
    const { history } = this.props;
    const { user } = this;
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
                  className="action action--strong action--right"
                  disabled>
                  Save
                </button>
              </div>
              <Header.Label label="Settings" type="basic" />
              <Header.Label type="contact">
                {() => (
                  <h1>
                    <Icon icon="userOutline" />
                    {user.name}
                  </h1>
                )}
              </Header.Label>
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <fieldset>
            <Input
              id="settings-phone"
              label="Phone"
              name="phone"
              onChange={this.handleChange}
              placeholder="Phone Number"
              type="tel"
              value={user.phone}
              variants={['full']}
            />
            <Input
              id="settings-emailAddress"
              label="Email"
              name="email"
              onChange={this.handleChange}
              placeholder="Email Address"
              type="email"
              value={user.email}
              variants={['full']}
            />
            <Input
              id="settings-password"
              label="Current"
              name="password"
              onChange={this.handleChange}
              placeholder="Current Password"
              type="password"
              value={this.state.password}
              variants={['full']}
            />
            <Input
              id="settings-passwordNew"
              label="New"
              name="passwordNew"
              onChange={this.handleChange}
              placeholder="New Password"
              type="password"
              value={this.state.passwordNew}
              variants={['full']}
            />
            <Input
              id="settings-passwordConfirm"
              label="Verify"
              name="passwordConfirm"
              onChange={this.handleChange}
              placeholder="Verify Password"
              type="password"
              value={this.state.passwordConfirm}
              variants={['full']}
            />
          </fieldset>

          <div className="form-meta">
            <a className="form-link" href="#report">
              Report a Problem with the App
            </a>
            <a className="form-link" href="#change">
              Change Password
            </a>
            <Link className="form-link" to="/login">
              Log Out
            </Link>
          </div>
        </section>
      </form>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default Settings;
