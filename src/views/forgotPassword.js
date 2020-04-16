import React, { Component } from 'react';
import { Form, Field, Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../App';
import * as axios from 'axios';
import Header from '../components/Header';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("*Please enter a valid email")
        .required("*Name is required"),
});

const formHandler = (data, context) => {
    axios.post('http://localhost:5000/properties', data, { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
        .then(function(response){
            alert("Property Added!");
        })
        .catch(function(error){
            alert(error);
        })
}

export class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        
        this.state = {

        }
    }    

    render() {
      return (
        <UserContext.Consumer>
            {session => {
                return (
                  <>
                  <Header />

                    <div className="forgot-password__container">

                        <h2 className="page-title">Forgot Password</h2>

                        <Formik
                            initialValues={{
                                email: "",

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
                                <div className="form-container forgot-password__main_container">
                                    <p className="para-text">
                                      Forgot your password? It happens to all of us. To recover your password, follow the instructions that relate to your account.</p>
                                    <h1 className="section-title">EMAIL/PASSWORD USERS</h1>
                                    <Form className="forgot-password__form-container" onSubmit={handleSubmit}>
                                        <div className="form-row columns">
                                            <label className="column is-one-fifth" htmlFor="name">Email</label>
                                            <Field
                                                className="column form-field"
                                                type="text"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.name}
                                                placeholder="email@example.com"
                                            />
                                            {errors.name ? (<div className="error-message">{errors.name}</div>) : null}
                                        </div>
                                        <div className="container-footer">
                                            <button className={`${isValid && "active"} save_button button is-rounded`} type="submit" disabled={isSubmitting}>REQUEST PASSWORD RESET</button>
                                        </div>
                                        <NavLink to="/login">Return to log in</NavLink>
                                        <h1 className="section-title">GOOGLE ACCOUNT USERS</h1>
                                        <NavLink to="">Recover your account</NavLink>
                                    </Form>

                                </div>
                                )}
                        </Formik>
                    </div>
                    </>

                )
            }}
            
        </UserContext.Consumer>
      )
    }
}
