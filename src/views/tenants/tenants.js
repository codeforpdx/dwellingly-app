import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import UserContext from '../../UserContext';
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../components/Search/index";
import Toast from '../../utils/toast';
import { text } from '@fortawesome/fontawesome-svg-core';

const columns = [
  {
    dataField: "fullName",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <Link key={row.id} to={`/manage/tenants/${row.id}`}>
          {row.fullName}
        </Link>
      );
    },
    text: "Name",
    sort: true,
  },
  {
    dataField: "propertyName",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <Link key={row.lease.id} to={`/manage/properties/${row.lease.propertyID}`}>
          {row.propertyName}
        </Link>
      )
    },
    sort: true,
  },
  {
    dataField: `joinStaff`,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        row.staff.map((staff, index) =>
          <p key={index}>
            <Link key={row.id} to={`/staff`}>
              {`${staff.firstName} ${staff.lastName}`}
            </Link>
          </p>
        ))
    },
    text: "JOIN Staff",
    sort: true,
  },
  {
    dataField: "phone",
    text: "Phone",
    sort: true,
  },
];

const selectRow = {
  mode: "checkbox",
  clickToSelect: true,
  sort: true,
  headerColumnStyle: () => {
    return { width: "5%" };
  },
};

// const pageButtonRenderer = ({
//   page,
//   active,
//   disable,
//   title,
//   onPageChange
// }) => {
//   const handleClick = (e) => {
//     e.preventDefault();
//     onPageChange(page);
//   };
//   const activeStyle = {};
//   if (active) {
//     activeStyle.backgroundColor = 'black';
//     activeStyle.color = 'white';
//   } else {
//     activeStyle.backgroundColor = 'gray';
//     activeStyle.color = 'black';
//   }
//   if (typeof page === 'string') {
//     activeStyle.backgroundColor = 'white';
//     activeStyle.color = 'black';
//   }
//   return (
//     <li className="page-item">
//       <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
//     </li>
//   );
// };

// const options = {
//   pageButtonRenderer
// };

export class Tenants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenants: [],
      filteredTenants: [],
      isFiltered: false
    };

    this.getTenants = this.getTenants.bind(this);
  }

  setIsFilteredTenantsFalse = async () => {
    await this.setState({ isFiltered: false });
  };

  setOutputState = async (output, isTrue) => {
    await this.setState({
      filteredTenants: output,
      isFiltered: isTrue
    });

  };

  componentDidMount() {
    this.getTenants(this.context);
  }

  getTenants = async (context) => {

    let propertyResponse = await axios.get(`/api/properties`, {
      headers: { Authorization: `Bearer ${context.user.accessJwt} ` }
    })
    const properties = propertyResponse.data.properties

    let tenantResponse = await axios.get(`/api/tenants`, {
      headers: { Authorization: `Bearer ${context.user.accessJwt}` },
    })

    const tenants = tenantResponse.data.tenants.map(tenant => {
      if (tenant.lease) {
        const propertyIndex = properties.findIndex(property => property.id === tenant.lease.propertyID)
        tenant.propertyName = properties[propertyIndex].name
      }
      return tenant
    })

    this.setState({ tenants })


    // .catch((error) => {
    //   Toast(error.message, "error");
    //   console.log(error);
    // });

  };

  render() {
    return (
      <UserContext.Consumer>
        {session => {
          this.context = session;
          return (
            <div className='main-container'>
              <div>
                <div className="section-header">
                  <h2 className="page-title">Tenants</h2>
                  <Link className="button is-primary is-rounded ml-4" to="/add/tenant">+ ADD NEW</Link>
                </div>
                <div className="search-section">
                  <Search
                    input={this.state.tenants}
                    outputLocation={this.state.filteredTenants}
                    isFilteredLocation={this.state.isFiltered}
                    setIsFilteredStateFalse={this.setIsFilteredTenantsFalse}
                    setOutputState={this.setOutputState}
                    placeholderMessage="Search tenants by name, property, or JOIN staff" />
                </div>
                <div className="properties-list">
                  <BootstrapTable
                    keyField='id'
                    data={this.state.isFiltered === true ? this.state.filteredTenants : this.state.tenants}
                    columns={columns}
                    selectRow={selectRow}
                    bootstrap4={true}
                    headerClasses="table-header"
                    classes="table-responsive"
                    defaultSortDirection="asc"
                  />
                </div>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}
