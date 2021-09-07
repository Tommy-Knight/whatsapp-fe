import React, { MouseEvent } from "react";

import { RouteComponentProps } from "react-router-dom";

export const Landing: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const handleClick = (e: MouseEvent<HTMLButtonElement>) =>
		e.currentTarget.name === "login" ? history.push("/login") : history.push("/register");
	return (
		<div className='App App-header'>
			hello
			<button onClick={handleClick} name='login'>
				Login
			</button>
			<button onClick={handleClick} name='register'>
				Register
			</button>
		</div>
	);
};
