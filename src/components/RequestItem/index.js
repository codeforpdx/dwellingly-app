import React from 'react';
import './requestItem.scss';

function RequestItem(props) {
    const {data, onDeclineClick, onAddClick} = props;
    const {name,email,phone, id} = data;
    return (
        <div className="collapsible__row columns">
            <div className="collapsible__col column">{name}</div>
            <div className="collapsible__col column">
                <a href="">{email}</a>
            </div>
            <div className="collapsible__col column">{phone}</div>
            <div className="dashboard__colapsible_col collapsible__buttons">
                <button className="button is-primary is-rounded" onClick={()=>{onAddClick(id)}}>ADD</button>
                <button className="button is-dark is-rounded" onClick={()=>{onDeclineClick(id)}}>DECLINE</button>
            </div>
        </div>
    )
}

export default RequestItem;