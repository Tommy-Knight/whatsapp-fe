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

	return  (
        <div id={'chatPreview'}>
            <div className={'d-flex flex-row align-items-center'}>
                <img className={'m-2'}
                     onClick={() => {
						selectMemberFunc(chat);
					}}
					id={chat._id}
					alt='avatar'
					src={chat.avatar}
					style={{ width: "50px" }}/>
                <div className={'d-flex flex-column align-items-left justify-items-center'}>
                    <span> {chat.name} </span>
                    <span className={'partial-msg'}>{chat.status} </span>
                </div>
            </div>

        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
	selectedMembersDispatch: (selectedMembers) => dispatch(selectedMembersAction(selectedMembers)),
});
export default connect((s) => s, mapDispatchToProps)(ChatPreview);
