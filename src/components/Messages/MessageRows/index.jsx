import './style.css'

import Parser from "html-react-parser";

const MessageRow = ({position, content = ''}) => {
    position = position === "start" || position === "end" ? position : "";
    return (
        <div
            className={`d-flex justify-content-${position}`}
            style={{width: "100%", height: "max-content"}}>
            <p className={`message ${position}`} style={{maxWidth: "75%", height: "max-content"}}>
                {Parser(content)}
            </p>
        </div>
    );
};

const MessageRows = ({messages = []}) => {
    return (
        <>
            {messages.map((msg) => (
                <MessageRow
                    key={Math.random()}
                    position={msg.sender === props.user ? "end" : "start"}
                />
            ))
                .reverse()}
        </>
    )
}

export default MessageRows