import React from 'react';
import { Form, Field, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';

let resize = "resize";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "*Name must have at least 3 characters")
        .max(100, "*Names can't be longer than 100 characters")
        .required("*Name is required"),
    description: Yup.string()
        .max(256, "*Description can't be longer than 256 characters"),
    numbers: Yup.array().of(
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

const formHandler = data => {
    console.log('submission data:');
    console.log(data);
}

const FieldError = ({ error }) => {
    if(!error) return null;
    return (
        <div className="error-message">
            {error}
        </div>
    );
};

const NumberSubForm = ({ i, values, errors, handleChange }) => {
    const subFormErrors = errors.numbers && errors.numbers[i] ? errors.numbers[i] : null;
    return (
        <>
            <div className={`form-row columns ${resize}`}>
                <label className="column is-one-quarter" htmlFor={`numbers[${i}].number`}>Phone Number</label>
                <Field
                    className="column form-field"
                    type="text"
                    name={`numbers[${i}].number`}
                    onChange={handleChange}
                    value={values.numbers[i].number}
                    placeholder="Phone Number"
                />
                {subFormErrors && <FieldError error={subFormErrors.number} />}
            </div>
            <div className={`form-row columns ${resize}`}>
                <label className="column is-one-quarter" htmlFor={`numbers[${i}].numtype`}>Phone Number Type</label>
                <Field
                    className="column form-field"
                    type="text"
                    name={`numbers[${i}].numtype`}
                    onChange={handleChange}
                    value={values.numbers[i].numtype}
                    placeholder="Phone Number Type (Opional)"
                />
                {subFormErrors && <FieldError error={subFormErrors.numtype} />}
            </div>
            <div className={`form-row columns ${resize}`}>
                <label className="column is-one-quarter" htmlFor={`numbers[${i}].extension`}>Extension</label>
                <Field
                    className="column form-field"
                    type="text"
                    name={`numbers[${i}].extension`}
                    onChange={handleChange}
                    value={values.numbers[i].extension}
                    placeholder="Extension (Optional)"
                />
                {subFormErrors && <FieldError error={subFormErrors.extension} />}
            </div>
        </>
    );
};

const AddEmergencyContact = () => {
    return (
        <div className="add-emergency-contact__container">
            <h2 className="page-title">Create Emergency Contact</h2>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    numbers: [{
                        number: "",
                        numtype: "",
                        extension: ""
                    }]
                }}
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
                            <div className={`form-row columns ${resize}`}>
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
                            <div className={`form-row columns ${resize}`}>
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
                                name="numbers"
                                render={numbersArrayFields => {
                                    const addRowValid = (values.numbers[0].number !== "") && (!errors.numbers || !errors.numbers[values.numbers.length - 1].number);
                                    const addRow = () => addRowValid && numbersArrayFields.push({ number: "", numtype: "", extension: "" });

                                    return(
                                        <>
                                            {values.numbers.map((_, i) => (
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
                                    ADD EMERGENCY NUMBER
                                </button>
                                <button className="button is-dark is-rounded" onClick={() => console.log("cancel pressed")} type="button">
                                    CANCEL
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default AddEmergencyContact;
