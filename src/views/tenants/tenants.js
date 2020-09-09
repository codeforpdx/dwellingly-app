import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import UserContext from '../../UserContext';
import axios from "axios";
import { Link } from "react-router-dom"
import Search from "../../components/Search/index";
import Toast from '../../utils/toast';

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
    text: "Property",
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
    };

    this.getTenants = this.getTenants.bind(this);
  }

  componentDidMount() {
    this.getTenants(this.context);
  }

  getTenants = (context) => {
    axios
      .get(`/api/tenants`, {
        headers: { Authorization: `Bearer ${context.user.accessJwt}` },
      })
      .then((response) => {
        const tenants = response.data.tenants;
        this.setState({ tenants });
      })
      .catch((error) => {
        Toast(error, "error");
        console.log(error);
      });
  };

  render() {
    return (
      <UserContext.Consumer>
        {session => {
          this.context = session;
          return (
            <div>
              <div className="section-header">
                <h2 className="page-title">Tenants</h2>
                <Link className="button is-primary is-rounded ml-4" to="/add/tenant">+ ADD NEW</Link>
              </div>
              <div className="search-section">
                <Search placeholderMessage="Search tenants by name, property, or JOIN staff" />
              </div>
              <div className="properties-list">
                <BootstrapTable
                  keyField='id'
                  data={this.state.tenants}
                  columns={columns}
                  selectRow={selectRow}
                  bootstrap4={true}
                  headerClasses="table-header"
                  classes="table-responsive"
                />
              </div>
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
