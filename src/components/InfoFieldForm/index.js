/*
	Issues:
		Errors appear on first type when values are filled, 
		do not appear when there're blank values
		Cannot currently type in boxes

		When inserting components:
			function form for components in components fields
			jsx form for injectible components
			Made the prop '.any', still errors on undefined

		Should FieldError be included for component field?

		Spacing in each section:
			move label to beginning of field/line
			Spacing btw sections is off

		Top line for first field:
			&:first-child not affecting correct child b/c of title
			Top line only appears on some forms, topBar prop?

*/
import './infoFieldForm.scss';

import React from 'react';
import { Form, Field, Formik } from 'formik';
import PropTypes from "prop-types";

const FieldError = ({ error }) => {
  if (!error) return null;
  return <div className="form__field-error__message">{error}</div>;
};

export const FormikField = ({fieldLabel, fieldType, fieldName, fieldValue, fieldHTML, fieldKey, fieldError, handleChange, handleBlur, fieldComponent, fieldPlaceholder, fieldTopBar}) => {

	if (fieldComponent == null){
		return (
			<div className="form__row--editing columns " key={fieldKey} >
				<label className="column is-one-quarter" htmlFor={fieldHTML}>
	            	{fieldLabel}
	        	</label>
				<Field
	                type={fieldType}
	                name={fieldName}
	                onChange={handleChange}
	                onBlur={handleBlur}
	                value={fieldValue}
	                placeholder={fieldPlaceholder}
	                className="column is-two-quarters row-input"
	        	/>
	        	<FieldError
	            	error={fieldError}
	            	className="column is-one-quarter"
	        	/>
	        </div>
		);
	}
	else {
		return (
			<>
				<div className="form__row--editing columns">
					<label className="column is-one-quarter" htmlFor={fieldHTML}>
		            	{fieldLabel}
		        	</label>
					<Field
		                name={fieldName}
		                component={fieldComponent}
		                className="column is-two-quarters row-input"
		        	/>
		        </div>
	        </>
		);
	}
}

FormikField.propTypes = {
	fieldLabel: PropTypes.string.isRequired,
	fieldType: PropTypes.string.isRequired,
	fieldName: PropTypes.string.isRequired,
	fieldValue: PropTypes.string,
	fieldHTML: PropTypes.string.isRequired,
	fieldKey: PropTypes.string.isRequired,
	fieldError: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	fieldComponent: PropTypes.function,
	fieldPlaceholder: PropTypes.string,
	fieldTopBar: PropTypes.bool,
}

export const FormikForm = ({
	tableData,
	submitHandler,
	validationSchema,
	restOfForm,
}) => {

	const nestedInitValuesFromTableData = tableData
		.map((section) => section.sectionContent)
		.flat()
		.reduce((reducedContent, currentContent) => {
			reducedContent[currentContent.key] = currentContent.value;
			return reducedContent;
		}, {});


	return (
		<Formik
	    	initialValues={nestedInitValuesFromTableData}
	    	onSubmit={submitHandler}
	    	validationSchema={validationSchema}
    	>
	    {({
	        values,
	        errors,
	        handleChange,
	        handleBlur,
	        handleSubmit,
	    }) => (
	    	<div className="form-container">
		        <Form onSubmit={handleSubmit}>
		        	<div className="form-spacing" >
			        	{tableData.map((value, index) => (
			        		<div key={index} className="section-spacing" >
			        		{value.sectionTitle ? <div key={index}> <div key={index} className="sub-title " > {value.sectionTitle} </div> {value.sectionContent.map((field, ind) => (
		            			field.isNotField ? <div key={field.key} className="" > {field.component} </div> : <FormikField key={field.key} fieldLabel={field.label} fieldType={field.inputType} fieldName={field.key} fieldValue={values[field.key]} fieldHTML={field.label} fieldKey={field.key} fieldError={errors[values[field.key]]} handleChange={handleSubmit} handleBlur={handleBlur} fieldPlaceholder={field.placeholder} fieldComponent={field.component} fieldTopBar={field.topBar} />
		
		            		))} </div> : 
			        		value.sectionContent.map((field, ind) => (
		            			field.isNotField ? <div key={field.key} className="" > {field.component} </div> : <FormikField key={field.key} fieldLabel={field.label} fieldType={field.inputType} fieldName={field.key} fieldValue={values[field.key]} fieldHTML={field.label} fieldKey={field.key} fieldError={errors[values[field.key]]} handleChange={handleSubmit} handleBlur={handleBlur} fieldPlaceholder={field.placeholder} fieldComponent={field.component} fieldTopBar={field.topBar} />
		
		            		))}
		            		</div>
			            	
			        	))}
		        	</div>
		        	{restOfForm}
			    </Form>
		    </div>
		)}
	    </Formik>
	);
}

FormikForm.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.shape({
  	sectionTitle: PropTypes.string,
  	sectionContent: PropTypes.arrayOf(PropTypes.shape({
	  	key: PropTypes.string.isRequired,
	  	label: PropTypes.string,
	  	value: PropTypes.string,
	  	inputType: PropTypes.string,
	  	placeholder: PropTypes.string,
	  	component: PropTypes.any,
	  	isNotField: PropTypes.bool,
	  	topBar: PropTypes.bool,
	})).isRequired
  })).isRequired,
  submitHandler: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
  restOfForm: PropTypes.object.isRequired,
};



