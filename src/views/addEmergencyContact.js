import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';
import { Form, Field, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import useMountEffect from '../utils/useMountEffect';
import { Link } from 'react-router-dom';


const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "*Name must have at least 3 characters")
        .max(100, "*Names can't be longer than 100 characters")
        .required("*Name is required"),
    description: Yup.string()
        .max(256, "*Description can't be longer than 256 characters"),
    contact_numbers: Yup.array().of(
        Yup.object().shape({
            number: Yup.string()
                .min(5, "*Number must contain at least 5 digits to be a valid phone/text number")
                .max(20, "*Numbers can't be longer than 20 digits")
                .required("*a valid phone number is required"),
            numtype: Yup.string()
                .max(30, "*Number type can't be longer than 30 characters"),
            extension: Yup.string()
                .max(10, "*Extension can't be longer than 10 digits"),
        })
        .required("*Numbers (at least one) must be provided")
    )
});

const FieldError = ({ error }) => {
    if(!error) return null;
    return (
        <div className="error-message">
            {error}
        </div>
    );
};

const NumberSubForm = ({ i, values, errors, handleChange }) => {
    const subFormErrors = errors.contact_numbers && errors.contact_numbers[i] ? errors.contact_numbers[i] : null;
    return (
        <>
            <div className="form-row columns">
                <label className="column is-one-quarter" htmlFor={`contact_numbers[${i}].number`}>Phone Number</label>
                <Field
                    className="column form-field"
                    type="text"
                    name={`contact_numbers[${i}].number`}
                    onChange={handleChange}
                    value={values.contact_numbers[i].number}
                    placeholder="Phone Number"
                />
                {subFormErrors && <FieldError error={subFormErrors.number} />}
            </div>
            <div className="form-row columns">
                <label className="column is-one-quarter" htmlFor={`contact_numbers[${i}].numtype`}>Phone Number Type</label>
                <Field
                    className="column form-field"
                    type="text"
                    name={`contact_numbers[${i}].numtype`}
                    onChange={handleChange}
                    value={values.contact_numbers[i].numtype}
                    placeholder="Phone Number Type (Opional)"
                />
                {subFormErrors && <FieldError error={subFormErrors.numtype} />}
            </div>
            <div className="form-row columns">
                <label className="column is-one-quarter" htmlFor={`contact_numbers[${i}].extension`}>Extension</label>
                <Field
                    className="column form-field"
                    type="text"
                    name={`contact_numbers[${i}].extension`}
                    onChange={handleChange}
                    value={values.contact_numbers[i].extension}
                    placeholder="Extension (Optional)"
                />
                {subFormErrors && <FieldError error={subFormErrors.extension} />}
            </div>
        </>
    );
};

const emptyContact = {
    name: "",
    description: "",
    contact_numbers: [{
        number: "",
        numtype: "",
        extension: ""
    }],
};

const AddEmergencyContact = (props) => {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [contactValues, setContactValues] = useState(emptyContact);

    useMountEffect(() => {
        const id = props.match.params.id;
        if(!id && id !== 0) {
            setInitialized(true);
            return;
        }

        setEditMode(true);
        axios
            .get(`/api/emergencycontacts/${id}`, makeAuthHeaders(userContext))
            .then(({ data }) => {
                setContactValues(data);
                setInitialized(true);
            })
            .catch(error => alert(error));
    });

    const formHandler = data => {
        const startPost = () => axios.post(`/api/emergencycontacts`, data, makeAuthHeaders(userContext));
        const startPut = () => axios.put(`/api/emergencycontacts/${data.id}`, data, makeAuthHeaders(userContext));
        const axiosReq = () => editMode ? startPut() : startPost();

        axiosReq()
            .then(() => {
                history.push('/emergency');
            })
            .catch(error => alert(error));
        setLoading(true);
    }

    return (
        <div>
            <h2 className="page-title">{editMode ? 'Edit' : 'Create'} Emergency Contact</h2>
            {loading &&
                <div className='add-emergency-contact__loading'>Loading ...</div>
            }
            {initialized &&
                <Formik
                    initialValues={contactValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log('submitting');
                        setSubmitting(true);
                        formHandler(values);
                        resetForm();
                        setSubmitting(false);
                    }}>
                    {({ handleSubmit, handleChange, values, errors, isValid, isSubmitting }) => (
                        <div className="form-container add-emergency-contact__main_container">
                            <Form className="add-emergency-contact__form-container" onSubmit={handleSubmit}>
                                <div className="form-row columns">
                                    <label className="column is-one-quarter" htmlFor="name">Contact Name</label>
                                    <Field
                                        className="column form-field"
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        value={values.name}
                                        placeholder="Name or Organization"
                                    />
                                    <FieldError error={errors.name} />
                                </div>
                                <div className="form-row columns">
                                    <label className="column is-one-quarter" htmlFor="description">Organization Description</label>
                                    <Field
                                        className="column form-field"
                                        type="text"
                                        name="description"
                                        onChange={handleChange}
                                        value={values.description}
                                        placeholder="Description text (Optional)"
                                        error={errors.description}
                                    />
                                    <FieldError error={errors.description} />
                                </div>
                                <FieldArray
                                    name="contact_numbers"
                                    render={numbersArrayFields => {
                                        const addRowValid = (values.contact_numbers[0].number !== "") && (!errors.contact_numbers || !errors.contact_numbers[values.contact_numbers.length - 1].number);
                                        const addRow = () => addRowValid && numbersArrayFields.push({ number: "", numtype: "", extension: "" });

                                        return(
                                            <>
                                                {values.contact_numbers.map((_, i) => (
                                                    <NumberSubForm key={i} i={i} values={values} errors={errors} handleChange={handleChange} />
                                                ))}
                                                <div className="form-add-rows-container">
                                                    <span className={`${addRowValid ? "active" : ""} is-rounded form-add-rows`} onClick={addRow}>
                                                        <i className="fas fa-plus-circle"></i> Add New Phone Number
                                                    </span>
                                                </div>
                                            </>
                                        );
                                    }}
                                />
                                <div className="container-footer">
                                    <button className={`${isValid && "active"} save_button button is-rounded`} type="submit" disabled={isSubmitting}>
                                        {editMode ? 'UPDATE' : 'ADD'} EMERGENCY NUMBER
                                    </button>
                                    <Link className="button is-dark is-rounded" to='/emergency'>
                                        CANCEL
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            }
        </div>
    );
}

export default AddEmergencyContact;
