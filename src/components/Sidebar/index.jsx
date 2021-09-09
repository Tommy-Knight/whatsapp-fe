import './style.css'
import ChatPreview from "../ChatPreview";


const ProfilePreview = () =>
    <div id={'loggedUserPreview'} className={'d-flex align-items-center p-2 '}>
        <img className={'m-1'}
             src="https://via.placeholder.com/60"
             alt="profilePic"/>
        <h3 className={'m-1'}>
            {'Name'} {'Surname'}</h3>
    </div>


const SearchUser = () => {

    return (
        <form id={'searchUser'} className="form-inline d-flex flex-row">
            <input className="form-control mr-sm-2" type="search" placeholder="Find a user" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
}


const CreateGroup = () =>
    <form id={'groupCreation'} className="form-inline d-flex flex-row">
        <input className="form-control mr-sm-2" type="search" placeholder="Chat Name" aria-label="Search"/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Chat</button>
    </form>

const Sidebar = () =>
{
    const chats = [{}, {}, {}, {}, {}, {},]
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