import "./style.css";

import { Col, Container, Row } from "react-bootstrap";
import { Props, UserInterface } from "../../types";
import { allUsersAction, myRoomsAction, userAction } from "../../redux/actions";

import { Dispatch } from "redux";
import Messages from "../Messages";
import React from "react";
import Sidebar from "../Sidebar";
import UserPreview from "../UserPreview";
import { connect } from "react-redux";
import { useEffect } from "react";

// import { RouteComponentProps } from "react-router-dom";

const Home = ({ history, userDispatch, myRoomsDispatch, allUsersDispatch, user }: Props) => {
	const myRoomsFetch = async () => {
		if (user._id) {
			const resp = await fetch(`${process.env.REACT_APP_BACKEND}/rooms/${user._id}`, {
				credentials: "include",
			});
			if (resp.ok) {
				const data = await resp.json();
				myRoomsDispatch(data);
				// console.log("🎈", data);
			}
		}
	};
	const loginFetch = async () => {
		const resp = await fetch(`${process.env.REACT_APP_BACKEND}/users/me`, {
			credentials: "include",
		});
		if (resp.ok) {
			const data = await resp.json();
			userDispatch(data);
		} else {
			history.push("/login");
		}
	};
	const allUsersFetch = async () => {
		const resp = await fetch(`${process.env.REACT_APP_BACKEND}/users/`, {
			credentials: "include",
		});
		if (resp.ok) {
			const data = await resp.json();
			allUsersDispatch(data.users);
		}
	};

	useEffect(() => {
		loginFetch();
		allUsersFetch();
		myRoomsFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user._id]);

	return (
		<Container id={"home"}>
			<Row>
				<Col sm={4}>
					<aside>
						<Sidebar />
					</aside>
				</Col>
				<Col sm={8}>
					<main>
						<UserPreview />
						<Messages />
					</main>
				</Col>
			</Row>
		</Container>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	userDispatch: (user: UserInterface) => dispatch(userAction(user)),
	allUsersDispatch: (allUsers: UserInterface[]) => dispatch(allUsersAction(allUsers)),
	myRoomsDispatch: (myRooms: any) => dispatch(myRoomsAction(myRooms)),
});
export default connect((s) => s, mapDispatchToProps)(Home);
