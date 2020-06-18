import React, { useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Link, useParams } from "react-router-dom";
import * as axios from "axios";

const Manager = () => {
	const { id } = useParams();
	const [manager, setManager] = useState({});

	const getManager = (context) => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/users/?id=${id}`, {
				headers: { Authorization: `Bearer ${context.user.accessJwt}` },
			})
			.then((response) => {
				setManager({ manager: response.data.manager });
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	console.log(manager);
	return <div>manager {id}</div>;
};

export default Manager;
