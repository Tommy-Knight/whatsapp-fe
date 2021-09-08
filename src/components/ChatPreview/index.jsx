import "./style.css";

import { connect } from "react-redux";
import { selectedMembersAction } from "../../redux/actions";
import { useState } from "react";

const ChatPreview = ({ user, chat, selectingMembers, selectedMembersDispatch }) => {
	const [selectedMembers, setSelectedMembers] = useState([user._id]);

	// const selectMemberFunc = (e) => {
	// 	if (selectingMembers) {
	// 		let membersArray = selectedMembers;
	// 		membersArray.push(e.target.id);
	// 		console.log(membersArray);
	// 		setSelectedMembers([...selectedMembers, e.target.id]);
	// 		selectedMembersDispatch(selectedMembers);
	// 	}
	// };

	const selectMemberFunc = (id) => {
		if (selectingMembers) {
			console.log(id);
			let filteredMembers = selectedMembers.filter((member) => member._id !== id);
			filteredMembers.push(id);
			console.log(filteredMembers);
			// setSelectedMembers([...filteredMembers, id]);
			selectedMembersDispatch(filteredMembers);
		}
	};

	return (
		<>
			<div>
				<img onClick={()=>selectMemberFunc(chat._id)} id={chat._id} alt='avatar' src={chat.avatar} style={{ width: "50px" }} />
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
