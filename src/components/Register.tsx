import React, { MouseEvent, useState } from "react";

import { RouteComponentProps } from "react-router-dom";

export const Register: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const bodyJSON = JSON.stringify({
		email: email,
		password: password,
		name: name,
		surname: surname,
	});

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		try {
			const resp = await fetch(`http://localhost:3004/auth/register`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: bodyJSON,
			});
			if (resp.ok) history.push("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='App App-header'>
			register
			<input
				type='text'
				placeholder='name'
				onChange={(e) => {
					setName(e.target.value);
				}}></input>
			<input
				type='text'
				placeholder='surname'
				onChange={(e) => {
					setSurname(e.target.value);
				}}></input>
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
