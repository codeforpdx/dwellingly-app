import React from 'react';
import { Form, Field, Formik } from 'formik';
import { tempAuth } from '../Auth';
import dwellinglyLogo from '../assets/images/dwellingly_logo.png';


export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        tempAuth.authenticate();
    }

    render() {
        return (
            <div>
                <Formik
                    onSubmit={ () => {
                        this.onSubmit();
                    }}
                    enableReinitialize={true}
                    render={
                        ( props ) => {
                            return (
                                <>
                                    <Form className="form-container">
                                        <img className="logo" src={dwellinglyLogo}></img>
                                        <Field 
                                            className="form-field"
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            required
                                        />
                                        <Field
                                                                                    className="form-field"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            required

                                        />
                                        <div></div>
                                        <button className="login-button" type="submit">LOG IN</button>
                                        <div>OR</div>
                                        <button className="login-button" type="submit">LOG IN WITH GOOGLE</button>

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