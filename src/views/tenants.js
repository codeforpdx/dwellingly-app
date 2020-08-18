import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import UserContext from '../UserContext';
import { Link } from "react-router-dom"

const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'property',
    text: 'Property',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'address',
    text: 'Join Staff',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'tenants',
    text: 'Added On',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
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
        }

        // this.getTenants = this.getTenants.bind(this)
    }    

    componentDidMount() {
        // this.getTenants(this.context);
    }

    // getTenants = (context) => {
    //     axios.get(`${process.env.REACT_APP_API_URL}/api/tenants`, { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
    //     .then((response) => {
    //         this.setState({properties: response.data.properties});
    //     })
    //     .catch((error) => {
    //         alert(error);
    //         console.log(error);
    //     })
    // }

    render() {
      return (
          <UserContext.Consumer>
              {session => {
                  this.context = session;
                  return (
                      <div className="properties__container">
                          <div className="section-header">
                              <h2 className="page-title">Tenants</h2>
                              <Link className="button is-rounded" to="/add/tenant">+ ADD NEW</Link>
                          </div>
                          <div className="search-section">
                              <input className="input search is-rounded" placeholder="Search Tenants by name, property, or JOIN staff"></input>
                            </div>
                          <div className="properties-list">
                              <BootstrapTable
                                  keyField='id'
                                  data={ this.state.tenants }
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
