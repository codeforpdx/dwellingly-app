import React from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

const Manager = () => {
	return <div>manager {this.props.match.params.redirectParam}</div>;
};

export default Manager;
