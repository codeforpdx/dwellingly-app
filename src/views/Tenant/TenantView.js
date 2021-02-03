import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import UserContext from "../../UserContext";
import * as axios from "axios";
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import ToggleEditTable from "../../components/ToggleEditTable";
import RoleEnum from '../../Enums/RoleEnum.js';
import Toast from '../../utils/toast';
import { useCalendarState } from "../../components/CalendarModal/CalendarModal";

// Configure validation schema for edit form
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter a First Name"),
  lastName: Yup.string()
    .max(255, "Must be shorter than 255 Characters")
    .required("Must enter a Last Name"),
  phone: Yup.string()
    .min(
      5,
      "*Number must contain at least 5 digits to be a valid phone/text number",
    )
    .max(20, "*Numbers can't be longer than 20 digits")
    .required("*a valid phone number is required"),
});

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

const Tenant = () => {
  // Get input tenant id
  const { id } = useParams();
  const context = useContext(UserContext);

  const initialState = {
    tenant: null,
    property: null,
    tickets: null,
  };

  const [state, setState] = useState(initialState);
  const [isEditing, setEditingStatus] = useState(false);
  const [staffSearchText, setStaffSearchText] = useState("");
  const [staffSearchResults, setStaffSearchResults] = useState([]);
  const [staffSelections, setStaffSelections] = useState(null);

  const calendarState = useCalendarState(state.property?.dateTimeStart, state.property?.dateTimeEnd)
  const { dateTimeStart, dateTimeEnd } = calendarState

  const tabs = [
    { id: "Ongoing", label: "Ongoing" },
    { id: "Closed", label: "Closed" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Error handler for axios requests
  const axiosErrorHandler = (error) => {
    Toast(error.message, "error");
    return Promise.reject({ ...error });
  };

  // Handle axios errors
  const client = axios.create(makeAuthHeaders(context));
  client.interceptors.response.use(
    success => success,
    error => axiosErrorHandler(error)
  );

  /**
   * Handle activating edit form
   */
  const handleEditToggle = () => setEditingStatus(!isEditing);


  const onFormikSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    if (_nothingHasChanged(values, state.tenant)) {
      setSubmitting(false);
      setEditingStatus(false);
      return;
    }

    axios
      .put(`/api/tenants/` + id, values, makeAuthHeaders(context))
      .then((response) => {
        Toast("Tenant Updated Successfully!", "success");
        setState({
          ...state, 
          tenant: {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone,
          }
        });
        setSubmitting(false);
        setEditingStatus(false);
      })
      .catch((error) => {
        Toast(error.message, "error");
        console.log(error);
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
   * Convert an array of staff to an array of SearchPanelItems
   * @param {*} staffArray
   */
  const getStaffChoices = (staffArray) => {
    const staffChoices = [];
    if (staffArray && Array.isArray(staffArray)) {
      staffArray.forEach((staff) => {
        const name = `${staff.firstName} ${staff.lastName}`;
        const staffChoice = { key: staff.id, description: name };
        staffChoices.push(staffChoice);
      });
    }
    return staffChoices;
  };

  /**
   * Get a tenant
   */
  const getTenant = async () => {
    const tenantResponse = await client.get(`/api/tenants/${id}`);
    const tenant = tenantResponse.data;
<<<<<<< HEAD
    console.log(tenant.propertyName)
    const propertyUrl = `/api/properties/${tenant.propertyName}`;
    const propertyResponse = await client.get(propertyUrl);
    const property = propertyResponse.data;
=======
    let property;
    if( tenant.lease ) {
      const propertyUrl = `/api/properties/${tenant.lease.propertyID}`;
      const propertyResponse = await client.get(propertyUrl);
      property = propertyResponse.data;
    }
>>>>>>> 8c42d99d62a56bcf2cb2825c8de42fd4e533955d
    const ticketsResponse = await client.get(`/api/tickets?tenant=${tenant.id}`);
    const tickets = ticketsResponse.data;
    setState({ tenant, property, tickets });

    const currentStaff = getStaffChoices(tenant.staff);

    setStaffSelections(currentStaff);
  };

  /**
   * When component mounts, get tenant.
   */
  useEffect(() => {
    getTenant();
  }, []);

  const { tenant } = state;
  const { property } = state;

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
    {
      key: "address",
      label: "Property",
      value: `${property.address}, ${property.city}, ${property.state}, ${property.zipcode}`,
      inputType: "text",
      comp: <div />,
      readOnly: true,
    },
    {
      key: "unitNum",
      label: "Unit",
      value: tenant.lease && tenant.lease.unitNum,
      inputType: "text",
      comp: <div />,
      readOnly: true,
    },
    {
      key: "lease",
      label: "Lease",
      value: {
        dateTimeStart: property.dateTimeStart || new Date(),
        dateTimeEnd: property.dateTimeEnd || new Date()
      },
      inputType: "calendar",
      readOnly: true,
    }
  ];

  const STAFF_USER_ROLE = RoleEnum.STAFF;

  /**
   * When staff search input text changes, call API to find matching users.
   */
  useEffect(() => {
    const loadStaff = async () => {
      const staffResponse = await client.post("/api/users/role", {
        userrole: STAFF_USER_ROLE,
        name: staffSearchText
      });
      const foundStaff = await staffResponse.data;
      const foundStaffChoices = getStaffChoices(foundStaff.users);
      setStaffSearchResults(foundStaffChoices);
    };
    loadStaff();
  }, [staffSearchText]);

  /**
   * Handle staff search input
   * @param {*} event
   */
  const handleChangeSearch = (event) => {
    const { value } = event.target;
    if (!value || value.length === 0) {
      setStaffSearchResults([]);
      setStaffSearchText("");
    } else {
      setStaffSearchText(value);
    }
  };

  /**
   * Handle change in staff selections of search panel
   * @param {*} selectedChoices
   */
  const handleChangeStaffSelections = (selectedChoices) => {
    setStaffSelections(selectedChoices);
  };

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
              <button
                className={`rounded${isEditing ? "--is-editing" : ""}`}
                onClick={handleEditToggle}
                disabled={isEditing}
              >
                <i className="fas fa-pen icon" />
              </button>
            </div>

            <div className="section-container">
              <h2 className="section-title">CONTACT</h2>
              <ToggleEditTable
                tableData={getTableData()}
                validationSchema={validationSchema}
                isEditing={isEditing}
                submitHandler={onFormikSubmit}
                cancelHandler={onCancelClick}
                calendarState={calendarState}
              />
            </div>

            <div className="section-container">
              <h2>JOIN STAFF</h2>
              <SearchPanel
                chips
                choices={staffSearchResults}
                clearLabel="Clear search text"
                maximumHeight={200}
                onChange={handleChangeSearch}
                onClear={handleChangeSearch}
                onSelectionChange={handleChangeStaffSelections}
                placeholder="Search JOIN staff"
                preSelectedChoices={staffSelections}
                small
                value={staffSearchText}
                variant={SearchPanelVariant.checkbox}
                width={400}
              />
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tenant;
