import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import UserContext from '../App';
import * as axios from 'axios';



const columns = [{
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'address',
    text: 'Address'
  }, {
    dataField: 'price',
    text: 'Product Price'
  }];

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};


const getProperties = (context) => {
    axios.get('http://localhost:5000/properties', { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
    .then(function(response){
        return response;
    })
    .catch(function(error){
        alert(error);
    })
}

export class Properties extends Component {
    constructor(props) {
        super(props);
        console.log("constructor");
        console.log(props)
        
        this.state = {
        properties: [],
        }
    }    

    render() {
        console.log("this.context")
        console.log(this.context)
        const user = this.props.context;
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
                                {/* <BootstrapTable
                                    keyField='id'
                                    data={ this.state.properties }
                                    columns={ columns }
                                    selectRow={ selectRow }
                                    /> */}
                            </div>
                            
                        </div>
        )
    }
}

