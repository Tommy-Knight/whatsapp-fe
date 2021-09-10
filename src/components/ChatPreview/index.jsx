import "./style.css";

import { selectedMembersAction, selectedRoomAction } from "../../redux/actions";

import { connect } from "react-redux";

const ChatPreview = ({
	chat,
	selectingMembers,
	selectedMembersDispatch,
	selectedRoomDispatch,
	user,
}) => {
	const selectFunc = (selectedUser) => {
		if (selectingMembers) selectedMembersDispatch([chat]);
		else {
			const createRoom = async () => {
				const newRoom = JSON.stringify({
					name: `${user.name} and ${chat.name}`,
					description: "",
					members: [user._id, chat._id],
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
					if (data) selectedRoomDispatch(data);
				} catch (error) {
					console.log(error);
				}
			};
			createRoom();
		}
	};

	return (
		<div className={"chatPreview mt-2 mx-1"}>
			<div className={"d-flex flex-row align-items-center"}>
				<img
					className={"m-2"}
					onClick={() => {
						selectFunc(chat);
					}}
					id={chat._id}
					alt='avatar'
					src={chat.avatar}
					style={{ width: "50px" }}
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
