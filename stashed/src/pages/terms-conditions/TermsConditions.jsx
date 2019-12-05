import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import { TERMS } from '../../translations/messages';
import { SETTINGS } from '../../constants/constants';

function createMarkup(markup) {
  return { __html: markup };
}

const TermsConditions = ({ intl }) => (
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
        <p>{intl.formatMessage(TERMS.PARAGRAPH_LAST_MODIFIED)}</p>
        <p
          dangerouslySetInnerHTML={createMarkup(
            intl.formatMessage(TERMS.PARAGRAPH_INSTRUCTIONS_A, {
              site: SETTINGS.DOMAIN,
              org: SETTINGS.ORGANIZATION
            })
          )}
        />
        <p>{intl.formatMessage(TERMS.PARAGRAPH_INSTRUCTIONS_B)}</p>

        <h2>{intl.formatMessage(TERMS.HEADER_PROPERTY)}</h2>
        <p>
          {intl.formatMessage(TERMS.PARAGRAPH_PROPERTY, {
            org: SETTINGS.ORGANIZATION
          })}
        </p>

        <h2>{intl.formatMessage(TERMS.HEADER_TERMINATION)}</h2>
        <p>
          {intl.formatMessage(TERMS.PARAGRAPH_TERMINATION, {
            org: SETTINGS.ORGANIZATION
          })}
        </p>

        <h2>{intl.formatMessage(TERMS.HEADER_LINKS)}</h2>
        <p>
          {intl.formatMessage(TERMS.PARAGRAPH_LINKS_A, {
            org: SETTINGS.ORGANIZATION
          })}
        </p>
        <p>
          {intl.formatMessage(TERMS.PARAGRAPH_LINKS_B, {
            org: SETTINGS.ORGANIZATION
          })}
        </p>

        <h2>{intl.formatMessage(TERMS.HEADER_GOVERNING_LAW)}</h2>
        <p>{intl.formatMessage(TERMS.PARAGRAPH_GOVERNING_LAW)}</p>

        <h2>{intl.formatMessage(TERMS.HEADER_CHANGES)}</h2>
        <p>
          {intl.formatMessage(TERMS.PARAGRAPH_CHANGES_A, {
            org: SETTINGS.ORGANIZATION
          })}
        </p>
        <p>
          {intl.formatMessage(TERMS.PARAGRAPH_CHANGES_B, {
            org: SETTINGS.ORGANIZATION
          })}
        </p>

        <h2>{intl.formatMessage(TERMS.HEADER_WHAT_YOU_CAN_DO)}</h2>
        <p>
          {intl.formatMessage(TERMS.PARAGRAPH_WHAT_YOU_CAN_DO, {
            org: SETTINGS.ORGANIZATION
          })}
        </p>
        <ul>
          <li>{intl.formatMessage(TERMS.LIST_PROHIBITED_ACTIONS_1)}</li>
          <li>{intl.formatMessage(TERMS.LIST_PROHIBITED_ACTIONS_2)}</li>
          <li>
            {intl.formatMessage(TERMS.LIST_PROHIBITED_ACTIONS_3, {
              org: SETTINGS.ORGANIZATION
            })}
          </li>
        </ul>

        <h2>{intl.formatMessage(TERMS.HEADER_CONTACT_US)}</h2>
        <p
          dangerouslySetInnerHTML={createMarkup(
            intl.formatMessage(TERMS.PARAGRAPH_CONTACT_US, {
              address: SETTINGS.CONTACT_EMAIL
            })
          )}
        />
      </div>
    </section>
  </div>
);

TermsConditions.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(TermsConditions);
