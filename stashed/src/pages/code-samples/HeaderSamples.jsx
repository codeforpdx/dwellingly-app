import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
// import Icon from '../../components/icon/Icon';
import DocsNavigation from './DocsNavigation';

import './CodeSamples.scss';

class HeaderSamples extends Component {
  render() {
    return (
      <div className="page">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label label="Header Samples" type="basic" />
              <DocsNavigation />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <header className="align--left">
            <h1>
              <code>Header.jsx</code>
            </h1>
          </header>
          <div className="content align--left">
            <p>Table of contents:</p>
            <ul>
              <li>
                <a href="#header">Header</a>
              </li>
              <li>
                <a href="#headerLabel">Header.Label</a>
              </li>
              <li>
                <a href="#samples">Samples</a>
              </li>
            </ul>

            <br />
            <br />

            <h2 id="header">Header</h2>
            <hr />
            <h3>Props:</h3>
            <ul>
              <li>
                label: <em>string</em>
              </li>
              <li>
                type: <em>string</em>
              </li>
              <li>
                variant: <em>string</em>
              </li>
              <li>
                children: <em>function</em> &mdash; (Required [<em>implied</em>])
              </li>
            </ul>

            <h3>Variants:</h3>
            <p>
              Applying a variation to a <code>Header</code> makes use of the{' '}
              <code>variant</code> prop (eg. &mdash;{' '}
              <code>variant=&quot;form&quot;</code>).
            </p>

            <br />
            <br />

            <h2 id="headerLabel">Header.Label</h2>
            <hr />
            <p>Description...</p>

            <h3>Props:</h3>
            <ul>
              <li>
                label: <em>string</em> &mdash; (Required)
              </li>
              <li>
                type: <em>string</em> &mdash; (Required)<br />
                <ul>
                  <li>
                    Available types:
                    <ul>
                      <li>
                        <code>basic</code>
                      </li>
                      <li>
                        <code>contact</code>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>

            <dl className="code-sample">
              <h2 id="samples">Samples</h2>
              <br />

              <dt>
                <p className="message message--light">
                  <span>
                    <strong>Header</strong>
                  </span>
                </p>
                <p>The most simple use of the Header component.</p>
                <h3>Requirements:</h3>
                <ul>
                  <li>Header</li>
                  <li>Header.Label</li>
                </ul>
              </dt>
              <dd>
                <div className="cards">
                  <Header>
                    {() => (
                      <Header.Label label="Test Header Label" type="basic" />
                    )}
                  </Header>
                </div>
                <pre>
                  <code>
                    &lt;Header&gt;<br />
                    &nbsp;&nbsp;&#x7B;() =&gt; (<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;Header.Label label=&quot;Test
                    Header Label&quot; type=&quot;basic&quot; /&gt;<br />
                    &nbsp;&nbsp;)&#x7D;<br />
                    &lt;/Header&gt;
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

export default HeaderSamples;
