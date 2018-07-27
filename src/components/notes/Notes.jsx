import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Notes.scss';

// TODO: Update "highlighted" ternary to check against currently logged-in user

class Notes extends Component {
  render() {
    const { action, notes, summary } = this.props;
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
                    <p className="note__name">{note.name}</p>
                    <time className="node__date" dateTime={note.sent}>
                      {note.sent}
                    </time>
                  </div>
                  <div
                    className={`msgbox${
                      note.name === 'Tara Mckenzie'
                        ? ' msgbox--highlighted'
                        : ''
                    }`}>
                    {note.message.split('\n').map(i => <p>{i}</p>)}
                  </div>
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
  notes: PropTypes.arrayOf(),
  summary: PropTypes.bool
};

Notes.defaultProps = {
  action: undefined,
  notes: [],
  summary: false
};

export default Notes;
