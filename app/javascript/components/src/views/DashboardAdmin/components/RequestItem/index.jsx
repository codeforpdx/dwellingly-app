import React from 'react';
import './styles/index.scss';
import Button from "../../../components/Button";
import { useMediaQuery } from '@react-hook/media-query';
import { tabletWidth, desktopWidth } from '../../../../constants';

function RequestItem(props) {
    const { data, onDeclineClick, onAddClick } = props;
    const { firstName, lastName, email, id } = data;

    // This is a 3rd party hook that will provide React a true/false value
    // based on the logic of a traditional CSS media query.
    // From there you can conditionally render
    // based on the results.
    const isDesktop = useMediaQuery(`(min-width: ${desktopWidth})`);
    const isTablet = useMediaQuery(`(min-width: ${tabletWidth}) and (max-width: ${desktopWidth})`);

    const Buttons = () => (
        // Leave this div - Bulma column layout relies on it
        <div className={isDesktop ? "" : "buttons-mobile"}>
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
            <div>
                <div className="collapsible__col column is-one-quarter is-mobile name-col">{firstName} {lastName}</div>
                <div className="collapsible__col column is-mobile is-multiline">
                    <a href="#">{email}</a>
                </div>
                <div className="dashboard__collapsible_col collapsible__buttons is-multiline">
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
            <div className="dashboard__collapsible_col collapsible__buttons">
                <Buttons />
            </div>
        </div>
    )

    return isDesktop ? <DesktopLayout /> : isTablet ? <TabletLayout /> : <MobileLayout />    
}

export default RequestItem;