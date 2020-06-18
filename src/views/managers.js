import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import * as axios from "axios";
import { PROPERTY_MANAGER_DATA } from "./dummyData/pManagerData";

const columns = [
	{
		dataField: "fullName",
		formatter: (cell, row, rowIndex, formatExtraData) => {
			return <Link to={`manage/manager/${row.id}`}>{row.fullName}</Link>;
		},
		text: "Name",
		sort: true,
		headerStyle: () => {
			return { width: "20%" };
		},
	},
	{
		dataField: "properties",
		formatter: (cell, row, rowIndex, formatExtraData) => {
			return <ul>
				{row.properties.map(property => <li>{property}</li>)}
			</ul>
		},
		text: "Properties",
		sort: true,
		headerStyle: () => {
			return { width: "20%" };
		},
	},
	{
		dataField: "email",
		text: "Email",
		sort: true,
		headerStyle: () => {
			return { width: "20%" };
		},
	},
	{
		dataField: "status",
		text: "Status",
		sort: true,
		headerStyle: () => {
			return { width: "10%" };
		},
	},
	{
		dataField: "lastUsage",
		text: "Last Usage",
		sort: true,
		headerStyle: () => {
			return { width: "10%" };
		},
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

export class Managers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			properties: [],
		};

		this.getProperties = this.getProperties.bind(this);
	}

	componentDidMount() {
		this.getProperties(this.context);
	}

	getProperties = (context) => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/properties`, {
				headers: { Authorization: `Bearer ${context.user.accessJwt}` },
			})
			.then((response) => {
				this.setState({ properties: response.data.properties });
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	render() {
		return (
			<UserContext.Consumer>
				{(session) => {
					this.context = session;
					return (
						<div className="properties__container">
							<div className="section-header">
								<h2 className="page-title">Properties</h2>
								<Link className="button is-rounded" to="/add/property">
									+ ADD NEW
								</Link>
							</div>
							<div className="search-section">
								<input></input>
							</div>
							<div className="properties-list">
								<BootstrapTable
									keyField="id"
									data={PROPERTY_MANAGER_DATA}
									columns={columns}
									selectRow={selectRow}
									bootstrap4={true}
									headerClasses="table-header"
								/>
							</div>
						</div>
					);
				}}
			</UserContext.Consumer>
		);
	}
}
