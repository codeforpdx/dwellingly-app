import React from 'react';
import './requestItem.scss';
import Button from "../Button";
import { useMediaQuery } from 'react-responsive';

function RequestItem(props) {
    const { data, onDeclineClick, onAddClick } = props;
    const { firstName, lastName, email, id } = data;

    // This is a 3rd party hook that will provide React a true/false value
    // based on the logic of a traditional CSS media query.
    // From there you can conditionally render
    // based on the results.
    const isDesktop = useMediaQuery({ minWidth: 1000 })
    const isTablet = useMediaQuery({ minWidth: 550, maxWidth: 999 })

    const Buttons = () => (
        // Leave this div - Bulma column layout relies on it
        <div className={isDesktop ? "buttons-desktop" : "buttons-mobile"}>
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
    )

    const MobileLayout = () => (
        <div className="collapsible__row">
            <div className="columns">
            <div className="collapsible__col column is-one-quarter is-mobile name-col">{firstName} {lastName}</div>
            <div className="collapsible__col column is-mobile is-multiline">
                <a href="#">{email}</a>
            </div>
            <div className="dashboard__colapsible_col collapsible__buttons is-multiline">
                <Buttons />
            </div>
            </div>
        </div>
    )

    const TabletLayout = () => (
        <div className="collapsible__row">
            <div className="collapsible__col column is-one-quarter name-col">{firstName} {lastName}</div>
            <div className="collapsible__col column is-multiline">
                <a href="#">{email}</a>
                <Buttons />
            </div>
        </div>
    )

    const DesktopLayout = () => (
        <div className="collapsible__row columns">
            <div className="collapsible__col column is-mobile name-col">{firstName} {lastName}</div>
            <div className="collapsible__col column is-mobile">
                <a href="#">{email}</a>
            </div>
            <div className="collapsible__col column is-mobile">
                <Buttons />
            </div>
        </div>
    )

    return isDesktop ? <DesktopLayout /> : isTablet ? <TabletLayout /> : <MobileLayout />    
}

export default RequestItem;