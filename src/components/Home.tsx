import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";

export const Home: React.FunctionComponent<RouteComponentProps> = ({
	history
}) => {

	useEffect(() => {
		loginFetch();
	});

	const loginFetch = async () => {
		const resp = await fetch(`http://localhost:3004/users/me`, {
			credentials: "include",
		});
		resp.ok ? console.log("success! ✨") : history.push("/login");
	};

	return (
		<div className='App App-header'>
			You logged in
		</div>
	);
};
