import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import NoMatch from '../NoMatch';
import { DashboardAdmin } from "./DashboardAdmin";
import DashboardPropertyManager from "./DashboardPropertyManager/DashboardPropertyManager";
import DashboardStaff from "./DashboardStaff/DashboardStaff";
import DashboardPropertyManagerMobile from "./DashboardPropertyManager/DashboardPropertyManagerMobile";
import DashboardStaffMobile from "./DashboardStaff/DashboardStaffMobile";
import { useMediaQuery } from '@react-hook/media-query';
import { tabletWidth } from '../../constants';

const Dashboard = () => {
    const context = useContext(UserContext);
    const isMobile = useMediaQuery(`(max-width: ${tabletWidth})`);
    
    const { admin, staff, property_manager } = context.user;
    let comp = <NoMatch />;
    if (property_manager) {
        comp = isMobile ? <DashboardPropertyManagerMobile /> : <DashboardPropertyManager />
    } else if (staff) {
        comp = isMobile ? <DashboardStaffMobile /> : <DashboardStaff />;
    } else if (admin) {
        comp = <DashboardAdmin />;
    }
    return comp;
}

export default Dashboard;