import './style.css'
import ChatPreview from "../ChatPreview";


const ProfilePreview = () =>
    <div id={'loggedUserPreview'} className={'d-flex align-items-center p-2 '}>
        <img className={'m-1'}
             src="https://via.placeholder.com/60"
            alt="profilePic"/>
        <h3 className={'m-1'} >
            {'Name'} {'Surname'}</h3>
    </div>
const SearchUser = () => <div>

</div>

const CreateGroup = () => <div><span> {'< CreateGroup >'} </span></div>

const Sidebar = () => {
    const chats = [{}, {}, {}, {}, {}, {}, ]
    return (
        <div id={'leftSidebar'}
             className={'d-flex flex-column justify-content-between'}>
            <ProfilePreview/>
            <SearchUser/>
            <CreateGroup/>

            {
                chats.map(chat =>
                    <ChatPreview chat={chat}/>
                )
            }


        </div>
    )
}

export default Sidebar