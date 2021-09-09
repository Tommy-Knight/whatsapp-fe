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
	const selectFunc = () => {
		if (selectingMembers) selectedMembersDispatch([chat]);
		else {
			const createRoom = async () => {
				const oneToOneRoom = JSON.stringify({
					members: [user._id, chat._id],
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
					console.log(data)};
				} catch (error) {
					console.log(error);
				}
			};
			createRoom();
		}
	};

	return (
		<div id={"chatPreview"}>
			<div className={"d-flex flex-row align-items-center"}>
				<img
					className={"m-2"}
					onClick={() => {
						selectFunc();
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
