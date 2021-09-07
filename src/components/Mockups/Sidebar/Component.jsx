import './style.css'
import ChatPreview from "../ChatPreview";


const ProfilePreview = () => <div> <span> {'< ProfilePreview >'} </span></div>
const SearchUser = () => <div> <span> {'< SearchUser >'} </span></div>
const CreateGroup = () =>  <div> <span> {'< CreateGroup >'} </span></div>



const Sidebar = () => {
    const chats = [ {} , {} , {} , {} , {} , {} , {} , {} , {} ,]
    return (
        <div >
            <ProfilePreview/>
            <SearchUser/>
            <CreateGroup/>
            <div>
                {
                    chats.map( chat =>
                        <ChatPreview chat={chat}/>
                    )
                }
            </div>

        </div>
    )
}

export default Sidebar