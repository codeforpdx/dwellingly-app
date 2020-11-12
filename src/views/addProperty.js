import React, { Component } from 'react';
import { Form, Field, Formik, isEmptyArray } from 'formik';
import * as Yup from 'yup';
import UserContext from '../UserContext';
import * as axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';
// import { doPasswordReset } from '../../stashed/src/firebase/auth';
// import user from '../../stashed/src/dux/user';
import RoleEnum from '../Enums/RoleEnum';


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
        .required("*State is required"),
    units: Yup.string()
        .max(50, "*Unit can't be longer than 50 characters"),
    managers: Yup.array()
});

const formHandler = (data, context) => {
    axios.post("/api/properties", data, { headers: { "Authorization": `Bearer ${context.user.accessJwt}` } })
        .then(function (response) {
            alert("Property Added!");
        })
        .catch(function (error) {
            alert(error);
        })
};

export class AddProperty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assignedPropertyManagers: [],
            managerSelection: []
        }

        this.getManagers = this.getManagers.bind(this);
    }

    componentDidMount() {
        this.getManagers(this.context);
    };

    getManagers = (context) => {
        axios.get(`/api/user?r=${RoleEnum.PROPERTY_MANAGER}`, { headers: { "Authorization": `Bearer ${context.user.accessJwt}` } })
            .then((response) => {
                let managerSelection = [...this.state.managerSelection];
                const userSelection = response.data.users;
                userSelection.forEach(function modifyManagers(user) {
                    let manager = { value: user.id, label: user.firstName + " " + user.lastName }
                    managerSelection.push(manager);
                });
                this.setState({ managerSelection })
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            })
    };

    handleInputChange = (selectedManagers) => {
        if (selectedManagers === null) {
            selectedManagers = [];
        }
        let assignedPropertyManagers = [];
        selectedManagers.forEach(function modifyManagers(manager) {
            assignedPropertyManagers.push(manager.value);
        });
        this.setState({ assignedPropertyManagers });
    };

    static contextType = UserContext;
    render() {
        console.log(this.state);
        return (
            <UserContext.Consumer>
                {session => {
                    return (
                        <div>
                            <h2 className="page-title">Add a New Property</h2>

                            <Formik
                                initialValues={{
                                    name: "",
                                    address: "",
                                    city: "",
                                    state: "",
                                    zipcode: "",
                                    units: "",
                                    managers: ""
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
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
                                            <div className="form-row columns">
                                                <label className="column is-one-fifth" htmlFor="units">Units</label>
                                                <Field
                                                    className="column form-field"
                                                    type="text"
                                                    name="units"
                                                    onChange={handleChange}
                                                    value={values.units}
                                                    placeholder="Number of units"
                                                    error={errors.units}
                                                />
                                                {errors.units ? (<div className="error-message">{errors.units}</div>) : null}
                                            </div>

                                            <div className=" add-property__assign-manager-container">
                                                <h3 className="section-title">ASSIGN PROPERTY MANAGERS</h3>
                                                <Field style={{ display: 'none' }} name="managers" value={this.state.assignedPropertyManagers} />
                                                <Select isMulti options={this.state.managerSelection} onChange={this.handleInputChange} />

                                            </div>
                                            <div className="container-footer">
                                                <button className={`${isValid && "active"} save_button button is-rounded`} type="submit" disabled={isSubmitting}>SAVE</button>
                                                <Link className="button is-dark is-rounded" to='/manage/properties'>CANCEL</Link>
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
