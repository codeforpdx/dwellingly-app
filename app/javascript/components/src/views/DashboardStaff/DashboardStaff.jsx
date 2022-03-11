// One top level component to make API calls, determine window size and view
// Desktop

// Collapsible list of Properties in table format - component?
// Collapsible list of Tenants in table format - component?
// Collapsible list of Tickets in table format - component?

// Call /api/users/:id to get user info, properties, and tenants
// Call /api/tenants/:id per tenant for tickets assigned to tenant or create a new API for tickets by Property Manager
// -- going to have the same issue for JOIN Staff?


// Mobile
// Breakpoint at 960 width

// 3 tabs (component) - Properties, Tenants, Tickets

import React, { useState, useEffect, useContext } from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Collapsible from '../components/Collapsible';
import UserContext from '../../contexts/UserContext';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";
import { columns as propertyColumns, mobileColumns as propertyMobileColumns }
  from '../PropertyList/components/propertiesTableComponents';
import { formatDate } from '../../utils/date';

const tenantColumns = [
  {
    dataField: "fullName",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <Link key={row.fullName} to={`/manage/tenants/${row.id}`}>
          {row.fullName}
        </Link>
      );
    },
    text: "Tenants",
    sort: true,
  },
  {
    dataField: "lease.unitNum",
    text: "Unit",
    sort: true,
  },
  {
    dataField: "phone",
    text: "Phone",
    sort: true,
  },
];

const ticketColumns = [{
  dataField: 'id',
  text: 'Ticket',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'author',
  text: 'Sender',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'assigned',
  text: 'Assigned To',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'status',
  text: 'Status',
  sort: true,
  headerStyle: () => {
    return { width: "10%" };
  }
}, {
  dataField: 'created_at',
  text: 'Created',
  sort: true,
  headerStyle: () => {
    return { width: "15%" };
  }
}, {
  dataField: 'updated_at',
  text: 'Updated',
  sort: true,
  headerStyle: () => {
    return { width: "15%" };
  }
}];

const DashboardStaff = () => {
  const [tenants, setTenants] = useState([]);
  const [tickets, setTickets] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.apiCall('get', `/users/${userContext.user.id}`, {}, {})
      .then(({ data }) => {
        if (data) {
          setTenants(data.tenants);
        }
      });

    userContext.apiCall('get', '/tickets', {}, {})
      .then(({ data }) => {
        setTickets(data?.map(t => {
          return {
            ...t,
            created_at: formatDate(t.created_at),
            updated_at: formatDate(t.updated_at),
            assigned: t.assigned_staff?.map(as => `${as.firstName} ${as.lastName}`).join(', ')
          }
        }));
      });
  }, []);

  return (
    <div className="main-container">
      <div>
        <h2 className="page-title">{userContext.user.firstName} {userContext.user.lastName}</h2>
        <div className="section-container">
          <Collapsible
            title="Tickets"
            count={tickets?.length ?? 0}>
            <div>
              <BootstrapTable
                keyField='id'
                data={tickets}
                columns={ticketColumns}
                bootstrap4={true}
                headerClasses="table-header"
              />
            </div>
          </Collapsible>
        </div>
        <div className="section-container">
          <Collapsible
            title="Tenants"
            count={tenants?.length ?? 0}>
            <div>
              <BootstrapTable
                keyField='id'
                data={tenants}
                columns={tenantColumns}
                bootstrap4={true}
                headerClasses="table-header"
              />
            </div>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default DashboardStaff;