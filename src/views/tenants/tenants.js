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

const archiveButtonRender = ({ selectedRows }) =>{
  if(selectedRows.length > 0){
    return(
      <button className="button is-danger is-rounded ml-4" >Archive Tenant</button>
      )
  }
}

export class Tenants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenants: [],
      selectedRows: [],
    };

    this.getTenants = this.getTenants.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
  }

  handleArchiveClick= () =>{
    const { selectedRows } = this.state;
    axios
    .delete(`/api/tenants/multiple`, {
      headers: { Authorization: `Bearer ${this.context.user.accessJwt}` },
      tenant_ids: selectedRows 
    })
    .then((response) => {
      if(response === 200){
        console.log("eff em")
      }
      const tenants = response.data.tenants;
      this.setState({ tenants });
    })
    .catch((error) => {
      Toast(error.message, "error");
      console.log(error);
    });
  }

  onRowSelect(rowId){
    const { selectedRows } = this.state;
    
    if (selectedRows.includes(rowId)){
      var i= selectedRows.indexOf(rowId);
      if (i > -1) {
        selectedRows.splice(i, 1);
      }
    }else{
      selectedRows.push(rowId)
    }
    console.log(selectedRows)
  }

  onRowSelectAll(rows){
    const { selectedRows } = this.state;
    if(rows.length === selectedRows.length && selectedRows.length > 0 ){
      selectedRows.splice(0,selectedRows.length)
      console.log("reset")
    } else {
      rows.forEach(row => {
        console.log(row.id)
        selectedRows.push(row.id)
      });
    }
   
    console.log(selectedRows)
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
        Toast(error.message, "error");
        console.log(error);
      });
  };

  render() {
    // this.state.selectRow.onSelect = (row, isSelect, rowIndex, e) => {
    //   console.log("execute function")
    //   this.onRowSelect(row.id)
    // }
    
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      sort: true,
      onSelect: (row) => {
        this.onRowSelect(row.id)
      },
      onSelectAll: (isSelect, rows, e) => {
        this.onRowSelectAll( rows )
      },
      headerColumnStyle: () => {
        return { width: "5%" };
      } 
    }

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
                <button className="button is-danger is-rounded ml-4" onClick={this.handleArchiveClick} >Archive Tenant</button>
              
              </div>
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
