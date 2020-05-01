import React from 'react';
import PropTypes from 'prop-types';


// name length affecting spacing
// cancel button too far right, second line now
// issues with name+cancel button
const CancelButton = () => {
	return(
		<a className="cancel-button" >
    		<span className="icon has-text-grey">
			  <i className="fas fa-minus-circle"></i>
			</span>
    	</a>
	);
}

export const JoinStaffCard = ({name, phoneNumber, email, tickets, tenants, admin}) => {
	
	const InfoLabel = ({type}) => {
		if (type === "tickets"){
			return (
				<div className="info-font">
			    	<p className="number-font" >{tickets}</p> Open Tickets
			    </div>
			);
		} else if (type === "tenants") {
			return (
				<div className="info-font">
			    	<p className="number-font" >{tenants}</p> Tenants
			    </div>
			);
		}
	}

	const AdminLabel = () => {
		return (
			<div className="admin-label"> Admin </div>
		);
	}

	return (
		<>
			<div className="card card-length">
				<div className="name-spacing">
					<p className="name-font">
				    	{name}
				    </p>
				    <p className="cancel-spacing">
				    	{!admin && <CancelButton />}
				    </p>
				</div>
				<div className="card-content">
					{admin && <AdminLabel />}
				    <p className="info-font">
				    	{phoneNumber}
				    </p>
				    <p className="info-font">
				    	{email}
				    </p>
				    <div className="space"></div>
				    <p className="tiny-font">
				    	Set out of office
				    </p>
				    <hr className="card-divider" ></hr>
				    {tickets && <InfoLabel type="tickets" />}
				    {tenants && <InfoLabel type="tenants" />}
				    <a href='#' className="tiny-link" > Reassign </a>
				</div>
			</div>
			<div className="space"></div>
		</>
	);
}

JoinStaffCard.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  tickets: PropTypes.number,
  tenants: PropTypes.number,
  admin: PropTypes.bool,
}