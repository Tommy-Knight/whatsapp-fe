import './style.css'

const ChatPreview = ({chat}) => {
    return (
        <div >
            <img alt="avatar" src={chat.avatar} style={{width:"50px"}}/>
            <span> {chat.name} </span>
            <span> {chat.status} </span>
        </div>
    )
}

export default ChatPreview