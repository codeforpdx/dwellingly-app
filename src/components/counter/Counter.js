import React from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { COUNTER } from "../../translations/messages";

import {
  increment,
  decrement,
} from "../../dux/common";

const Counter = ( { count, isIncrementing, intl } ) => (
  <div>
    <h1>
      Count count count
    </h1>
    <p>
      Count:
      { count }
    </p>

    <div className="buttonRow">
      <button type="button" onClick={ increment }>
        { intl.formatMessage( COUNTER.DOWN ) }
      </button>
      <button type="button" onClick={ decrement } disabled={ isIncrementing }>
        { intl.formatMessage( COUNTER.UP ) }
      </button>
    </div>
  </div>
);

const mapStateToProps = ( { common } ) => ( {
  count: common.count,
  isIncrementing: common.isIncrementing,
  isDecrementing: common.isDecrementing,
} );

const mapDispatchToProps = dispatch => ( {
  increment: () => dispatch( increment() ),
  decrement: () => dispatch( decrement() ),
} );

Counter.propTypes = {
  intl: intlShape.isRequired,
  count: PropTypes.number.isRequired,
  isIncrementing: PropTypes.bool.isRequired,
};

export default connect( mapStateToProps, mapDispatchToProps )( injectIntl( Counter ) );
