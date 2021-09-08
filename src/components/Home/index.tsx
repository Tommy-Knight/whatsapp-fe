import './style.css'

import React, { useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "../Sidebar";
import UserPreview from "../UserPreview";
import Messages from "../Messages";

export const Home: React.FunctionComponent<RouteComponentProps> = ({
	history
}) => {

	const loginFetch = async () => {
		const resp = await fetch(`http://localhost:3004/users/me`, {
			credentials: "include",
		});
		resp.ok ? console.log("success! ✨") : history.push("/login");
	};

	useEffect(() => {
		loginFetch().then();
	});

	return (
		<Container id={'home'}>
			<Row>
				<Col sm={4}>
					<aside>
						<Sidebar/>
					</aside>
				</Col>
				<Col sm={8}>
					<main>
						<UserPreview/>
						<Messages/>
					</main>
				</Col>
			</Row>
		</Container>
	);
};
