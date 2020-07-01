import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import "./toggleEditTable.scss";

const FieldError = ({ error }) => {
  if (!error) return null;
  return <div className="form__field-error__message">{error}</div>;
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
            <div className="form__row--editing columns" key={value}>
              <label className="column is-one-quarter" htmlFor={value}>
                {rowTitles[index]}
              </label>
              <Field
                type="text"
                name={value}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[value]}
                className="column is-two-quarters row-input"
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
            className="form__submit"
          >
            Save Changes
          </button>
        </Form>
      )}
    </Formik>
  ) : (
    <>
      {Object.keys(tableData).map((rowValue, index) => (
        <div key={rowValue} className="form__row--not-editing columns">
          <span className="column is-one-quarter">{rowTitles[index]}</span>
          <span className="column is-one-quarter">{tableData[rowValue]}</span>
        </div>
      ))}
    </>
  );

ToggleEditTable.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  tableData: PropTypes.object.isRequired,
  rowTitles: PropTypes.array.isRequired,
  submitHandler: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
};

export default ToggleEditTable;
