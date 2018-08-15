import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Icon from '../icon/Icon';
import { CARD_TYPES } from '../../constants/constants';
import { formatDateFromString } from '../../utils';

function ArchivedTickets({ tickets }) {
  return (
    <div>
      {tickets &&
        tickets.length > 0 &&
        tickets.map(ticket => {
          const { id, issue, sent } = ticket;
          const sentDate = formatDateFromString(sent);
          return (
            <Card key={id} types={[CARD_TYPES.SMALL]}>
              <Card.Content>
                <p className="title">
                  <Icon icon="comment" />
                  {issue}
                </p>
                <time className="meta" dateTime={sentDate}>
                  {sentDate}
                </time>
              </Card.Content>
            </Card>
          );
        })}
      {!tickets && <p>Empty state content...</p>}
    </div>
  );
}

ArchivedTickets.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({}))
};

ArchivedTickets.defaultProps = {
  tickets: []
};

export default ArchivedTickets;
