import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../MessageBox/MessageBox';

import './Notes.scss';

// TODO: Update "highlighted" ternary to check against currently logged-in user

class Notes extends Component {
  render() {
    const { action, notes, summary } = this.props;
    const sentDate = notes.dateCreated;
    return (
      <div>
        {summary && (
          <div className="msgbox msgbox--inline">
            <h4>Notes</h4>
            <span className="count">{notes.length}</span>
          </div>
        )}
        {!summary && (
          <div className="notes">
            <header>
              <h4>Notes</h4>
              {action && action}
            </header>
            {notes &&
              notes.length > 0 &&
              notes.map(note => (
                <div key={note.id} className="note">
                  <div className="note__meta">
                    <p className="note__name">{note.fullName}</p>
                    <time className="node__date" dateTime={sentDate}>
                      {sentDate}
                    </time>
                  </div>
                  <MessageBox user={note.name} message={note.message} />
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

Notes.propTypes = {
  action: PropTypes.element,
  notes: PropTypes.arrayOf(PropTypes.shape({})),
  summary: PropTypes.bool
};

Notes.defaultProps = {
  action: undefined,
  notes: [],
  summary: false
};

export default Notes;
