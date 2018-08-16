import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../card/Card';
import Icon from '../icon/Icon';
import { CARD_TYPES } from '../../constants/constants';
import { formatDateFromString } from '../../utils';

class ClosedTickets extends Component {
  constructor(props) {
    super(props);

    this.isTicketArchived = this.isTicketArchived.bind(this);
    this.moveTicketToArchive = this.moveTicketToArchive.bind(this);
    this.undoMoveTicketToArchive = this.undoMoveTicketToArchive.bind(this);

    this.state = {
      archivedIssues: []
    };
  }

  isTicketArchived(id) {
    return this.state.archivedIssues.includes(id);
  }

  moveTicketToArchive(id) {
    this.setState(({ archivedIssues }) => ({
      archivedIssues: [...archivedIssues, id]
    }));
    this.props.moveToArchive(id);
  }

  undoMoveTicketToArchive(id) {
    const index = this.state.archivedIssues.indexOf(id);
    if (index !== -1) {
      this.setState(({ archivedIssues }) => ({
        archivedIssues: [
          ...archivedIssues.slice(0, index),
          ...archivedIssues.slice(index + 1)
        ]
      }));
    }
  }

  render() {
    const { archives, match } = this.props;
    return (
      <div className="archives">
        {archives.length > 0 &&
          archives.map(ticket => {
            const { id, sent, sender, issue } = ticket;
            const CardWrapper = this.isTicketArchived(id) ? 'div' : Link;
            const sentDate = formatDateFromString(sent);
            return (
              /* Have to use onClick above in order to capture click events properly inside of Card */
              <CardWrapper key={id} to={`${match.url}/closed/${id}`}>
                <Card types={[CARD_TYPES.CLOSED]}>
                  <Card.Content>
                    {/* ARCHIVED */}
                    {this.isTicketArchived(id) && (
                      <div className="card__message-and-action">
                        <p className="meta">
                          <Icon icon="archive" />Moved to Archive
                        </p>
                        <button
                          type="button"
                          className="btn btn--sm btn--strong"
                          onClick={e => {
                            e.preventDefault();
                            this.undoMoveTicketToArchive(id);
                          }}>
                          Undo
                        </button>
                      </div>
                    )}
                    {/* NOT ARCHIVED */}
                    {!this.isTicketArchived(id) && (
                      <div>
                        <div className="card__summary">
                          <time className="meta ptr" dateTime={sentDate}>
                            {sentDate}
                          </time>
                          <p className="title">
                            {issue === 'Compliment' ? (
                              <Icon icon="heart" />
                            ) : (
                              <Icon icon="comment" />
                            )}
                            {issue}
                          </p>
                          {sender && (
                            <div className="card__contact">
                              <h4>Sender</h4>
                              <p className="title">{sender.name}</p>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          className="card__action pbr"
                          onClick={e => {
                            e.preventDefault();
                            this.moveTicketToArchive(id);
                          }}>
                          mark resolved
                        </button>
                      </div>
                    )}
                  </Card.Content>
                </Card>
              </CardWrapper>
            );
          })}
        {!archives ||
          (archives.length === 0 && (
            <div>
              <p>Empty state goes here...</p>
            </div>
          ))}
      </div>
    );
  }
}

ClosedTickets.propTypes = {
  archives: PropTypes.arrayOf(PropTypes.shape({})),
  moveToArchive: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired
};

ClosedTickets.defaultProps = {
  archives: []
};

export default ClosedTickets;
