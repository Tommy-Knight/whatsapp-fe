import "./style.css";

import ChatPreview from "../ChatPreview";
import { connect } from "react-redux";
import { useState } from "react";

const Sidebar = (props) => {
	const [searchInput, setSearchInput] = useState("");
	const [selectingMembers, setSelectingMembers] = useState(true);
	const [filteredUsers, setFilteredUsers] = useState([]);

	const createRoom = async () => {
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

	const selectMembers = () => {
		setSelectingMembers(selectingMembers ? false : true);
	};

	const setSearchInputFunc = (e) => {
		setSearchInput(e.target.value);
		filterSearchInput();
	};

	const filterSearchInput = (e) => {
		console.log(props.allUsers);
		const filterAllUsers = props.allUsers.filter((user) => {
			const searchStr = searchInput.toLowerCase();
			const nameMatches = user.name.toLowerCase().includes(searchStr);
			const surnameMatches = user.surname.toString().includes(searchStr);
			console.log("🚗", nameMatches);
			return nameMatches || surnameMatches;
		});
		console.log(filterAllUsers);
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
					{selectingMembers ? (
						<button onClick={() => selectMembers()}>"New Room"</button>
					) : (( <button onClick={() => createRoom()}>publish room</button>)("Choose a friend to create a room with")) 

					}
				</span>
			</div>

			<div>
				{filteredUsers.length > 1 &&
					filteredUsers.map((chat) => (
						<ChatPreview selectingMembers={selectingMembers} chat={chat} />
					))}
			</div>
		</div>
	);
};

export default connect((s) => s)(Sidebar);
