import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import DocsNavigation from './DocsNavigation';
import Icon from '../../components/icon/Icon';
import Notes from '../../components/notes/Notes';
import Card from '../../components/card/Card';
import { CARD_TYPES, STATUS_OPTIONS } from '../../constants/constants';

import './CodeSamples.scss';

class CardSamples extends Component {
  constructor(props) {
    super(props);

    this.toggleFlag = this.toggleFlag.bind(this);

    this.state = {
      flagged: false
    };
  }

  toggleFlag() {
    this.setState(({ flagged }) => ({ flagged: !flagged }));
  }

  render() {
    const sentDate = new Date().toLocaleDateString('en-US');
    const notes = [
      {
        id: 'K-0089ttxqQX-3',
        name: 'Tara Mckenzie',
        sent: 'Today 12:40pm',
        message:
          'This is the third time we have had to deal with late rent. Please speak to tenant ASAP.'
      },
      {
        id: 'K-0089ttxqQX-2',
        name: 'Tom Smith',
        sent: 'Today 3:20pm',
        message:
          'I plan to meet with Megan today. Thank you for contacting JOIN with this issue.'
      },
      {
        id: 'K-0089ttxqQX-1',
        name: 'Tara Mckenzie',
        sent: 'Just now',
        message: 'Thanks, Tom.'
      }
    ];

    const reopenButton = (
      <button type="button" className="btn btn--strong" onClick={() => {}}>
        Reopen
      </button>
    );

    const newNoteButton = (
      <button type="button" className="btn btn--strong" onClick={() => {}}>
        Add Note
      </button>
    );

    return (
      <div className="page">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label label="Card Samples" type="basic" />
              <DocsNavigation />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <header className="align--left">
            <h1>
              <code>Card.jsx</code>
            </h1>
          </header>
          <div className="content align--left">
            <p>Table of contents:</p>
            <ul>
              <li>
                <a href="#card">Card</a>
              </li>
              <li>
                <a href="#cardTop">Card.Top</a>
              </li>
              <li>
                <a href="#cardHeader">Card.Header</a>
              </li>
              <li>
                <a href="#cardContent">Card.Content</a>
              </li>
              <li>
                <a href="#cardBottom">Card.Bottom</a>
              </li>
              <li>
                <a href="#samples">Samples</a>
              </li>
            </ul>

            <br />
            <br />

            <h2 id="card">Card</h2>
            <hr />
            <h3>Props:</h3>
            <ul>
              <li>
                className: <em>string</em>
              </li>
              <li>
                types: <em>array[</em> string <em>]</em>
                <br />
                Available types:<br />(see{' '}
                <code>CARD_TYPES @ /constants/constants.js</code>)
                <ul>
                  <li>
                    <code>CARD_TYPES.CLOSED</code>
                  </li>
                  <li>
                    <code>CARD_TYPES.FORM</code>
                  </li>
                  <li>
                    <code>CARD_TYPES.LARGE</code>
                  </li>
                  <li>
                    <code>CARD_TYPES.SMALL</code>
                  </li>
                  <li>
                    <code>CARD_TYPES.STATUS</code>
                  </li>
                  <li>
                    <code>CARD_TYPES.TICKET</code>
                  </li>
                </ul>
              </li>
              <li>
                status: <em>string</em>
              </li>
            </ul>

            <h3>Variants:</h3>
            <p>
              Applying a variation to a <code>Card</code> makes use of the{' '}
              <code>types</code> prop (eg. &mdash;{' '}
              <code>
                types=&#x7B;[CARD_TYPES.TICKET, CARD_TYPES.LARGE]&#x7D;
              </code>).
            </p>

            <br />
            <br />

            <h2 id="cardTop">Card.Top</h2>
            <hr />
            <p>
              Used for styling purposes only, to separate top and bottom content
              in order to achieve &ldquo;ticket&rdquo; (skeuomorphic) styling.
              Determines based on <code>types</code> prop whether or not to show
              markup for ticket or select/status dropdown.
            </p>

            <h3>Props:</h3>
            <ul>
              <li>
                <em>
                  Inherits <code>types</code>, <code>status</code>, and{' '}
                  <code>children</code> from parent <code>Card</code> component
                </em>
              </li>
            </ul>

            <br />
            <br />

            <h2 id="cardHeader">Card.Header</h2>
            <hr />
            <h3>Props:</h3>
            <ul>
              <li>
                <em>
                  Inherits <code>types</code>, and <code>status</code> from
                  parent <code>Card.Top</code> component
                </em>
              </li>
              <li>
                close: <em>function</em> &mdash; The <code>close</code> function
                acts as a &quot;back button&quot;, closing the modal, and is a
                required prop for the modal <code>Card</code> variation.
              </li>
              <li>
                label: <em>string</em>
              </li>
              <li>
                isFlagged: <em>boolean</em>
              </li>
              <li>
                toggleFlag: <em>function</em>
              </li>
            </ul>

            <br />
            <br />

            <h2 id="cardContent">Card.Content</h2>
            <hr />
            <h3>Props:</h3>
            <ul>
              <li>
                children: <em>component/element</em>
              </li>
            </ul>

            <br />
            <br />

            <h2 id="cardBottom">Card.Bottom</h2>
            <hr />
            <h3>Props:</h3>
            <ul>
              <li>
                children: <em>component/element</em>
              </li>
            </ul>

            <dl className="code-sample">
              <h2 id="samples">Samples</h2>
              <br />

              <dt>
                <p className="message message--light">
                  <span>
                    <strong>Card</strong>
                  </span>
                </p>
                <p>The most simple use of the Card component.</p>
                <h3>Requirements:</h3>
                <ul>
                  <li>Card (modifiers: none)</li>
                  <li>Card.Content</li>
                </ul>
              </dt>
              <dd>
                <div className="cards">
                  <Card>
                    <Card.Content>
                      <p>
                        This is the most basic example of <code>Card</code>.
                      </p>
                    </Card.Content>
                  </Card>
                  <Card status="New">
                    <Card.Content>
                      <div className="card__summary">
                        <time className="meta ptr" dateTime={sentDate}>
                          {sentDate}
                        </time>
                        <p className="progress status">New</p>
                        <p className="title">Peter Parker</p>
                        <p className="meta">Property Damage</p>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
                <pre>
                  <code>
                    &lt;Card&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;<em>
                      CONTENT GOES HERE
                    </em>&lt;/p&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &lt;/Card&gt;<br />
                    <br />
                    &lt;Card status=&#x7B;status&#x7D;&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&#x22;card__summary&#x22;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;time
                    className=&#x22;meta ptr&#22;
                    dateTime=&#x7B;sentDate&#x7D;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7B;sentDate&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/time&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&#x22;progress
                    status&#x22;&gt;&#x7B;status&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&#x22;title&#x22;&gt;&#x7B;tenant.name&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&#x22;meta&#x22;&gt;&#x7B;issue&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &lt;/Card&gt;
                  </code>
                </pre>
              </dd>
            </dl>

            <dl className="code-sample">
              <dt>
                <p className="message message--light">
                  <span>
                    <strong>Card</strong> &mdash; CLOSED
                  </span>
                </p>
                <p>
                  Basic Card component with a type modifier that changes some
                  basic padding and measurements for the closed tickets list
                  views (see <code>/components/tickets/ClosedTickets.jsx</code>).
                </p>
                <h3>Requirements:</h3>
                <ul>
                  <li>
                    Card
                    <ul>
                      <li>
                        Props:
                        <ul>
                          <li>
                            types: <em>array</em> &mdash; (Required) (modifiers:{' '}
                            <code>CARD_TYPES.CLOSED</code>)
                          </li>
                          <li>
                            status: <em>string</em>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>Card.Content</li>
                </ul>
              </dt>
              <dd>
                <div className="cards">
                  <Card
                    types={[CARD_TYPES.CLOSED]}
                    status={STATUS_OPTIONS.CLOSED}>
                    <Card.Content>
                      <div>
                        <div className="card__summary">
                          <time className="meta ptr" dateTime={sentDate}>
                            {sentDate}
                          </time>
                          <p className="title">
                            <Icon icon="comment" />
                            Property Damage
                          </p>
                          <div className="card__contact">
                            <h4>Sender</h4>
                            <p className="title">J. Jonah Jameson</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="card__action pbr"
                          onClick={e => {
                            e.preventDefault();
                          }}>
                          mark resolved
                        </button>
                      </div>
                    </Card.Content>
                  </Card>
                  <Card
                    types={[CARD_TYPES.CLOSED]}
                    status={STATUS_OPTIONS.CLOSED}>
                    <Card.Content>
                      <div className="card__message-and-action">
                        <p className="meta">
                          <Icon icon="archive" />Moved to Archive
                        </p>
                        <button
                          type="button"
                          className="btn btn--sm btn--strong"
                          onClick={e => {
                            e.preventDefault();
                          }}>
                          Undo
                        </button>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
                <pre>
                  <code>
                    &lt;Card types=&#x7B;&#x5B;CARD_TYPES.CLOSED&#x5D;&#x7D;
                    status=&#x7B;status&#x7D;&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&quot;card__summary&quot;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;time
                    className=&quot;meta ptr&quot;
                    dateTime=&#x7B;sentDate&#x7D;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7B;sentDate&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/time&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;title&quot;&gt; &lt;Icon
                    icon=&quot;comment&quot; /&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7B;issue&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&quot;card__contact&quot;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h4&gt;Sender&lt;/h4&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;title&quot;&gt;&#x7B;sender.name&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type=&quot;button&quot;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className=&quot;card__action
                    pbr&quot;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onClick=&#x7B;e
                    =&gt; &#x7B;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.preventDefault();<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7D;&#x7D;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mark
                    resolved<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &lt;/Card&gt;<br />
                    <br />
                    &lt;Card types=&#x7B;&#x5B;CARD_TYPES.CLOSED&#x5D;&#x7D;
                    status=&#x7B;status&#x7D;&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&quot;card__message-and-action&quot;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;meta&quot;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Icon
                    icon=&quot;archive&quot; /&gt;Moved to Archive<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type=&quot;button&quot;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className=&quot;btn
                    btn--sm btn--strong&quot;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onClick=&#x7B;e
                    =&gt; &#x7B;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.preventDefault();<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7D;&#x7D;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Undo<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &lt;/Card&gt;
                  </code>
                </pre>
              </dd>
            </dl>

            <dl className="code-sample">
              <dt>
                <p className="message message--light">
                  <span>
                    <strong>Card</strong> &mdash; SMALL
                  </span>
                </p>
                <p>
                  Stylistic variant used for simple cards such as those found
                  under a tenant&rsquo;s Archive page (see{' '}
                  <code>/components/tickets/ArchivedTickets.jsx</code>).
                </p>
                <h3>Requirements:</h3>
                <ul>
                  <li>
                    Card
                    <ul>
                      <li>
                        Props:
                        <ul>
                          <li>
                            types: <em>array</em> &mdash; (Required) (modifiers:{' '}
                            <code>CARD_TYPES.SMALL</code>)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>Card.Content</li>
                </ul>
              </dt>
              <dd>
                <div className="cards">
                  <Card types={[CARD_TYPES.SMALL]}>
                    <Card.Content>
                      <p className="title">
                        <Icon icon="comment" />
                        <em>ISSUE TEXT</em>
                      </p>
                      <time className="meta" dateTime={sentDate}>
                        {sentDate}
                      </time>
                    </Card.Content>
                  </Card>
                </div>
                <pre>
                  <code>
                    &lt;Card types=&#x7B;&#x5B;CARD_TYPES.SMALL&#x5D;&#x7D;&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&#x22;title&#x22;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Icon
                    icon=&#x22;comment&#x22;/&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>ISSUE TEXT</em>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;time className=&#x22;meta&#22;
                    dateTime=&#x7B;sentDate&#x7D;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7B;sentDate&#x7D;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/time&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &lt;/Card&gt;
                  </code>
                </pre>
              </dd>
            </dl>

            <dl className="code-sample">
              <dt>
                <p className="message message--light">
                  <span>
                    <strong>Card</strong> &mdash; TICKET
                  </span>
                </p>
                <p>
                  Stylistic variant used for cards showing basic ticket/issue
                  information (see{' '}
                  <code>/components/tickets/OngoingTickets.jsx</code>).
                </p>
                <h3>Requirements:</h3>
                <ul>
                  <li>
                    Card
                    <ul>
                      <li>
                        Props:
                        <ul>
                          <li>
                            types: <em>array</em> &mdash; (Required) (modifiers:{' '}
                            <code>CARD_TYPES.TICKET</code>)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>Card.Top</li>
                  <li>Card.Content</li>
                  <li>Card.Bottom</li>
                </ul>
              </dt>
              <dd>
                <div className="cards">
                  <Card types={[CARD_TYPES.TICKET]}>
                    <Card.Top>
                      <Card.Content>
                        <div className="card__summary">
                          <time className="meta ptr" dateTime={sentDate}>
                            {sentDate}
                          </time>
                          <p className="progress status">New</p>
                          <p className="title">Peter Parker</p>
                          <p className="meta">Property Damage</p>
                        </div>
                      </Card.Content>
                    </Card.Top>
                    <Card.Bottom>
                      <Card.Content>
                        <div className="card__contact container">
                          <div className="container--left">
                            <h4>Sender</h4>
                            <p>J. Jonah Jameson</p>
                          </div>
                          <div className="container--right">
                            <h4>Urgency</h4>
                            <p className="status status--high">High</p>
                          </div>
                        </div>
                        <Notes summary notes={notes} />
                      </Card.Content>
                    </Card.Bottom>
                  </Card>
                </div>
                <pre>
                  <code>
                    &lt;Card types=&#x7B;&#x5B;CARD_TYPES.TICKET&#x5D;&#x7D;&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Top&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&#x22;card__summary&#x22;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;time
                    className=&#x22;meta ptr&#22;
                    dateTime=&#x7B;sentDate&#x7D;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7B;sentDate&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/time&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&#x22;progress
                    status&#x22;&gt;&#x7B;status&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&#x22;title&#x22;&gt;&#x7B;tenant.name&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&#x22;meta&#x22;&gt;&#x7B;issue&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Top&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Bottom&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&#x22;card__contact container&#x22;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&#x22;container--left&#x22;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h4&gt;Sender&lt;/h4&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;&#x7B;sender.name&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&#x22;container--right&#x22;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h4&gt;Urgency&lt;/h4&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&#x7B;&#96;status status--$
                    &#x7B;urgency.toLowerCase()&#x7D;&#96;&#x7D;&gt;&#x7B;urgency&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Notes summary
                    notes=&#x7B;notes&#x7D; /&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Bottom&gt;<br />
                    &lt;/Card&gt;
                  </code>
                </pre>
              </dd>
            </dl>

            <dl className="code-sample">
              <dt>
                <p className="message message--light">
                  <span>
                    <strong>Card</strong> &mdash; LARGE TICKET (<em>
                      Property Manager
                    </em>)
                  </span>
                </p>
                <p>
                  Variation combination for cards showing full ticket/issue
                  details, specifically within a modal (as a Property Manager)
                  (see <code>/components/modal/TicketModal.jsx</code>).
                </p>
                <h3>Requirements:</h3>
                <ul>
                  <li>
                    Card
                    <ul>
                      <li>
                        Props:
                        <ul>
                          <li>
                            types: <em>array</em> &mdash; (Required) (modifiers:{' '}
                            <code>CARD_TYPES.LARGE</code> <em>and</em>{' '}
                            <code>CARD_TYPES.TICKET</code>)
                          </li>
                          <li>
                            status: <em>string</em>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>Card.Top</li>
                  <li>
                    Card.Header
                    <ul>
                      <li>
                        Props:
                        <ul>
                          <li>
                            label: <em>string</em> &mdash; (Required)
                          </li>
                          <li>
                            close: <em>function</em> &mdash; (Required)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>Card.Content</li>
                  <li>Card.Bottom</li>
                </ul>
              </dt>
              <dd>
                <div className="cards">
                  <Card
                    types={[CARD_TYPES.LARGE, CARD_TYPES.TICKET]}
                    status="New">
                    <Card.Top>
                      <Card.Header label="Property Damage" close={() => {}} />
                      <Card.Content>
                        <div className="card__summary">
                          <time className="meta ptr" dateTime={sentDate}>
                            {sentDate}
                          </time>
                          <p className="progress status">New</p>
                          <p className="title">Peter Parker</p>
                          <p className="meta">Property Damage</p>
                        </div>
                      </Card.Content>
                    </Card.Top>
                    <Card.Bottom>
                      <Card.Content>
                        <Notes
                          action={
                            STATUS_OPTIONS.CLOSED === 'New'
                              ? reopenButton
                              : newNoteButton
                          }
                          notes={notes}
                        />
                      </Card.Content>
                    </Card.Bottom>
                  </Card>
                </div>
                <pre>
                  <code>
                    &lt;Card types=&#x7B;&#x5B;CARD_TYPES.LARGE,
                    CARD_TYPES.TICKET&#x5D;&#x7D; status=&#x7B;status&#x7D;&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Top&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card.Header
                    label=&#x7B;issue&#x7D; close=&#x7B;() =&gt;
                    &#x7B;&#x7D;&#x7D; /&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&quot;card__summary&quot;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;time
                    className=&quot;meta ptr&quot;
                    dateTime=&#x7B;sentDate&#x7D;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7B;sentDate&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/time&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;progress
                    status&quot;&gt;&#x7B;status&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;title&quot;&gt;&#x7B;tenant.name&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;meta&quot;&gt;&#x7B;issue&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Top&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Bottom&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Notes<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;action=&#x7B;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status
                    === STATUS_OPTIONS.CLOSED<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?
                    reopenButton<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    newNoteButton<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notes=&#x7B;notes&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Bottom&gt;<br />
                    &lt;/Card&gt;
                  </code>
                </pre>
              </dd>
            </dl>

            <dl className="code-sample">
              <dt>
                <p className="message message--light">
                  <span>
                    <strong>Card</strong> &mdash; LARGE TICKET (<em>
                      Staff/Admin
                    </em>)
                  </span>
                </p>
                <p>
                  Variation combination for cards showing full ticket/issue
                  details, specifically within a modal (as a Staff or Admin
                  user) (see <code>/components/modal/TicketModal.jsx</code>).
                </p>
                <h3>Requirements:</h3>
                <ul>
                  <li>
                    Card (modifiers: <code>CARD_TYPES.LARGE</code> <em>and</em>{' '}
                    <code>CARD_TYPES.STATUS</code>)
                    <ul>
                      <li>
                        Props:
                        <ul>
                          <li>
                            status: <em>string</em> &mdash; (Required)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>Card.Top</li>
                  <li>
                    Card.Header
                    <ul>
                      <li>
                        Props:
                        <ul>
                          <li>
                            label: <em>string</em> &mdash; (Required)
                          </li>
                          <li>
                            close: <em>function</em> &mdash; (Required)
                          </li>
                          <li>
                            isFlagged: <em>boolean</em> &mdash; (Required)
                          </li>
                          <li>
                            toggleFlag: <em>function</em> &mdash; (Required)
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>Card.Content</li>
                  <li>Card.Bottom</li>
                </ul>
              </dt>
              <dd>
                <div className="cards">
                  <Card
                    types={[CARD_TYPES.LARGE, CARD_TYPES.STATUS]}
                    status="New">
                    <Card.Top>
                      <Card.Header
                        label="Property Damage"
                        close={() => {}}
                        isFlagged={this.state.flagged}
                        toggleFlag={this.toggleFlag}
                      />
                      <Card.Content>
                        <div className="card__summary">
                          <time className="meta ptr" dateTime={sentDate}>
                            {sentDate}
                          </time>
                          <p className="progress status">New</p>
                          <p className="title">Peter Parker</p>
                          <p className="meta">Property Damage</p>
                        </div>
                      </Card.Content>
                    </Card.Top>
                    <Card.Bottom>
                      <Card.Content>
                        <Notes
                          action={
                            STATUS_OPTIONS.CLOSED === 'New'
                              ? reopenButton
                              : newNoteButton
                          }
                          notes={notes}
                        />
                      </Card.Content>
                    </Card.Bottom>
                  </Card>
                </div>
                <pre>
                  <code>
                    &lt;Card<br />
                    &nbsp;&nbsp;types=&#x7B;&#x5B;CARD_TYPES.LARGE,
                    CARD_TYPES.STATUS&#x5D;&#x7D;<br />
                    &nbsp;&nbsp;status=&#x7B;status&#x7D;&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Top&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card.Header<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label=&#x7B;issue&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;close=&#x7B;() =&gt;
                    &nbsp;&nbsp;&#x7B;&#x7D;&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isFlagged=&#x7B;this.state.flagged&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;toggleFlag=&#x7B;this.toggleFlag&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div
                    className=&quot;card__summary&quot;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;time
                    className=&quot;meta ptr&quot;
                    dateTime=&#x7B;sentDate&#x7D;&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7B;sentDate&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/time&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;progress
                    status&quot;&gt;&#x7B;status&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;title&quot;&gt;&#x7B;tenant.name&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p
                    className=&quot;meta&quot;&gt;&#x7B;issue&#x7D;&lt;/p&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Top&gt;<br />
                    &nbsp;&nbsp;&lt;Card.Bottom&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Card.Content&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Notes<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;action=&#x7B;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status ===
                    STATUS_OPTIONS.CLOSED<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?
                    reopenButton<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                    newNoteButton<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notes=&#x7B;notes&#x7D;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/Card.Content&gt;<br />
                    &nbsp;&nbsp;&lt;/Card.Bottom&gt;<br />
                    &lt;/Card&gt;
                  </code>
                </pre>
              </dd>
            </dl>
          </div>
        </section>
      </div>
    );
  }
}

export default CardSamples;
