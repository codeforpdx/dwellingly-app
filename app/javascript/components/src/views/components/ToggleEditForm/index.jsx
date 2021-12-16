import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import Button from "../Button";
import "./styles/index.scss";
import CalendarModal from "../CalendarModal";

const FieldError = ({ error }) => {
  if (!error) return null;
  return <div className="form__field-error__message">{error}</div>;
};

const ToggleEditForm = ({
  isEditing,
  tableData,
  submitHandler,
  cancelHandler,
  validationSchema,
  calendarState
}) => {

  // create initialValues for Formik
  const initValuesFromTableData = tableData.reduce((initValues, currDataObject) => {
    initValues[currDataObject.key] = currDataObject.value;
    return initValues;
  }, {});

  const { dateTimeStart, dateTimeEnd } = calendarState || {};

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
              const isCalendar = tableData[index].inputType === "calendar"
              const readOnly = tableData[index].readOnly === true

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
                  onChange={(isCalendar || readOnly) ? null : handleChange}
                  onBlur={handleBlur}
                  value={
                    isCalendar
                      ? `${dateTimeStart.toDateString()} - ${dateTimeEnd.toDateString()}`
                      : values[value]}
                  className="column is-two-quarters row-input"
                />
                {isCalendar && <CalendarModal title="Lease Range" calendarState={calendarState} iconYPosition="0.8rem" />}
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
            <span className="column is-one-quarter">{
              (dataObject.inputType === "calendar")
                ? `${dataObject.value.dateTimeStart.toDateString()} - ${dataObject.value.dateTimeEnd.toDateString()}`
                : dataObject.value
            }</span>
          </div>
        ))}
      </>
    );
};

ToggleEditForm.propTypes = {
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
  calendarState: PropTypes.object
};

export default ToggleEditForm;
