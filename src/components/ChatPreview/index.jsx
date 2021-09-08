import './style.css'

const ChatPreview = ({chat}) => {
    return (
        <div id={'chatPreview'}>
            <div className={'d-flex flex-row align-items-center'}>
                <img className={'m-2'}
                     src="https://via.placeholder.com/60"
                     alt="chatImg"/>
                <div className={'d-flex flex-column align-items-left justify-items-center'}>
                    <span> {' < Name >'} </span>
                    <span className={'partial-msg'}> {' < partial last msg >'} </span>
                </div>
            </div>

        </div>
    )
}

export default ChatPreview