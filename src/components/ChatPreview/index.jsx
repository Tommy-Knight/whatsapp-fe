import './style.css'

const ChatPreview = ({chat}) => {
    return (
        <div >
            <span> {'< icon >'} </span>
            <span> {' < Name >'} </span>
            <span> {' < partial last msg >'} </span>
        </div>
    )
}

export default ChatPreview