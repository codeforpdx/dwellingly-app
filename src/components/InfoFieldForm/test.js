import React from "react";
import { FormikForm } from "./index";
import * as Yup from 'yup';

/*
	Should components handle their own errors?
	Rest of form overlapping with footer

*/

const valSchema = Yup.object().shape({
	firstName: Yup.string()
    	.max(5, "Must be shorter than 5 Characters")
    	.required("Must enter a First Name"),
	lastName: Yup.string()
    	.max(5, "Must be shorter than 255 Characters")
    	.required("Must enter a Last Name"),
	search: Yup.bool(),
	confirmPassword: Yup.string()
    	.max(5, "Must be shorter than 255 Characters")
    	.required("Must enter a password"),
	lease: Yup.string()
    	.max(5, "Must be shorter than 255 Characters")
    	.required("Must enter a Lease"),
});

const onSubmit = () => {
	// do
}

const TestCompt = ({title}) => {
	const text = title ? title : "Yo";
	return(
		<div>
			{text}
			<input type="checkbox" />
		</div>
	);
}

const Rest = () => {
	const cancelHand = () => {
		// Do this
	}

	return(
		<div className="form__button-container">
		    <button type="submit">
		    	SAVE
		    </button>
		    <button onClick={cancelHand}>
		    	CANCEL
		    </button>
		</div>
	);
}

export const TestForm = () => {
	var fName = "firstName";
	var cPass = "confirmPassword";
	var lName = "lastName";
	var lease = "lease";
	var searchProperty = "search";

	const labelData = [
		{
			//sectionTitle: "CONTACT",
			sectionContent: [
				{
					key: "firstName",
				  	label: "First Name",
				  	value: fName,
				  	inputType: "text",
				  	placeholder: "Bob",
				  	topBar: true,
				},
				{
					key: "lastName",
				  	label: "Last Name",
				  	value: lName,
				  	inputType: "text",
				  	placeholder: "Smob",
				},
			]
		},
		{
			sectionTitle: "INJECTED COMPONENT",
			sectionContent: [
				{
					isNotField: true,
					key: "searchProperty",
					component: <TestCompt title="Check box" />,
					value: searchProperty,
				}
			]
		},
		{
			sectionTitle: "PASS",
			sectionContent: [
				{
					key: "cPassword",
				  	label: "Confirm Password",
				  	value: cPass,
				  	inputType: "password",
				},
				{
					key: "lease",
					component: TestCompt,
					value: lease,
					label: "Lease",
					inputType: "other"
				}
			]
		}
	]
	return(
		<>
			<div> Hello! </div>
			<FormikForm tableData={labelData} submitHandler={onSubmit} validationSchema={valSchema} restOfForm={<Rest />} />
		</>
	);
}