import React from 'react';
import './requestItem.scss';
import Button from "../Button";

function RequestItem(props) {
    const { data, onDeclineClick, onAddClick } = props;
    const { firstName, lastName, email, id } = data;
    return (
        <div className="collapsible__row columns">
            <div className="collapsible__col column">{firstName} {lastName}</div>
            <div className="collapsible__col column">
                <a href="#">{email}</a>
            </div>
            <div className="dashboard__colapsible_col collapsible__buttons">
                <Button
                    isCancelButton={false}
                    type={"submit"}
                    disabledFlag={false}
                    isValidFlag={true}
                    onClick={() => { onAddClick(id) }}
                >
                    ADD
                </Button>
                <Button
                    isCancelButton={true}
                    type={"reset"}
                    onClick={() => { onDeclineClick(id) }}
                >
                    DECLINE
                </Button>
            </div>
        </div>
    )
}

export default RequestItem;