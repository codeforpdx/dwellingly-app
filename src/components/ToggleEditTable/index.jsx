import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import Button from "../Button";
import "./toggleEditTable.scss";

const FieldError = ({ error }) => {
  if (!error) return null;
  return <div className="form__field-error__message">{error}</div>;
};

const ToggleEditTable = ({
  isEditing,
  tableData,
  submitHandler,
  cancelHandler,
  validationSchema,
}) => {

  // create initialValues for Formik
  const initValuesFromTableData = tableData.reduce((initValues, currDataObject) => {
    initValues[currDataObject.key] = currDataObject.value;
    return initValues;
  }, {});

  return isEditing ? (
    <Formik
      initialValues={initValuesFromTableData}
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
        isValid,
      }) => (
          <Form onSubmit={handleSubmit}>
            {Object.keys(values).map((value, index) => {
              return (<div className="form__row--editing columns" key={value}>
                <label
                  className="form__label column is-one-quarter"
                  htmlFor={value}
                >
                  {tableData[index].label}
                </label>
                <Field
                  type={tableData[index].inputType}
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
              </div>)
            })}
            <div className="form__button-container">
              <Button type="submit" disabled={isSubmitting} isValidFlag={isValid}>
                SAVE
            </Button>
              <Button isCancelButton={true} onClick={cancelHandler}>
                CANCEL
            </Button>
            </div>
          </Form>
        )}
    </Formik>
  ) : (
      <>
        {tableData.map((dataObject) => (
          <div key={dataObject.label} className="form__row--not-editing columns">
            <span className="form__label column is-one-quarter">
              {dataObject.label}
            </span>
            <span className="column is-one-quarter">{dataObject.value}</span>
          </div>
        ))}
      </>
    );
};

ToggleEditTable.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.isRequired,
      inputType: PropTypes.string.isRequired,
      comp: PropTypes.element,
      placeholder: PropTypes.string,
    })
  ),
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
};

export default ToggleEditTable;
