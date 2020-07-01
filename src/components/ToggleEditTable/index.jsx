import React from "react";
import { Formik, Form, Field } from "formik";

const FieldError = ({ error }) => {
  if (!error) return null;
  return <div className="field-error__message">{error}</div>;
};

const ToggleEditTable = ({
  isEditing,
  tableData,
  rowTitles,
  submitHandler,
  validationSchema,
}) =>
  isEditing ? (
    <Formik
      initialValues={tableData}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          {Object.keys(values).map((value, index) => (
            <div className="form-row columns" key={value}>
              <label
                className="column is-one-quarter row-title"
                htmlFor={value}
              >
                {rowTitles[index]}
              </label>
              <Field
                type="text"
                name={value}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[value]}
                className="column is-two-quarters contact-form__field--editing"
              />
              <FieldError
                error={errors[value]}
                className="column is-one-quarter"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-form__submit"
          >
            Save Changes
          </button>
        </Form>
      )}
    </Formik>
  ) : (
    <>
      {Object.keys(tableData).map((rowValue, index) => (
        <div key={rowValue} className="form-row--not-editing columns">
          <span className="column is-one-quarter row-title">
            {rowTitles[index]}
          </span>
          <span className="column is-one-quarter contact-form__field--not-editing">
            {tableData[rowValue]}
          </span>
        </div>
      ))}
    </>
  );

export default ToggleEditTable;
