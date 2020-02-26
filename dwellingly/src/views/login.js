import React from 'react';
import { Form, Field, Formik } from 'formik';
import { tempAuth } from '../Auth';
import dwellinglyLogo from '../assets/images/dwellingly_logo.png';


export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    onSubmit = () => {
        console.log("logged in!")
        tempAuth.authenticate();
    }

    render() {
        return (
            <div className="login__container">
                <Formik
                    initialValues={{
                        username: "",
                        password: ""
                    }}
                    onSubmit={ () => {
                        this.onSubmit();
                    }}
                    enableReinitialize={true}
                    render={
                        ( props ) => {
                            return (
                                <>
                                    <Form className="login__form-container">
                                        <img className="login__logo" src={dwellinglyLogo}></img>
                                        <Field 
                                            className="form-field login__form-field"
                                            type="text"
                                            name="username"
                                            value={this.state.username}
                                            placeholder="Username"
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
                                        <button className="login__button" type="submit">LOG IN</button>
                                        <div className="login__or_container">
                                            <div className="login__or">
                                                <span className="login__divider"></span>
                                                <span className="login__or_text">OR</span>
                                            </div>
                                        </div>
                                        <button className="login__button login__button--google">LOG IN WITH GOOGLE</button>
                                        <div className="login__account_container">
                                            <a href="" className="login__text_link login__account_forgot_password">Forgot Password</a>
                                            <a href="" className="login__text_link login__account_create">Create an Account</a>
                                        </div>

                                    </Form>
                                </>
                            );
                        }
                    }
                />
            </div>
        )
    }
}
