import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { TERMS } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';

const TermsConditions = ({intl}) => (
  <div className="page">
      <Header>
        {() => (
          <div>
            <Navigation />
            <Header.Label label={intl.formatMessage(TERMS.TITLE)} type="basic" />
          </div>
        )}
      </Header>
    <section className="main width-wrapper">
      <div className="textblock">
        <p>{intl.formatMessage(TERMS.PARAGRAPH_01)}</p>
        <p>{intl.formatMessage(TERMS.PARAGRAPH_02)}</p>
        <p>{intl.formatMessage(TERMS.PARAGRAPH_03)}</p>
        <p>{intl.formatMessage(TERMS.PARAGRAPH_04)}</p>
        <p>{intl.formatMessage(TERMS.PARAGRAPH_05)}</p>
      </div>
    </section>
  </div>
);

TermsConditions.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(TermsConditions);