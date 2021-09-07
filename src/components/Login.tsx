import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RouteComponentProps } from "react-router-dom";

export const Login: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const bodyJSON = JSON.stringify({
		email: email,
		password: password,
	});

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		try {
			const resp = await fetch(`http://localhost:3004/auth/login`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: bodyJSON,
			});
			const data = await resp.json();
			if (resp.ok) {
				history.push("/home");
			} else {
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	
	return (
		<div className='App App-header'>
			login
			<input
				type='text'
				placeholder='email'
				onChange={(e) => {
					setEmail(e.target.value);
				}}></input>
			<input
				type='text'
				placeholder='password'
				onChange={(e) => {
					setPassword(e.target.value);
				}}></input>
			<button onClick={handleSubmit}> Submit </button>
		</div>
	);
};
