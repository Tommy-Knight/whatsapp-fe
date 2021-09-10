import "./style.css";

import { clearSelectedMembersAction, selectedRoomAction } from "../../redux/actions";

import ChatPreview from "../ChatPreview";
import { connect } from "react-redux";
import { useState } from "react";
import {Col, Row} from "react-bootstrap";

const Sidebar = (props) => {
	const [selectingMembers, setSelectingMembers] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);

	const filterSearchInput = () => {
		if (props.allUsers) {
			const filterAllUsers = props.allUsers.filter((user) => {
				const searchStr = searchInput.toLowerCase();
				const nameMatches = user.name.toLowerCase().includes(searchStr);
				const surnameMatches = user.surname.toLowerCase().includes(searchStr);
				return nameMatches || surnameMatches;
			});
			setFilteredUsers(filterAllUsers);
		}
		// console.log("🎈", filterAllUsers);
	};

	const setSearchInputFunc = (e) => {
		setSearchInput(e.target.value);
		filterSearchInput();
	};

	const selectMembers = () => {
		setSelectingMembers(selectingMembers ? false : true);
	};

	const clearSelectingMembers = () => {
		setSelectingMembers(false);
		setSearchInput("");
		props.clearSelectedMembersDispatch();
	};

	const createRoom = async () => {
		setSelectingMembers(false);
		const newRoom = JSON.stringify({
			name: "",
			description: "",
			members: props.selectedMembers,
			roomAvatar: "",
			roomBackground: "",
		});

		try {
			const res = await fetch(`${process.env.REACT_APP_BACKEND}/rooms/`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: newRoom,
			});
			const data = await res.json();
			if (data) props.selectedRoomDispatch(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div id={"leftSidebar"} className={"d-flex flex-column justify-content-start"}>
			{props.user && (
				<div id={"loggedUserPreview"} className={"d-flex align-items-center p-2 "}>
					<img className={"m-1"} alt='avatar' src={props.user.avatar}  />
					<h3 className={"m-1"}>{props.user.Name}</h3>
				</div>
			)}
			{/* ########################################################### */}

			<div id={"groupCreation"} className='form-inline d-flex flex-row'>
				<Row>
					<Col md={12}>


				{!selectingMembers && (
					<input
						className='form-control m-1'
						type='search'
						placeholder='Chat Name'
						aria-label='Search'
					/>
				)}
					</Col>
					<Col md={12}>
				{selectingMembers && "Select friends now" && (
					<button
						className='btn btn-outline-success m-1'
						type='submit'
						onClick={() => clearSelectingMembers()}>
						No Thanks
					</button>
				)}
				{selectingMembers ? (
					<button
						className='btn btn-outline-success m-1'
						type='submit'
						onClick={() => createRoom()}>
						Publish Room
					</button>
				) : (
					<button
						className='btn btn-outline-success m-1'
						type='submit'
						onClick={() => selectMembers()}>
						New Room?
					</button>
				)}
					</Col>
				</Row>
			</div>
			{/* ########################################################### */}
			<div id={"searchUser"} className='form-inline d-flex flex-row'>
				<input
					onChange={(e) => setSearchInputFunc(e)}
					className='form-control mr-sm-2'
					type='search'
					placeholder='Find a user'
					aria-label='Search'
				/>
			</div>
			{/* ########################################################### */}
			<div
				style={{
					maxHeight: "550px",
					overflowY: "scroll",
					border: "none",
					background: "none",
					direction: "rtl",
				}}
				className={"d-flex flex-column justify-content-between "}>
				{searchInput.length > 0 &&
					filteredUsers.map((chat) => (
						<ChatPreview selectingMembers={selectingMembers} chat={chat} />
					))}
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	clearSelectedMembersDispatch: (d) => dispatch(clearSelectedMembersAction(d)),
	selectedRoomDispatch: (d) => dispatch(selectedRoomAction(d)),
});

export default connect((s) => s, mapDispatchToProps)(Sidebar);
