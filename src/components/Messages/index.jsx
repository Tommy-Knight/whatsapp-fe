

import "./style.css";

import {useEffect, useState} from "react";

import {connect} from "react-redux";
import {io} from "socket.io-client";

import MessageEditor from "./MessageEditor";
import MessageRows from "./MessageRows";

const Messages = (props) => {
    const [chatHistory, setChatHistory] = useState([]);

    const ADDRESS = process.env.REACT_APP_BACKEND;
    const socket = io(ADDRESS, {transports: ["websocket"]});

	const liveSendMessage = ( message ) => {
			const messageObj = {
				message: message,
				sender: props.user,
			};
			socket.emit("sendMessage", messageObj, props.selectedRoom._id );
			setChatHistory((chatHistory) => [...chatHistory, messageObj]);
	}
	const newMessageEventHandler = () => {

	}

	const fetchChatHistory = async () => {
		if (props.selectedRoom._id) {
			const resp = await fetch(
				`${process.env.REACT_APP_BACKEND}/messages/${props.selectedRoom._id}`,
				{ credentials: "include" }
			);
			if (resp.ok) {
				const data = await resp.json();
				console.log("chathistory🎆", data);
				setChatHistory(data);
			}
		}
	};
	const emitUserIsConnecting = (userID) => {
		socket.on("connect", (  ) => {
			socket.emit("login", userID );
		});
	}

	const aNewUserEventHandler = () => {
		socket.on("newConnection", () => {
			//TODO implement counter ?
		});
	}
	useEffect(() => {
		fetchChatHistory();
		//FIX max: that is shit, my shit...
		 setInterval(() =>{
			 fetchChatHistory();
		 }, 500)
		emitUserIsConnecting( props.user.id )
		newMessageEventHandler()
		/*
		socket.on("message",
			(messageObj) => {
				console.log('message received')
				setChatHistory((chatHistory) => [...chatHistory, messageObj]);

			}); */
		aNewUserEventHandler();
		return () => {
			socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.selectedRoom._id]);

    return (
        <div id={'messages'} className={'d-flex flex-column align-items-end'}>
            <div style={{width: "100%", height: "100%"}}>
                <MessageRows messages={ chatHistory } user={props.user}/>
            </div>
            <MessageEditor sendMessageFunction={liveSendMessage}/>
        </div>
    )}




export default connect((s) => s)(Messages);
