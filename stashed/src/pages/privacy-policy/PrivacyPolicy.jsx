import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { PRIVACY } from '../../translations/messages';
import { SETTINGS } from '../../constants/constants';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';

function createMarkup(markup) {
  return { __html: markup };
}

const PrivacyPolicy = ({ intl }) => (
  <div className="page">
    <Header>
      {() => (
        <div>
          <Navigation />
          <Header.Label
            label={intl.formatMessage(PRIVACY.TITLE, {
              org: SETTINGS.ORGANIZATION
            })}
            type="basic"
          />
        </div>
      )}
    </Header>
    <section className="main width-wrapper">
      <div className="textblock">
        <h1>
          {intl.formatMessage(PRIVACY.TITLE, { org: SETTINGS.ORGANIZATION })}
        </h1>

        <p>
          {intl.formatMessage(PRIVACY.ABOUT_POLICY, { site: SETTINGS.DOMAIN })}
        </p>

        <h2>{intl.formatMessage(PRIVACY.HEADER_INFO)}</h2>

        <p>{intl.formatMessage(PRIVACY.CONTENT_INFO_01)}</p>

        <p>{intl.formatMessage(PRIVACY.CONTENT_INFO_02)}</p>

        <ul>
          <li
            dangerouslySetInnerHTML={createMarkup(
              intl.formatMessage(PRIVACY.CONTENT_INFO_02_BULLET_1)
            )}
          />
          <li>{intl.formatMessage(PRIVACY.CONTENT_INFO_02_BULLET_2)}</li>
          <li>{intl.formatMessage(PRIVACY.CONTENT_INFO_02_BULLET_3)}</li>
        </ul>

        <p>{intl.formatMessage(PRIVACY.CONTENT_INFO_03)}</p>

        <h2>{intl.formatMessage(PRIVACY.HEADER_INFO_USE)}</h2>

        <p>{intl.formatMessage(PRIVACY.CONTENT_INFO_USE)}</p>

        <h2>{intl.formatMessage(PRIVACY.HEADER_INFO_SHARING)}</h2>

        <p
          dangerouslySetInnerHTML={createMarkup(
            intl.formatMessage(PRIVACY.CONTENT_SHARING_01)
          )}
        />

        <p>{intl.formatMessage(PRIVACY.CONTENT_SHARING_02)}</p>

        <h2>{intl.formatMessage(PRIVACY.HEADER_TRACKING)}</h2>

        <p>{intl.formatMessage(PRIVACY.CONTENT_TRACKING_01)}</p>

        <h2>{intl.formatMessage(PRIVACY.HEADER_DATA_RETENTION)}</h2>

        <p>{intl.formatMessage(PRIVACY.CONTENT_DATA_RETENTION_01)}</p>

        <h2>{intl.formatMessage(PRIVACY.HEADER_CHANGES)}</h2>

        <p>{intl.formatMessage(PRIVACY.CONTENT_CHANGES_01)}</p>

        <h2>{intl.formatMessage(PRIVACY.HEADER_CONTACT)}</h2>

        <p
          dangerouslySetInnerHTML={createMarkup(
            intl.formatMessage(PRIVACY.CONTENT_CONTACT_01, {
              contact: SETTINGS.CONTACT_EMAIL
            })
          )}
        />

        <p>{intl.formatMessage(PRIVACY.CONTENT_CONTACT_02)}</p>
      </div>
    </section>
  </div>
);

PrivacyPolicy.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(PrivacyPolicy);
