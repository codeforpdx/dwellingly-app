import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { UserContext } from '../App';
import * as axios from 'axios';

const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'manager',
    text: 'Property Managers',
    sort: true
  }, {
    dataField: 'address',
    text: 'Address',
    sort: true
  }, {
    dataField: 'address',
    text: 'Tenants',
    sort: true
  }, {
    dataField: 'created',
    text: 'Added On',
    sort: true
  }];

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  sort: true
};


export class Properties extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        properties: [],
        }

        this.getProperties = this.getProperties.bind(this)
    }    

    componentDidMount() {
        this.getProperties(this.context);
    }

    getProperties = (context) => {
        axios.get('http://localhost:5000/properties', { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
        .then((response) => {
            this.setState({properties: response.data.properties});
        })
        .catch((error) => {
            alert(error);
            console.log(error);
        })
    }

    render() {
        return (
            <UserContext.Consumer>
                {session => {
                    this.context = session;
                    return (
                        <div className="properties__container">
                            <div className="section-header">
                                <h2 className="page-title">Properties</h2>
                                <button className="button is-rounded" onClick={()=>{console.log("cancel pressed")}}>+ ADD NEW</button>
                            </div>
                            <div className="search-section">
                                <input></input>
                            </div>
                            <div className="properties-list">
                                <BootstrapTable
                                    keyField='id'
                                    data={ this.state.properties }
                                    columns={ columns }
                                    selectRow={ selectRow }
                                    bootstrap4={true}
                                    headerClasses="table-header"
                                    />
                            </div>
                            
                        </div>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}
