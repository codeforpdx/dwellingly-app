import React, { Component } from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../App';
import * as axios from 'axios';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, "*Name must have at least 5 characters")
        .max(100, "*Names can't be longer than 100 characters")
        .required("*Name is required"),
    address: Yup.string()
        .max(250, "*Address can't be longer than 250 characters")
        .required("*Address is required"),
    city: Yup.string()
        .max(50, "*City can't be longer than 50 characters")
        .required("*City is required"),
    zipcode: Yup.string()
        .max(50, "*Zipcode can't be longer than 50 characters")
        .required("*Zipcode is required"),
    state: Yup.string()
        .max(50, "*State can't be longer than 50 characters")
        .required("*State is required")
});

const formHandler = (data, context) => {
    axios.post(`${process.env.REACT_APP_API_URL}/properties`, data, { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
        .then(function(response){
            alert("Property Added!");
        })
        .catch(function(error){
            alert(error);
        })
}

export class AddProperty extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        propertyManagers: undefined,
        }
    }    

    render() {
      return (
        <UserContext.Consumer>
            {session => {
                return (
                    <div className="add-property__container">
                        <h2 className="page-title">Add a New Property</h2>

                        <Formik
                            initialValues={{
                                name: "",
                                address: "",
                                city: "",
                                state: "",
                                zipcode: ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, {setSubmitting, resetForm})=> {
                                console.log("submitting", values);
                                setSubmitting(true);
                                formHandler(values, session);
                                resetForm();
                                setSubmitting(false);
                                
                            }}>
                            {({ handleSubmit, handleChange, values, errors, touched, isValid, isSubmitting }) => (
                                <div className="form-container add-property__main_container">
                                    <h1 className="section-title">PROPERTY INFORMATION</h1>
                                    <Form className="add-property__form-container" onSubmit={handleSubmit}>
                                        <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="name">Name</label>
                                            <Field
                                                className="column form-field"
                                                type="text"
                                                name="name"
                                                onChange={handleChange}
                                                value={values.name}
                                                placeholder="Example Estate"
                                            />
                                            {errors.name ? (<div className="error-message">{errors.name}</div>) : null}
                                        </div>
                                        <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="address">Address</label>
                                            <Field
                                                className="column form-field"
                                                type="text"
                                                name="address"
                                                onChange={handleChange}
                                                value={values.address}
                                                placeholder="123 Main St"
                                                error={errors.address}
                                            />
                                            {errors.address ? (<div className="error-message">{errors.address}</div>) : null}
                                        </div>
                                        <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="city">City</label>
                                            <Field
                                                className="column form-field"
                                                type="text"
                                                name="city"
                                                onChange={handleChange}
                                                value={values.city}
                                                placeholder="Portland"
                                            />
                                            {errors.city ? (<div className="error-message">{errors.city}</div>) : null}
                                        </div>
                                        <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="state">State</label>
                                            <Field
                                                className="column form-field"
                                                type="text"
                                                name="state"
                                                onChange={handleChange}
                                                value={values.state}
                                                placeholder="OR"
                                            />
                                            {errors.state ? (<div className="error-message">{errors.state}</div>) : null}
                                        </div>
                                        <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="zipcode">Zipcode</label>
                                            <Field
                                                className="column form-field"
                                                type="text"
                                                name="zipcode"
                                                onChange={handleChange}
                                                value={values.zipcode}
                                                placeholder="97217"
                                            />
                                            {errors.zipcode ? (<div className="error-message">{errors.zipcode}</div>) : null}
                                        </div>
                                        {/* This field needs to be included after
                                            the units parameter is added to the api endpoint */}
                                        {/* <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="zipcode">Units</label>
                                            <Field
                                                className="column form-field"
                                                type="text"
                                                name="units"
                                                onChange={handleChange}
                                                value={values.zipcode}
                                                placeholder="10"
                                            />
                                        </div> */}

                                        {/* This element will use a list of property managers
                                            and will need to be implemented later. react-select
                                            can be used to select from list retrieved from endpoint */}
                                        {/* <div className=" add-property__assign-manager-container">
                                            <h3 className="section-title">ASSIGN PROPERTY MANAGERS</h3>
                                            <input></input>
                                        </div> */}
                                        <div className="container-footer">
                                            <button className={`${isValid && "active"} save_button button is-rounded`} type="submit" disabled={isSubmitting}>SAVE</button>
                                            <button className="button is-dark is-rounded" onClick={()=>{console.log("cancel pressed")}}>CANCEL</button>
                                        </div>
                                    </Form>

                                </div>
                                )}
                        </Formik>
                    </div>
                )
            }}
            
        </UserContext.Consumer>
      )
    }
}
