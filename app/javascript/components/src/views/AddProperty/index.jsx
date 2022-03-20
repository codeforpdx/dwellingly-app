import React, { useState, useContext } from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { SearchPanel, SearchPanelVariant } from 'react-search-panel';
import RoleEnum from '../../Enums/RoleEnum';
import useMountEffect from '../../utils/useMountEffect';
import Toast from "../../utils/toast";
import './styles/index.scss';


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, `*Name must have at least 5 characters`)
    .max(100, `*Names can't be longer than 100 characters`)
    .required(`*Name is required`),
  address: Yup.string()
    .max(250, `*Address can't be longer than 250 characters`)
    .required(`*Address is required`),
  city: Yup.string()
    .max(50, `*City can't be longer than 50 characters`)
    .required(`*City is required`),
  zipcode: Yup.string()
    .max(50, `*Zipcode can't be longer than 50 characters`)
    .required(`*Zipcode is required`),
  state: Yup.string()
    .max(50, `*State can't be longer than 50 characters`)
    .required(`*State is required`),
  num_units: Yup.string()
    .max(50, `*Unit can't be longer than 50 characters`),
  managers: Yup.array()
});


export const AddProperty = (props) => {
  const [propertyManagers, setPropertyManagers] = useState([])
  const [managerOptions, setManagerOptions] = useState([])
  const [filteredManagerOptions, setFilteredManagerOptions] = useState([])
  const [managerSearch, setManagerSearch] = useState('')
  const userContext = useContext(UserContext)
  const { showPageTitle, handleCancel, 
    afterCreate, showAssignPropManagers } = props

  useMountEffect(() => getManagers())

  const getManagers = () => {
    userContext.apiCall('get', '/property_managers', {}, {})
      .then(({ data }) => {
        const managerOptions = data.map(({ id, firstName, lastName }) => {
          return ({
            key: id,
            description: `${firstName} ${lastName}`
          })
        })
        setManagerOptions(managerOptions)
        setFilteredManagerOptions(managerOptions)
      })
  }

  const formHandler = (data, setErrors) => {
    userContext.apiCall('post', '/properties', data, { success: 'Property Added!' }, setErrors)
      .then((response) => {
        if (afterCreate) {
          afterCreate(response.data)
        }
        // The api returns false if there is an error
        // Use the input to determine if the form can be reset
        return true 
      })
  }

  const handleSearchChange = ({ target }) => {
    let managerSearch = target.value
    if(!managerSearch || managerSearch.length === 0) managerSearch = ''
    setManagerSearch(managerSearch)

    const choices = managerOptions.filter(
      manager => manager.description.toLowerCase().includes(managerSearch.toLowerCase())
    )
    setFilteredManagerOptions(choices)
  }

  const handleSelectionChange = (propertyManagers) => {
    setPropertyManagers(propertyManagers)
  }

  return (
    <div className={`${showPageTitle ? 'main-container' :  ''}`}>
      <div>
        {showPageTitle && <h2 className='page-title'>Add a New Property</h2>}

        <Formik
          initialValues={{
            name: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            num_units: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
            values.propertyManagerIDs = propertyManagers.map(manager => manager.key);

            setSubmitting(true);
            if(formHandler(values, setErrors)) {
              resetForm();
            }
            setSubmitting(false);
          }}>
          {({ handleSubmit, handleChange, values, errors, touched, isValid, isSubmitting }) => (
            <div className='form-container add-property__main_container'>
              <h1 className='section-title'>PROPERTY INFORMATION</h1>
              <Form className='add-property__form-container' onSubmit={handleSubmit}>
                <div className='form-row columns'>
                  <label className='column is-one-fifth' htmlFor='name'>Name</label>
                  <Field
                    className='column form-field'
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={values.name}
                    placeholder='Example Estate'
                  />
                  {errors.name ? (<div className='error-message'>{errors.name}</div>) : null}
                </div>
                <div className='form-row columns'>
                  <label className='column is-one-fifth' htmlFor='address'>Address</label>
                  <Field
                    className='column form-field'
                    type='text'
                    name='address'
                    onChange={handleChange}
                    value={values.address}
                    placeholder='123 Main St'
                    error={errors.address}
                  />
                  {errors.address ? (<div className='error-message'>{errors.address}</div>) : null}
                </div>
                <div className='form-row columns'>
                  <label className='column is-one-fifth' htmlFor='city'>City</label>
                  <Field
                    className='column form-field'
                    type='text'
                    name='city'
                    onChange={handleChange}
                    value={values.city}
                    placeholder='Portland'
                  />
                  {errors.city ? (<div className='error-message'>{errors.city}</div>) : null}
                </div>
                <div className='form-row columns'>
                  <label className='column is-one-fifth' htmlFor='state'>State</label>
                  <Field
                    className='column form-field'
                    type='text'
                    name='state'
                    onChange={handleChange}
                    value={values.state}
                    placeholder='OR'
                  />
                  {errors.state ? (<div className='error-message'>{errors.state}</div>) : null}
                </div>
                <div className='form-row columns'>
                  <label className='column is-one-fifth' htmlFor='zipcode'>Zipcode</label>
                  <Field
                    className='column form-field'
                    type='text'
                    name='zipcode'
                    onChange={handleChange}
                    value={values.zipcode}
                    placeholder='97217'
                  />
                  {errors.zipcode ? (<div className='error-message'>{errors.zipcode}</div>) : null}
                </div>
                <div className='form-row columns'>
                  <label className='column is-one-fifth' htmlFor='units'>Units</label>
                  <Field
                    className='column form-field'
                    type='text'
                    name='num_units'
                    onChange={handleChange}
                    value={values.num_units}
                    placeholder='Number of units'
                    error={errors.num_units}
                  />
                  {errors.num_units ? (<div className='error-message'>{errors.num_units}</div>) : null}
                </div>

                {showAssignPropManagers ? ( 
                <div className=' add-property__assign-manager-container'>
                  <h3 className='section-title'>ASSIGN PROPERTY MANAGERS</h3>
                  <div className='typeahead-section'>
                    <SearchPanel
                      chips
                      choices={filteredManagerOptions}
                      small
                      width={400}
                      shadow
                      onChange={handleSearchChange}
                      onSelectionChange={handleSelectionChange}
                      placeholder='Search Property Managers'
                      selectedChoices={propertyManagers}
                      value={managerSearch}
                      variant={SearchPanelVariant.checkbox}
                    />
                  </div>
                </div>) : null }

                <div className='container-footer mt-3'>
                <button
                  className='button is-primary is-rounded mr-5'
                  type='submit'
                  disabled={isSubmitting}>
                  SAVE
                </button>
                {typeof(handleCancel) === 'function'
                  ? <button
                      className='button is-dark is-rounded'
                      onClick={() => handleCancel()}
                      type='button'
                      >
                      CANCEL
                    </button>
                  : <Link
                    className='button is-dark is-rounded'
                    to='/manage/properties'
                  >
                    CANCEL
                  </Link>
                }
                </div>
              </Form>

            </div>
          )}
        </Formik>
      </div>
    </div>
  )
}
