import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { COMMON } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './PropertyDashboard.scss';

const PropertyDashboard = ({ intl }) => (
  <div className="page">
    <Header>
      {() => (
        <div>
          <Navigation />
          <Header.Label label={intl.formatMessage(COMMON.HELLO)} type="basic" />
        </div>
      )}
    </Header>
    <section className="main width-wrapper">
      <div className="add-new">
        <p className="property-header">PROPERTIES</p>
        <button type="button" className="btn btn--lrg">+ ADD NEW</button>
      </div>
    </section>
  </div>
);

PropertyDashboard.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(PropertyDashboard);