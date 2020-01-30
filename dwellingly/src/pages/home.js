import React from 'react';
import dwellinglyLogo from '../assets/images/dwellingly.png'
import codeforpdxLogo from '../assets/codeforpdx/c4pdx.gif'

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <img src={dwellinglyLogo} className="" alt="dwellingly" />
                <img src={codeforpdxLogo} className="App-logo" alt="logo" />

                <a
                className="App-link"
                href="http://www.codeforpdx.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Code for PDX
                </a>
                <p>
                Community Built Civic Tech.
                </p>
            </>
        )
    }
}