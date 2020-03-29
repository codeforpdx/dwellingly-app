import React, { Component } from 'react';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import * as axios from 'axios';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "*Name must have at least 2 characters")
        .max(100, "*Names can't be longer than 100 characters"),
    address: Yup.string()
        .required("*Address is required"),
    city: Yup.string()
        .required("*City is required"),
    zipcode: Yup.string()
        .required("*Zipcode is required"),
    state: Yup.string()
        .required("*State is required")
});

const formHandler = (data) => {
    axios.post('http://localhost:5000/properties/', data)
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
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
        <div className="add-property__container">
            <h2>Add a new Property</h2>
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
                    console.log(this.state);
                    setSubmitting(true);
                    formHandler(values);
                    resetForm();
                    setSubmitting(false);
                    
                }}>
                {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="add-property__form-container" onSubmit={handleSubmit}>
                        <Field
                            className={classNames("form-field add_property-field", {"error": touched.name && errors.name})}
                            type="text"
                            name="name"
                            placeholder="Property Name"
                            onChange={handleChange}
                            value={values.name}
                        />
                        {(touched.name && errors.name) ? <div className="error-message">{errors.name}</div>: null}
                        <Field
                            className={classNames("form-field add_property-field", {"error": touched.address && errors.address})}
                            type="text"
                            name="address"
                            value={values.address}
                            placeholder="Address"
                        />
                        {(touched.address && errors.address) ? <div className="error-message">{errors.address}</div>: null}
                        <Field
                            className={classNames("form-field add_property-field", {"error": touched.city && errors.city})}
                            type="text"
                            name="city"
                            value={values.city}
                            placeholder="City"
                            required
                        />
                        {(touched.city && errors.city) ? <div className="error-message">{errors.city}</div>: null}
                        <Field
                            className={classNames("form-field add_property-field", {"error": touched.state && errors.state})}
                            type="text"
                            name="state"
                            value={values.state}
                            placeholder="State"
                            required
                        />
                        {(touched.state && errors.state) ? <div className="error-message">{errors.state}</div>: null}
                        <Field
                            className={classNames("form-field add_property-field", {"error": touched.zipcode && errors.zipcode})}
                            type="text"
                            name="zipcode"
                            value={values.zipcode}
                            placeholder="Zipcode"
                            required
                        />
                        {(touched.zipcode && errors.zipcode) ? <div className="error-message">{errors.zipcode}</div>: null}
                        <button className="save_button" type="submit" disabled={isSubmitting}>SAVE</button>
                    </Form>
                    )}
            </Formik>
        </div>
      )
    }
}
