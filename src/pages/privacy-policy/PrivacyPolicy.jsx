import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { PRIVACY } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';


const PrivacyPolicy = ({intl}) => (
  <div className="page">
    <Header>
      {() => (
        <div>
          <Navigation />
          <Header.Label label={intl.formatMessage(PRIVACY.TITLE)} type="basic" />
        </div>
      )}
    </Header>
    <section className="main width-wrapper">
      <div className="textblock">
        <h1>
          {intl.formatMessage(PRIVACY.TITLE)}
        </h1>

        <p>
          {intl.formatMessage(PRIVACY.ABOUT_POLICY)}
        </p>

        <h2>
          {intl.formatMessage(PRIVACY.HEADER_INFO)}
        </h2>

        <p>
          {intl.formatMessage(PRIVACY.CONTENT_INFO_01)}
        </p>

        <p>
         {intl.formatMessage(PRIVACY.CONTENT_INFO_02)}
        </p>

        <ul>
          <li>
            “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="http://www.allaboutcookies.org">http://www.allaboutcookies.org.</a>
          </li>
          <li>
            “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
          </li>
          <li>
            “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
          </li>
        </ul>

        <p>
          {intl.formatMessage(PRIVACY.CONTENT_INFO_03)}
        </p>

        <h2>
          HOW DO WE USE YOUR PERSONAL INFORMATION?
        </h2>
        
        <p>
          We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site).
        </p>

        <h2>
          SHARING YOUR PERSONAL INFORMATION
        </h2>
        
        <p>
          We do not share your Personal Information with third parties. We use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/">https://www.google.com/intl/en/policies/privacy/</a>.  You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>.
        </p>

        <p>
          Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
        </p>

        <h2>
          DO NOT TRACK
        </h2>

        <p>
          Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
        </p>

        <h2>
          DATA RETENTION
        </h2>

        <p>
          When you submit information through the Site, we will maintain your information for our records unless and until you ask us to delete this information.
        </p>

        <h2>
          CHANGES
        </h2>
        
        <p>
          We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
        </p>

        <h2>
          CONTACT US
        </h2>

        <p>
          For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:info@joinpdx.org">info@joinpdx.org</a> or by mail using the details provided below:
        </p>

        <p>
          PO Box 16490, Portland, OR, 97292, United States
        </p>
      </div>
    </section>
  </div>
);


PrivacyPolicy.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PrivacyPolicy);

