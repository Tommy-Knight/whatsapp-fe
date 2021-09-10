import "./style.css";

import {useEffect, useState} from "react";

import {connect} from "react-redux";
import {io} from "socket.io-client";


import {useQuill} from "react-quilljs";

import Parser from 'html-react-parser';
import {Button, Col, Row} from "react-bootstrap";
import messageEditor from "./MessageEditor";
import MessageEditor from "./MessageEditor";
import MessageRows from "./MessageRows";




const Messages = (props) => {
    const messages = [{}, {}, {}];
    const [loggedIn, setLoggedIn] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    const ADDRESS = process.env.REACT_APP_BACKEND;
    const socket = io(ADDRESS, {transports: ["websocket"]});

    const emitUserIsConnecting = (userID) => {
        socket.on("connect", (  ) => {
            socket.emit("login", userID );
        });
    }

    //More refactor here
    useEffect(() => {
        emitUserIsConnecting( props.user.id )

        socket.on("loggedIn", () => {
            setLoggedIn(true);
            checkOnlineUsers();
            socket.on("message", () => {

            });
        });
        socket.on("newConnection", () =>{

        });
        return () => {
            socket.disconnect();
        };
    }, []);



    const liveSendMessage = ( message ) => {
        if (loggedIn) {
            const newMessage = {
                text: message,
                sender: props.user,
                timestamp: Date.now(),
                id: socket.id,
            };
            socket.emit("sendmessage", newMessage);
            setChatHistory([...chatHistory, newMessage]);

        }
    }
    return (
        <div id={'messages'} className={'d-flex flex-column align-items-end'}>
            <div style={{width: "100%", height: "100%"}}>
                <MessageRows messages={ messages }/>
            </div>
            <MessageEditor sendMessageFunction={liveSendMessage}/>
        </div>
    );
};



export default connect((s) => s)(Messages);
