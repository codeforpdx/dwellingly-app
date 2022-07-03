import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import ToggleEditForm from "../components/ToggleEditForm";
import { useCalendarState } from "../components/CalendarModal";
import Modal from '../components/Modal';
import { TenantTickets } from './components/tenantTickets'
import PropertySearchPanel from "../components/PropertySearchPanel";
import JoinStaffSearchPanel from "../components/JoinStaffSearchPanel";

// Configure validation schema for edit form
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, "*Must be shorter than 255 Characters")
    .required("*Must enter a First Name"),
  lastName: Yup.string()
    .max(255, "*Must be shorter than 255 Characters")
    .required("*Must enter a Last Name"),
  phone: Yup.string()
    .min(
      5,
      "*Number must contain at least 5 digits to be a valid phone/text number",
    )
    .max(20, "*Numbers can't be longer than 20 digits")
    .required("*A valid phone number is required"),
});

const EditTenant = () => {
  // Get input tenant id
  const { id } = useParams();
  const context = useContext(UserContext);

  const [tenant, setTenant] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditing, setEditingStatus] = useState(false);
  const [staffSelections, setStaffSelections] = useState(null);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const calendarState = useCalendarState(tenant?.lease?.dateTimeStart, tenant?.lease?.dateTimeEnd)

  const tabs = [
    { id: "Ongoing", label: "Ongoing" },
    { id: "Closed", label: "Closed" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [ticketList, setTicketList] = useState();

  /**
   * Handle activating edit form
   */
  const handleEditToggle = () => setEditingStatus(!isEditing);

  const onFormikSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    if (_nothingHasChanged(values, tenant)) {
      setSubmitting(false);
      setEditingStatus(false);
      return;
    }

    context.apiCall('put', `/tenants/${id}`, values, { success: 'Tenant updated successfully!' })
      .then((response) => {
        setTenant({
          ...tenant,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone
        });
        setSubmitting(false);
        setEditingStatus(false);
      });
  };

  const _nothingHasChanged = (newValues, oldValues) => {
    return (
      newValues.firstName === oldValues.firstName &&
      newValues.lastName === oldValues.lastName &&
      newValues.phone === oldValues.phone
    );
  };

  /**
   * Handle press cancel button
   */
  const onCancelClick = () => {
    setEditingStatus(false);
  };

  /**
   * Get a tenant
   */
  const getTenant = () => {
    context.apiCall('get', `/tenants/${id}`, {}, {})
      .then(({ data }) => {
        setTenant(data);
        setTicketList(data.tickets?.map(t => {
          return {
            ...t,
            assigned: t.assigned_staff?.map(as => `${as.firstName} ${as.lastName}`).join(',\n')
          }
        }));
      });
  };

  /**
   * When component mounts, get tenant.
   */
  useEffect(() => {
    getTenant();
  }, []);

  /**
   * Configure edit table
   */
  const getTableData = () => [
    {
      key: "firstName",
      label: "First Name",
      value: tenant.firstName,
      inputType: "text",
    },
    {
      key: "lastName",
      label: "Last Name",
      value: tenant.lastName,
      inputType: "text",
    },
    {
      key: "phone",
      label: "Phone",
      value: tenant.phone,
      inputType: "text",
    },
    // {
    //   key: "address",
    //   label: "Property",
    //   value: property
    //     ? `${property.address}, ${property.city},` + ` ${property.state}, ${property.zipcode}`
    //     : "Unhoused Tenant",
    //   inputType: "text",
    //   readOnly: true,
    // },
    // {
    //   key: "unitNum",
    //   label: "Unit",
    //   value: (tenant.lease)
    //     ? tenant.lease.unitNum
    //     : "",
    //   inputType: "text",
    // },
    // {
    //   key: "lease",
    //   label: "Lease",
    //   value: (tenant.lease.dateTimeStart && tenant.lease.dateTimeEnd)
    //     ? {
    //       dateTimeStart: new Date(tenant.lease.dateTimeStart),
    //       dateTimeEnd: new Date(tenant.lease.dateTimeEnd),
    //     }
    //     :	"Not Applicable",
    //   inputType: (tenant.lease)
    //     ? "calendar"
    //     : "text",
    // }
  ];

  const toggleArchiveModal = () => {
    setShowArchiveModal(!showArchiveModal);
  };

  const toggleArchiveState = () => {
    tenant.archived ? unarchiveTenant() : archiveTenant();
  }

  const archiveTenant = () => {
    context.apiCall('put', `/tenants/${id}`, { archived: true }, { success: 'Tenant archived successfully!' })
      .then((response) => {
        setTenant(response.data);
        setShowArchiveModal(false);
        setEditingStatus(false);
      });
  }

  const unarchiveTenant = () => {
    context.apiCall('put', `/tenants/${id}`, { archived: false }, { success: "Tenant unarchived successfully!" }, {})
      .then((response) => {
        setTenant(response.data);
        setShowArchiveModal(false);
        setEditingStatus(false);
      });
  }

  return (
    <div className='main-container'>
      <div>
        {tenant && (
          <div>
            <div className="title__container">
              <h2>
                {tenant.firstName}
                {" "}
                {tenant.lastName}
              </h2>
              {!tenant.archived && <button
                className={`rounded${isEditing ? "--is-editing" : ""}`}
                onClick={handleEditToggle}
                disabled={isEditing}
              >
                <i className="fas fa-pen icon" />
              </button>}
              {(!tenant.archived && isEditing) && <button
                className="button is-primary is-rounded"
                onClick={toggleArchiveModal}
                style={{ padding: "1em", marginLeft: "14px", fontSize: "12px" }}>
                <i className="fas fa-archive icon-inline-space"></i>
                ARCHIVE
              </button>}
              {tenant.archived && <button
                className="button is-primary is-rounded"
                onClick={toggleArchiveModal}
                style={{ padding: "1em", marginLeft: "14px", fontSize: "12px" }}>
                <i className="fas fa-undo icon-inline-space"></i>
                UNARCHIVE
              </button>}
            </div>

            <div className="section-container">
              <h2 className="section-title">CONTACT</h2>
              <ToggleEditForm
                tableData={getTableData()}
                validationSchema={validationSchema}
                isEditing={isEditing}
                submitHandler={onFormikSubmit}
                cancelHandler={onCancelClick}
                calendarState={calendarState}
              >
                <div className="section-container">
                  <h2>PROPERTY</h2>
                  {isEditing && <PropertySearchPanel
                    initialPropertyIds={[tenant?.lease?.property_id]}
                    propertySelections={selectedProperty}
                    setPropertySelection={setSelectedProperty}
                    multiSelect={false}
                    showAddPropertyButton={false}
                    />}
                </div>
                <div className="section-container">
                  <h2>JOIN STAFF</h2>
                  {isEditing &&
                  <JoinStaffSearchPanel
                    initialStaffIds={tenant.staff}
                    staffSelections={staffSelections}
                    setStaffSelections={setStaffSelections}
                    multiSelect={true}
                  />}
                </div>
              </ToggleEditForm>
            </div>

            <div className="section-container">
              <h2>TICKETS</h2>
              <div className="tabs">
                <ul>
                  {tabs.map((tab) => (
                    <li key={tab.id} className={activeTab === tab.id ? "is-active" : ""}>
                      <a onClick={() => setActiveTab(tab.id)}>{tab.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <TenantTickets
                tenant_id={id}
                ticketList={ticketList}
                setTicketList={setTicketList}
                activeTab={activeTab}
              />
            </div>
          </div>
        )}
      </div>
      {showArchiveModal &&
        <Modal
          content={
            <div>
              <p>Are you sure you want to {tenant.archived ? "unarchive" : "archive"} {tenant.firstName} {tenant.lastName}?</p>
            </div>
          }
          hasButtons={true}
          hasRedirectButton={false}
          confirmButtonHandler={toggleArchiveState}
          confirmText="Yes"
          cancelButtonHandler={toggleArchiveModal}
          cancelText="No"
          closeHandler={toggleArchiveModal}
        />}
    </div>
  );
};

export default EditTenant;
