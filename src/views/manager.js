import React from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

const Manager = () => {
	return (
		<UserContext.Consumer>
			<div></div>
		</UserContext.Consumer>
	);
};

export default Manager;
