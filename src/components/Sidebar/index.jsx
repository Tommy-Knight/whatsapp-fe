import './style.css'
import ChatPreview from "../ChatPreview";
import react from "react";


class Sidebar extends react.Component {
    state = {
        isSearchView: false,
        orderedChatPreviews: []
    }
    ProfilePreview = () => {
        return (
            <div id={'loggedUserPreview'} className={'d-flex align-items-center p-2 '}>
                <img className={'m-1'}
                     src="https://via.placeholder.com/60"
                     alt="profilePic"/>
                <h3 className={'m-1'}>
                    {'Name'} {'Surname'}</h3>
            </div>
        )
    }

    SearchUser = () => {
        return (
            <form id={'searchUser'} className="form-inline d-flex flex-row">
                <input className="form-control mr-sm-2" type="search" placeholder="Find a user" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }

    CreateGroup = () => {
        return (
            <form id={'groupCreation'} className="form-inline d-flex flex-row">
            <input className="form-control mr-sm-2" type="search" placeholder="Chat Name" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Chat</button>
        </form>
        )
    }


    chats = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    render = () =>
        <div id={'leftSidebar'}
             className={'d-flex flex-column justify-content-between'}>
            <this.ProfilePreview/>
            <this.SearchUser/>
            <this.CreateGroup/>
            <div style={{
                maxHeight: '550px',
                overflowY: 'scroll',
                border: 'none', background: 'none',
                direction: 'rtl'
            }}
                 className={'d-flex flex-column justify-content-between '}>
                {
                    this.chats.map(chat =>
                        <>
                            <div style={{direction: 'ltr'}}>
                                <ChatPreview
                                    chat={chat}/>
                            </div>
                            <div className={'m-2'}/>
                        </>
                    )
                }
            </div>


        </div>
}

export default Sidebar