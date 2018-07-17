import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { UNKNOWN_PAGE_MESSAGES } from '../../translations/messages';
import './Unknown.scss';

const Unknown = ({ intl }) => (
  <div className="unknown">
    <p>
      { intl.formatMessage(UNKNOWN_PAGE_MESSAGES.DESCRIPTION) }
    </p>
  </div>
);

Unknown.propTypes = {
  // this provides route info, will cause lint error
  intl: intlShape.isRequired,
};

export default injectIntl(Unknown);
