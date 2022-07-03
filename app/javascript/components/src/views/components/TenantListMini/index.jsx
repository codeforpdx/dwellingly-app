import React, { useState } from 'react';
import RemoveTenantButton from './components/RemoveTenantButton';
import Modal from '../../components/Modal/index';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from "react-router-dom";

const TenantListMini = (props) => {
  const { tenantList, handleTenantConfirmButton, isEditing } = props;
  const [confirmTenantRemoval, setConfirmTenantRemoval] = useState(false);
  const [tenantToRemove, setTenantToRemove] = useState('');

  const removeTenant = (tenant) => {
    setTenantToRemove(tenant);
    setConfirmTenantRemoval(true);
  }

  const handleConfirm = () => {
    handleTenantConfirmButton(tenantToRemove);
    setConfirmTenantRemoval(false);
  }

  const handleCancel = () => {
    setTenantToRemove('');
    setConfirmTenantRemoval(false);
  }

  const columns = [
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
  
  const editColumn = {
    dataField: "remove",
    text: "Remove",
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <RemoveTenantButton tenant={row} removeTenant={removeTenant} isEditing={isEditing} />
      )
    }
  }

  const noDataDisplay = (
    <p>Add tenants to this property by <Link to="/manage/tenants">editing a tenant's lease</Link>.</p>
  )

  return (
    <div>
      <BootstrapTable
        keyField='id'
        data={tenantList}
        columns={isEditing ? [...columns, editColumn] : columns}
        bootstrap4={true}
        headerClasses="table-header"
        noDataIndication={noDataDisplay}
      />
      {confirmTenantRemoval &&
        <Modal
          content={<p>{`Are you sure you want to remove ${tenantToRemove.fullName}?`}</p>}
          hasButtons={true}
          confirmButtonHandler={handleConfirm}
          closeHandler={() => {
            setConfirmTenantRemoval(false);
          }}
          cancelButtonHandler={() => handleCancel()}
          confirmText={"YES"}
          cancelText={"NO"}
        />
      }
    </div>
  )
};

export default TenantListMini;