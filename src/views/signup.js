import React from 'react';
import { Form, Field, Formik, ErrorMessage } from 'formik';
import dwellinglyLogo from '../assets/images/dwellingly_logo.png';
import UserContext from '../UserContext';
import { Redirect } from 'react-router';
//import Header from '../components/Header/index';
import axios from 'axios';

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export class SignupForm extends React.Component {

  async signup(firstName, lastName, email, password, confirmPassword){
    console.log(firstName)
    console.log(lastName)
    console.log(password)
    console.log(confirmPassword)

    if (password !== confirmPassword){
      alert("Passwords Don't Match");
      return;
    }

    return axios.post("/api/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
    .then((response) => {
      if (response){
        const success = 'Account Created Successfully!'
        console.log(success);
        alert(success);
        //Redirect to login using the react router history
        this.props.history.push('/login');
        return response;
      }
    })
    .catch((error) => {
      const failureMessage = "Account Could Not Be Created"
      console.log(failureMessage);
      console.log(error);
      alert(failureMessage);
      return Promise.reject(error);
    })
  };

  render() {

    return (
      <UserContext.Consumer>
      {({ user }) => (
        user.isAuthenticated
        ? <Redirect to="/dashboard" />
        :
        <div className="login__container">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "", 
            }}
            validate = {values => {
              const errors = {};

              if (values.email === ''){
                errors.email = "Email Required";
              }
              else if (!isValidEmail(values.email)){
                errors.email = "Invalid email format";
              }
              
              if (values.password === ''){
                errors.password = 'Password Required';
              }
              else if (values.password.length < 8){
                errors.password = 'Password must be at least 8 characters long';
              }
              else if (values.password !== values.confirmPassword){
                errors.confirmPassword = "Passwords Don't Match";
              }

              return errors;
            }}
            onSubmit={({ firstName, lastName, email, password, confirmPassword }) => {
              this.signup(firstName, lastName, email, password, confirmPassword);
            }}
            enableReinitialize={true}
          >
            {
              (props) => {
                return (
                  <>
                    {/* <Header /> */}
                    <Form className="login__form-container">
                      <img className="login__logo" src={dwellinglyLogo} alt="Dwellingly Logo"></img>
                      <h2 className='subtitle'>Create an Account</h2>
                      <Field
                        className="form-field login__form-field"
                        type="text"
                        name="firstName"
                        // value={this.state.firstName}
                        placeholder="First Name"
                        required
                      />
                      <Field
                        className="form-field login__form-field"
                        type="text"
                        name="lastName"
                        //value={this.state.lastName}
                        placeholder="Last Name"
                        required
                      />
                      <Field
                        className="form-field login__form-field"
                        type="text"
                        name="email"
                        //value={this.state.email}
                        placeholder="Email"
                        required
                      />
                      <ErrorMessage name="email" component="div"/>
                      <Field
                        className="form-field login__form-field"
                        type="password"
                        name="password"
                        //value={this.state.password}
                        placeholder="Password"
                        required
                      />
                      <ErrorMessage name="password" component="div"/>
                      <Field
                        className="form-field login__form-field"
                        type="password"
                        name="confirmPassword"
                        //value={this.state.confirmPassword}
                        placeholder="Confirm Password"
                        required
                      />
                      <ErrorMessage name="confirmPassword" component="div"/>
                      
                      <div></div>
                      <button className="login__button" type="submit">SIGN UP</button>
                      <div className="login__or_container">
                        <div className="login__or">
                          <span className="login__divider"></span>
                          <span className="login__or_text">OR</span>
                        </div>
                      </div>
                      <button className="login__button login__button--google">LOG IN WITH GOOGLE</button>
                    </Form>
                  </>
                );
              }
            }
          </Formik>
        </div>
      )}
    </UserContext.Consumer>
    )
  }
}
