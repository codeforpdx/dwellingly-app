import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from '../../contexts/UserContext';
import * as Yup from "yup";
import ToggleEditForm from "../components/ToggleEditForm";
import InfoCard from "../components/InfoCard";
import Modal from '../components/Modal';
import TenantListMini from "../components/TenantListMini";
import PropertyManagerSearchPanel from "../components/PropertyManagerSearchPanel";

const validationSchema = Yup.object().shape({
  propertyName: Yup.string()
    .max(255, "*Must be shorter than 255 Characters")
    .required("*Must enter Property Name"),
  propertyAddress: Yup.string()
    .max(255, "*Must be shorter than 255 Characters")
    .required("*Address is required"),
  propertyUnits: Yup.string()
    .min(
      0,
      "*Property must contain at least 1 unit",
    )
    .max(3, "*Numbers can't be longer than 3 digits")
    .required("*Number of units is required"),
});

const EditProperty = () => {
  const userContext = useContext(UserContext);

  const { id } = useParams();
  const propertyId = id;

  const [isEditing, setEditingStatus] = useState(false);
  const [property, setProperty] = useState('');
  const [inputValues, setInputValues] = useState();
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [propertyManagerSelections, setPropertyManagerSelections] = useState([]);

  const handleEditToggle = () => setEditingStatus(!isEditing);

  const onCancelClick = () => {
    setEditingStatus(false);
    getProperty();
  };

  useEffect(() => {
    getProperty()
  }, []);

  const getProperty = () => {
    userContext.apiCall('get', `/properties/${propertyId}`, {}, {})
      .then(propertyResponse => {
        var property = propertyResponse.data;
        setProperty(property)
        setInputValues(property)
      });
  }

  const onFormikSubmit = (values, { setSubmitting }) => {
    const newValues = {
      name: values.propertyName,
      address: values.propertyAddress,
      city: values.propertyCity,
      state: values.propertyState,
      zipcode: values.propertyZipcode,
      num_units: values.propertyUnits,
    };
    let payload = {
      ...newValues,
      propertyManagerIDs: propertyManagerSelections.map(pm => pm.key)
    };
    setSubmitting(true);
    userContext.apiCall('put', `/properties/${property.id}`, payload, { success: "Save successful!" })
      .then(response => {
        const property = response.data;

        setProperty(property);
        setInputValues(property);
        setEditingStatus(false);
        setSubmitting(false);
      });
    setConfirmChange(true);
  };

  const handleTenantRemoveButton = (tenantToRemove) => {
    const leaseId = tenantToRemove.lease.id;
    userContext.apiCall('delete', `/leases/${leaseId}`,
      {}, { success: 'Tenant successfully removed' })
      .then(() => {
        getProperty();
      });
  }

  const handleArchive = (archived) => {
    return archived ? unarchiveProperty : archiveProperty
  }

  const archiveProperty = () => {
    updateProperty({ archived: true }, "Property archived successfully")
  }

  const unarchiveProperty = () => {
    updateProperty({ archived: false }, "Property unarchived successfully")
  }

  const displayArchiveModal = () => {
    setShowArchiveModal(true)
  }

  const hideArchiveModal = () => {
    setShowArchiveModal(false)
  }

  const getTableData = [
    {
      key: "propertyName",
      label: "Name",
      value: property.name,
      inputType: "text",
    },
    {
      key: "propertyAddress",
      label: "Address",
      value: property.address,
      inputType: "text",
    },
    {
      key: "propertyCity",
      label: "City",
      value: property.city,
      inputType: "text",
    },
    {
      key: "propertyState",
      label: "State",
      value: property.state,
      inputType: "text",
    },
    {
      key: "propertyZipcode",
      label: "Zip Code",
      value: property.zipcode,
      inputType: "text",
    },
    {
      key: "propertyUnits",
      label: "Units",
      value: property.num_units,
      inputType: "text",
    }
  ]

  return (
    <div className='main-container'>
      <div>
        {property && (
          <div>
            <div className="title__container">
              <h2>
                {property.name}
              </h2>
              {!property.archived &&
                <button
                  className={`rounded${isEditing ? "--is-editing" : ""}`}
                  onClick={handleEditToggle}
                  disabled={isEditing}
                >
                  <i className="fas fa-pen icon" />
                </button>}
              {(!property.archived && isEditing) && <button
                className="button is-primary is-rounded"
                onClick={displayArchiveModal}
                style={{ padding: "1em", marginLeft: "14px", fontSize: "12px" }}>
                <i className="fas fa-archive icon-inline-space"></i>
                ARCHIVE
              </button>}
              {property.archived && <button
                className="button is-primary is-rounded"
                onClick={displayArchiveModal}
                style={{ padding: "1em", marginLeft: "14px", fontSize: "12px" }}>
                <i className="fas fa-undo icon-inline-space"></i>
                UNARCHIVE
              </button>}
            </div>
            <div className="section-container">
              <h2 className="section-title">PROPERTY INFORMATION</h2>
            </div>
            <ToggleEditForm
              tableData={getTableData}
              validationSchema={validationSchema}
              isEditing={isEditing}
              submitHandler={onFormikSubmit}
              cancelHandler={onCancelClick}
            >
              <div className="section-container">
                <h2 className="section-title">PROPERTY MANAGERS</h2>
              </div>
              {isEditing &&
                <PropertyManagerSearchPanel
                  initialManagerIds={property.propertyManagers ?
                    property.propertyManagers.map(manager => { return manager.id })
                    : []}
                  managerSelections={propertyManagerSelections}
                  setManagerSelections={setPropertyManagerSelections}
                  multiSelect={true}
                />}
              <div>
                {property.propertyManagers && !isEditing &&
                  property.propertyManagers.map(manager => {
                    return <InfoCard
                      title={`${manager.firstName} ${manager.lastName}`}
                      descriptionOne={manager.phone}
                      descriptionTwo={manager.email}
                      link={`/manage/managers/${manager.id}`}
                    />
                  })}
              </div>
            </ToggleEditForm>

            <div>
              <div className="section-container">
                <h2 className="section-title">TENANTS</h2>
                <TenantListMini
                  isEditing={isEditing}
                  tenantList={property?.tenants}
                  handleTenantConfirmButton={handleTenantRemoveButton}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {showArchiveModal &&
        <Modal
          content={
            <div>
              <p>Are you sure you want to {property.archived ? "unarchive" : "archive"} {property.name}?</p>
            </div>
          }
          hasButtons={true}
          hasRedirectButton={false}
          confirmButtonHandler={handleArchive(property.archived)}
          confirmText="Yes"
          cancelButtonHandler={hideArchiveModal}
          cancelText="No"
          closeHandler={hideArchiveModal}
        />}
    </div>
  )
}
export default EditProperty;
