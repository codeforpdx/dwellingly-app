import React from 'react';
import { Form, Field, Formik } from 'formik';
import { tempAuth } from '../Auth';

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
                                    <Form >
                                        <Field 
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            required
                                        />
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            required

                                        />
                                        <button type="submit">Login</button>
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