import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../App';
import * as axios from 'axios';

const validationSchema = Yup.object().shape({
    email: Yup.string().email()
        .min(5, "*Email must have at least 5 characters")
        .max(100, "*Email can't be longer than 100 characters")
        .required("*Email is required"),
    //Validate phone number??
    phone: Yup.string()
        .max(20, "*Phone can't be longer than 20 characters")
        .required("*Phone Number is required"),
});

// TODO come back and get this to update user email/phone
// MAYBE TODO see if we can get existing phone/email to be initial values for Formik
const formHandler = (data, context) => {
    axios.post('http://localhost:5000/properties', 
          data, 
          { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
        .then(function(response){
            alert("Contact Info Updated!");
        })
        .catch(function(error){
            alert(error);
        })
}

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          phone: null,
          email: null
        }
    }    

    render() {

      const user = this.context;
      console.log("user", user);

      return (

        <UserContext.Consumer>
            {session => {
                return (
                    <div className="add-property__container">
                        <h2 className="page-title">Settings</h2>

                        <Formik
                            initialValues={{
                                email: "",
                                phone: ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, {setSubmitting, resetForm})=> {
                                console.log("submitting", values);
                                setSubmitting(true);
                                formHandler(values, session);
                                resetForm();
                                setSubmitting(false);
                                
                            }}>
                            {({ handleSubmit,
                                handleChange,
                                values,
                                errors,
                                touched,
                                isValid,
                                isSubmitting }) => (
                                <div className="form-container add-property__main_container">
                                    <h1 className="section-title">UPDATE CONTACT INFORMATION</h1>
                                    <Form className="add-property__form-container" onSubmit={handleSubmit}>
                                      <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="phone">Phone</label>
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
                                        <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="name">Email</label>
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
                                        <div className="container-footer">
                                            <button 
                                                className={`${isValid && "active"} save_button button is-rounded`} 
                                                type="submit" 
                                                disabled={isSubmitting}>SAVE
                                            </button>
                                            <button 
                                                className="button is-dark is-rounded" 
                                                onClick={()=>{console.log("cancel pressed")}}>CANCEL
                                            </button>
                                        </div>

                                    </Form>
                                    <NavLink exact to='/change-password'>Change Password</NavLink>

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

export default Settings;