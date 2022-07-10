import React from "react"
import { Form, Field, Formik } from "formik"
import dwellinglyLogo from "images/dwellingly_logo.png"
import UserContext from "../../contexts/UserContext"
import { Redirect } from "react-router"
import { Link } from "react-router-dom"
import GoogleButton from "./components/GoogleButton"
import Toast from "../../utils/toast"

import "./styles/index.scss"

export class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    // eslint-disable-next-line react/prop-types
    if (props.location.search === "?error=invalid_invitation_token") {
      Toast("Invalid invitation token", "error")
    }

    this.state = {
      email: undefined,
      password: undefined
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ user, login }) => (
          user.isAuthenticated
            ? <Redirect to="/dashboard" />
            :
            <div className="login__container">
              <Formik
                initialValues={{
                  email: "",
                  password: ""
                }}
                onSubmit={({ email, password }) => {
                  login(email, password);
                }}
                enableReinitialize={true}
                render={
                  (props) => {
                    return (
                      <>
                        <Form className="login__form-container">
                          <img className="login__logo" src={dwellinglyLogo} alt="Dwellingly Logo"></img>
                          <Field
                            className="form-field login__form-field"
                            type="text"
                            name="email"
                            value={this.state.email}
                            placeholder="Email"
                            required
                          />
                          <Field
                            className="form-field login__form-field"
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Password"
                            required
                          />
                          <div></div>
                          <button className="button is-rounded is-primary mt-4 is-small has-text-weight-bold py-4" type="submit">LOG IN</button>
                          <div className="login__or_container">
                            <div className="login__or">
                              <span className="login__divider"></span>
                              <span className="login__or_text">OR</span>
                            </div>
                          </div>
                          <GoogleButton innerText={"LOG IN WITH GOOGLE"} />
                          <div className="login__account_container">
                            <Link to="/forgot-password" className="login__text_link login__account_forgot_password">Forgot Password</Link>
                            <Link to="/signup" className="login__text_link login__account_create">Create an Account</Link>
                          </div>

                        </Form>
                      </>
                    );
                  }
                }
              />
            </div>
        )}
      </UserContext.Consumer>
    )
  }
}
