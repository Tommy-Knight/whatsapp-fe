import './style.css'

import ChatPreview from "../ChatPreview";
import {connect} from "react-redux"

const ProfilePreview = () => <div> <span> {'< ProfilePreview >'} </span></div>
const SearchUser = () => <div> <span> {'< SearchUser >'} </span></div>
const CreateGroup = () =>  <div> <span> {'< CreateGroup >'} </span></div>



const Sidebar = (props) => {

    
    
    // const chats = [ {} , {} , {} , {} , {} , {} , {} , {} , {} ,]
    return (
			<div>
				<ProfilePreview />
				<SearchUser />
				<CreateGroup />
				<div>
					{props.allUsers.length > 1 ? props.allUsers.map((chat) => <ChatPreview chat={chat} />) : null}
				</div>
			</div>
		);
}

export default connect(s=>s)(Sidebar);