import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import UserContext from '../UserContext';
import { Link } from "react-router-dom"
import * as axios from 'axios';
import Search from '../components/Search';

const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'propertyManager',
    text: 'Property Managers',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'address',
    text: 'Address',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'totalTenants',
    text: 'Tenants',
    sort: true,
    headerStyle: () => {
      return { width: "10%" };
    }
  }, {
    dataField: 'dateAdded',
    text: 'Added On',
    sort: true,
    headerStyle: () => {
      return { width: "10%" };
    }
}];

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  sort: true,
  headerColumnStyle: () => {
    return { width: "5%" };
  }
};

export class Properties extends Component {
    constructor(props) {
        super(props);

        this.state = {
        properties: [],
        filteredProperties: [],
        isFiltered: false
        }

        this.getProperties = this.getProperties.bind(this)
    }

    setIsFilteredPropertiesFalse = async () => {
      await this.setState({isFiltered: false});
    }

    setOutputState = async (output, isTrue) => {
      await  this.setState({
              filteredProperties: output,
              isFiltered: isTrue
              });
    }

    componentDidMount() {
        this.getProperties(this.context);
    }

    getProperties = (context) => {
        axios.get("/api/properties", { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
        .then((response) => {
            const { data : { properties } }  = response;
            properties.forEach( property => property.totalTenants = property.tenantIDs.length )
            this.setState({properties: properties});
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
                        <div>
                            <div className="section-header">
                                <h2 className="page-title">Properties</h2>
                                <Link className="button is-rounded" to="/add/property">+ ADD NEW</Link>
                            </div>

                            <Search
                              input={this.state.properties} outputLocation={this.state.filteredProperties}
                              isFilteredLocation={this.state.isFiltered}
                              setIsFilteredStateFalse={this.setIsFilteredPropertiesFalse}
                              setOutputState={this.setOutputState}
                              placeholderMessage="Search properties by name, address, or property manager"
                              />

                            <div className="properties-list">
                                <BootstrapTable
                                    keyField='id'
                                    data={ this.state.isFiltered === true ? this.state.filteredProperties : this.state.properties }
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
