import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { tabletWidth, desktopWidth } from '../../../../constants';

function NewStaffItem(props) {
    const { tenant, handleStaffAssignmentChange, staffList } = props;

    const isDesktop = useMediaQuery(`(min-width: ${desktopWidth})`);
    const isTablet = useMediaQuery(`(min-width: ${tabletWidth}) and (max-width: ${desktopWidth})`);

    const MobileLayout = () => (
        <div key={`mob-${tenant.id}`} className="collapsible__row">
            <div>
                <div className={`collapsible__col column is-one-quarter is-mobile  name-col`}>{`${tenant.firstName} ${tenant.lastName}`}</div>
                {tenant.propertyName ?
                    <div className="collapsible__col column is-mobile is-multiline">
                        {tenant.propertyName}<br />
                        {
                            tenant.propertyManagerNames.map((name) => (
                                <div key={`${tenant.id}-pm-${name}`}><span className="subtext">{name}</span><br /></div>
                            ))
                        }
                    </div>
                    : null}
                <div className="dashboard__collapsible_col collapsible__buttons is-multiline">
                    <div className="select is-rounded">
                        <select
                            onChange={e => handleStaffAssignmentChange(e, tenant.id)}
                            value={tenant.staffID || 'default'}
                        >
                            <option value='default' disabled>Staff Name</option>
                            {
                                staffList.map(({ id, firstName, lastName }) => (
                                    <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const TabletLayout = () => (
        <div key={`tab-${tenant.id}`} className="collapsible__row">
            <div>
                <div className={`collapsible__col column is-one-quarter name-col`}>{`${tenant.firstName} ${tenant.lastName}`}</div>
                <div className="collapsible__col column is-multiline">
                    {tenant.propertyName}<br />
                    {
                        tenant.propertyManagerNames.map((name) => (
                            <div key={`${tenant.id}-pm-${name}`}><span className="subtext">{name}</span><br /></div>
                        ))
                    }
                </div>
                <div className="dashboard__collapsible_col collapsible__buttons is-multiline">
                    <div className="select is-rounded">
                        <select
                            onChange={e => handleStaffAssignmentChange(e, tenant.id)}
                            value={tenant.staffID || 'default'}
                        >
                            <option value='default' disabled>Staff Name</option>
                            {
                                staffList.map(({ id, firstName, lastName }) => (
                                    <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const DesktopLayout = () => (
        <div key={`desktop-${tenant.id}`} className="collapsible__row columns">
            <div className={`collapsible__col column `}>{`${tenant.firstName} ${tenant.lastName}`}</div>
            <div className="collapsible__col column">
                {tenant.propertyName}<br />
                {
                    tenant.propertyManagerNames.map((name) => (
                        <div key={`${tenant.id}-pm-${name}`}><span className="subtext">{name}</span><br /></div>
                    ))
                }
            </div>
            <div className="dashboard__collapsible_col column ">
                <div className="select is-rounded">
                    <select
                        onChange={e => handleStaffAssignmentChange(e, tenant.id)}
                        value={tenant.staffID || 'default'}
                    >
                        <option value='default' disabled>Staff Name</option>
                        {
                            staffList.map(({ id, firstName, lastName }) => (
                                <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );

    return isDesktop ? <DesktopLayout /> : isTablet ? <TabletLayout /> : <MobileLayout />
}
export default NewStaffItem;
