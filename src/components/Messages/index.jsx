import "./style.css";

import {useEffect, useState} from "react";

import {connect} from "react-redux";
import {io} from "socket.io-client";

import "quill/dist/quill.snow.css";
import {useQuill} from "react-quilljs";

import Parser from 'html-react-parser';
import {Button, Col, Row} from "react-bootstrap";


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

const Messages = (props) => {
    // Specific Domain, message sending
    const [message, setMessage] = useState("");

    //out of domain, online users is expected in chats/rooms/groups previews
    const [onlineUsers, setOnlineUsers] = useState([]);

    //Domain of a High level component
    const [loggedIn, setLoggedIn] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    // Specific Domain, message sending

    const {quill, quillRef} = useQuill();

    const ADDRESS = process.env.REACT_APP_BACKEND;
    const socket = io(ADDRESS, {transports: ["websocket"]});
    const checkOnlineUsers = async () => {
        try {
            const response = await fetch(ADDRESS + "/online-users");
            const data = await response.json();
            setOnlineUsers(data.onlineUsers);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        console.log("myiD👓", props.user._id);
        socket.on("connect", () => {
            socket.emit("login", props.user.id);
            console.log(socket.id, "🎨 socket");
        });

        socket.on("loggedIn", () => {
            console.log("Successfully logged in!");
            setLoggedIn(true);
            checkOnlineUsers();
            socket.on("message", () => {
                console.log("a new message was received!");
            });
        });

        socket.on("newConnection", () => {
            console.log("new user logged in!");
        });
        return () => {
            socket.disconnect();
        };
    }, []);


    const messages = [{}, {}, {}];
    const setMessageFunc = (e) => {
        console.log(e.target.value);
        setMessage(e.target.value);
        sendMessage(e);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (loggedIn) {
            console.log("sending new message...");
            const newMessage = {
                text: message,
                sender: props.user,
                timestamp: Date.now(),
                id: socket.id,
            };
            socket.emit("sendmessage", newMessage);
            setChatHistory([...chatHistory, newMessage]);
            setMessage("");
        }
    };


    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {

                const htmlMessage = quill.root.innerHTML

                setMessage(htmlMessage)
            });
        }
    }, [quill]);

    return (
        <div id={'messages'} className={'d-flex flex-column align-items-end'}>
            <div style={{width: "100%", height: "100%"}}>
                {messages
                    .map((msg) => (
                        <MessageRow
                            key={Math.random()}
                            position={msg.sender === props.user ? "end" : "start"}
                        />
                    ))
                    .reverse()}
            </div>
            {/*
			<form onSubmit={(e) => setMessageFunc(e)}>
				<input placeholder='enter message'/>
				<button type='submit'>send</button>
			</form>
			*/}
            <form onSubmit={sendMessage}>
                <Row>
                    <Col md={10}>
                        <div className={'editor-wrapper '}>
                            <div ref={quillRef}/>
                        </div>
                    </Col>
                    <Col md={2} className={'d-flex flex-column align-items-center justify-content-center p-3'}>
                        <Button type='submit'>send</Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
};

export default connect((s) => s)(Messages);
