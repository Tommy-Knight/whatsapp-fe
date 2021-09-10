import './style.css'

import Parser from "html-react-parser";

const MessageRow = ({position, content} = {}) => {
    return (
        <div
            className={`d-flex justify-content-${position}`}
            style={{width: "100%", height: "max-content"}}>
            <p className={`message ${position}`} style={{maxWidth: "75%", height: "max-content"}}>
                {content && Parser(content)}
            </p>
        </div>
    );
};

const MessageRows = ({messages, user}) => {
    console.log()
    return (
        <div id={'msgContainer'}
             style={{
                 display: 'flex',
                 flexDirection: 'column-reverse',
                 minHeight: "400px",
                 maxHeight: "400px",
                 overflowY: "scroll",
                 direction: "rtl",
                 background: "none",
                 border: "none"
             }}
        >

            {
                (()=>{
                    console.log( 'messages: ', messages )
                    return ''
                })()
            }
            {messages.map((msg) => (
                <MessageRow
                    key={Math.random()}
                    position={msg.sender._id === user._id ? "start" :  "end"}
                    content={msg.message}
                />
            )).reverse()
            }
        </div>
    )
}

export default MessageRows