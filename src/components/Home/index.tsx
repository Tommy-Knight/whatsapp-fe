import { Col, Container, Row } from "react-bootstrap";
import { Props, UserInterface } from "../../types";
import { allUsersAction, userAction } from "../../redux/actions";

import { Dispatch } from "redux";
import Messages from "../Messages";
import React from "react";
import Sidebar from "../Sidebar/Component";
import UserPreview from "../UserPreview";
import { connect } from "react-redux";
import { useEffect } from "react";

// import { RouteComponentProps } from "react-router-dom";

const Home = ({history, userDispatch, allUsersDispatch}:Props) => {
	useEffect(() => {
		const loginFetch = async () => {
			const resp = await fetch(`http://localhost:3004/users/me`, {
				credentials: "include",
			});
			const data = await resp.json();
			if (resp.ok) {
				userDispatch(data);
			} else {
				history.push("/login");
			}
		};
		const allUsersFetch = async () => {
			const resp = await fetch(`http://localhost:3004/users/`, {
				credentials: "include",
			});
			const data = await resp.json();
			if (resp.ok) {
				allUsersDispatch(data.users);
			}
		};
		loginFetch().then();
		allUsersFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container fluid={true}>
			<Row>
				<Col md={3}>
					<aside>
						<Sidebar/>
					</aside>
				</Col>
				<Col md={9}>
					<main>
						<UserPreview/>
						<Messages/>
					</main>
				</Col>
			</Row>
		</Container>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	userDispatch: (user: UserInterface) => dispatch(userAction(user)),
	allUsersDispatch: (allUsers: UserInterface[]) => dispatch(allUsersAction(allUsers))
});
export default connect(null, mapDispatchToProps)(Home);
