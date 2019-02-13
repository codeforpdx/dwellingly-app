import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './Reports.scss';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

render() {

  return(
    <div className="admin page">
      <Header>
        {() => (
          <div>
            <Navigation />
            <Header.Label
              label="JOIN Messenger Administration"
              type="basic"
              />
          </div>
        )}
      </Header>
      <div>
        <div className="width-wrapper">
          <h2 className="admin--header align--left">
            Reports
          </h2>
        </div>
      </div>
    </div>
  )
}
}

export default Reports;
