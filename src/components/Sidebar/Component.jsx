import "./style.css";

import ChatPreview from "../ChatPreview";
import { clearSelectedMembersAction } from "../../redux/actions";
import { connect } from "react-redux";
import { useState } from "react";

const Sidebar = (allUsers, clearSelectedMembersDispatch, selectedMembers, user) => {
	const [searchInput, setSearchInput] = useState("");
	const [selectingMembers, setSelectingMembers] = useState(true);
	const [filteredUsers, setFilteredUsers] = useState([]);

	const setSearchInputFunc = (e) => {
		setSearchInput(e.target.value);
		filterSearchInput();
	};

	const filterSearchInput = (e) => {
		if (allUsers) {
			const filterAllUsers = allUsers.filter((user) => {
				const searchStr = searchInput.toLowerCase();
				const nameMatches = user.name.toLowerCase().includes(searchStr);
				const surnameMatches = user.surname.toLowerCase().includes(searchStr);
				return nameMatches || surnameMatches;
			});
			// console.log("🎈", filterAllUsers);
			setFilteredUsers(filterAllUsers);
		}
	}
		const selectMembers = () => {
			setSelectingMembers(selectingMembers ? false : true);
		};

		const clearSelectingMembers = () => {
			setSelectingMembers(false);
			setSearchInput("");
			clearSelectedMembersDispatch();
		};

		const createRoom = async () => {
			setSelectingMembers(false);
			const newRoom = JSON.stringify({
				name: "",
				description: "",
				members: selectedMembers,
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
				{user && (
					<div className='ProfilePreview'>
						<img alt='avatar' src={user.avatar} style={{ width: "50px" }} />
						<span> {user.name} </span>
						<span> {user.status} </span>
						{searchInput}
					</div>
				)}

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
	clearSelectedMembersDispatch: (d) => dispatch(clearSelectedMembersAction(d)),
});

export default connect((s) => s, mapDispatchToProps)(Sidebar);
