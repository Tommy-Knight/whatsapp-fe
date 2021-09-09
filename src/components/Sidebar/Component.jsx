import "./style.css";

import { useEffect, useState } from "react";

import ChatPreview from "../ChatPreview";
import { connect } from "react-redux";

const Sidebar = (props, { clearSelectedMembersDispatch }) => {
	const [searchInput, setSearchInput] = useState("");
	const [selectingMembers, setSelectingMembers] = useState(true);
	const [filteredUsers, setFilteredUsers] = useState([]);

	const setSearchInputFunc = (e) => {
		setSearchInput(e.target.value);
		filterSearchInput();
	};

	const filterSearchInput = (e) => {
		const filterAllUsers = props.allUsers.filter((user) => {
			const searchStr = searchInput.toLowerCase();
			const nameMatches = user.name.toLowerCase().includes(searchStr);
			const surnameMatches = user.surname.toLowerCase().includes(searchStr);
			return nameMatches || surnameMatches;
			
		});
		setFilteredUsers(filterAllUsers);
		console.log("🎈", filterAllUsers);
	};

	const selectMembers = () => {
		setSelectingMembers(selectingMembers ? false : true);
	};

	const clearSelectingMembers = () => {
		setSelectingMembers(false);
		setSearchInput("");
		clearSelectedMembersDispatch("");
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
		console.log(newRoom);
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND}/rooms/`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: newRoom,
			});
			console.log("🚑", response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className='ProfilePreview'>
				<img alt='avatar' src={props.user.avatar} style={{ width: "50px" }} />
				<span> {props.user.name} </span>
				<span> {props.user.status} </span>
				{searchInput}
			</div>

			<div className='SearchUser '>
				<span>
					<input onChange={(e) => setSearchInputFunc(e)} placeholder='search for people' />
				</span>
			</div>
			<div className='CreateRoom '>
				<span>
					{selectingMembers && "Select friends now" && (
						<button onClick={() => clearSelectingMembers()}>No Thanks</button>
					)}
					{selectingMembers ? (
						<button onClick={() => createRoom()}>Publish Room</button>
					) : (
						<button onClick={() => selectMembers()}>New Room?</button>
					)}
				</span>
			</div>

			<div>
				{searchInput.length > 1 &&
					filteredUsers.map((chat) => (
						<ChatPreview selectingMembers={selectingMembers} chat={chat} />
					))}
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
clearSelectedMembersDispatch: () =>
		dispatch((payload) => {
			return {
				type: "CLEAR_SELECTED_MEMBERS",
				payload,
			};
		}),});

export default connect((s) => s, mapDispatchToProps)(Sidebar);
