import "./style.css";

import { connect } from "react-redux";
import { selectedMembersAction } from "../../redux/actions";

const ChatPreview = ({
	chat,
	selectingMembers,
	selectedMembersDispatch
}) => {
	
	const selectMemberFunc = (selectedUser) => {
		if (selectingMembers) selectedMembersDispatch([chat]);
	};

	return (
		<>
			<div>
				<img
					onClick={() => {
						selectMemberFunc(chat);
					}}
					id={chat._id}
					alt='avatar'
					src={chat.avatar}
					style={{ width: "50px" }}
				/>
				<span> {chat.name} </span>
				<span> {chat.status} </span>
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	selectedMembersDispatch: (selectedMembers) => dispatch(selectedMembersAction(selectedMembers)),
});
export default connect((s) => s, mapDispatchToProps)(ChatPreview);
