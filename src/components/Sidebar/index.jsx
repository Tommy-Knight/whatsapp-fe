import "./style.css";

import ChatPreview from "../ChatPreview";
import { clearSelectedMembersAction } from "../../redux/actions";
import { connect } from "react-redux";
import { useState } from "react";

const ProfilePreview = (user) => (
	<>
		{user && (
			<div id={"loggedUserPreview"} className={"d-flex align-items-center p-2 "}>
				<img className={"m-1"} alt='avatar' src={user.avatar} style={{ width: "50px" }} />
				<h3 className={"m-1"}>{user.Name}</h3>
			</div>
		)}
	</>
);

const Sidebar = (props) => {
	const [selectingMembers, setSelectingMembers] = useState(true);
	const [searchInput, setSearchInput] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);

	const filterSearchInput = (e) => {
		const filterAllUsers = props.allUsers.filter((user) => {
			const searchStr = searchInput.toLowerCase();
			const nameMatches = user.name.toLowerCase().includes(searchStr);
			const surnameMatches = user.surname.toLowerCase().includes(searchStr);
			return nameMatches || surnameMatches;
		});
		// console.log("🎈", filterAllUsers);
		setFilteredUsers(filterAllUsers);
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
		<div id={"leftSidebar"} className={"d-flex flex-column justify-content-between"}>
			<ProfilePreview user={props.user} />

			<form id={"groupCreation"} className='form-inline d-flex flex-row'>
				{!selectingMembers && (
					<input
						className='form-control mr-sm-2'
						type='search'
						placeholder='Chat Name'
						aria-label='Search'
					/>
				)}
				{selectingMembers && "Select friends now" && (
					<button
						className='btn btn-outline-success my-2 my-sm-0'
						type='submit'
						onClick={() => clearSelectingMembers()}>
						No Thanks
					</button>
				)}
				{selectingMembers ? (
					<button
						className='btn btn-outline-success my-2 my-sm-0'
						type='submit'
						onClick={() => createRoom()}>
						Publish Room
					</button>
				) : (
					<button
						className='btn btn-outline-success my-2 my-sm-0'
						type='submit'
						onClick={() => selectMembers()}>
						New Room?
					</button>
				)}
			</form>
			{/* ########################################################### */}
			<form id={"searchUser"} className='form-inline d-flex flex-row'>
				<input
					onChange={(e) => setSearchInputFunc(e)}
					className='form-control mr-sm-2'
					type='search'
					placeholder='Find a user'
					aria-label='Search'
				/>
				<button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
					Search
				</button>
			</form>
			{/* ########################################################### */}
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
