import "./style.css";

import { selectedMembersAction, selectedRoomAction } from "../../redux/actions";

import { connect } from "react-redux";
import {useState} from "react";

const ChatPreview = ({
	chat,
	selectingMembers,
	selectedMembersDispatch,
	selectedRoomDispatch,
	user,
}) => {
	const [selected, setSelected] = useState(false);

	const selectFunc = () => {
		setSelected( true )
		if (selectingMembers) selectedMembersDispatch([chat]);
		else {
			const createRoom = async () => {
				const oneToOneRoom = JSON.stringify({
					members: [user._id, chat._id],
					description: `Chat with ${user.name} and ${chat.name} `,
					roomAvatar: "https://image.flaticon.com/icons/png/512/1661/1661398.png",
				});
				console.log(oneToOneRoom)
				try {
					const res = await fetch(`${process.env.REACT_APP_BACKEND}/rooms/`, {
						method: "POST",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
						},
						body: oneToOneRoom,
					});
					const data = await res.json();
					if (data) {selectedRoomDispatch(data)
					console.log(data)}
				} catch (error) {
					console.log(error)
				}
			};
			createRoom();
		}
	};

	return (
		<div className={`chatPreview mt-2 mx-1 ${selected ? 'selected' : 'notSelected'} `}>
			<div className={"d-flex flex-row align-items-center"}>
				<img
					className={"m-2"}
					onClick={() => {
						selectFunc();
					}}
					id={chat._id}
					alt='avatar'
					src={chat.avatar}
				/>
				<div className={"d-flex flex-column align-items-left justify-items-center"}>
					<span> {chat.name} </span>
					<span className={"partial-msg"}>{chat.status} </span>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	selectedMembersDispatch: (selectedMembers) => dispatch(selectedMembersAction(selectedMembers)),
	selectedRoomDispatch: (d) => dispatch(selectedRoomAction(d)),
});
export default connect((s) => s, mapDispatchToProps)(ChatPreview);
