import "./style.css";

import {useEffect, useState} from "react";

import {connect} from "react-redux";
import {io} from "socket.io-client";

import MessageEditor from "./MessageEditor";
import MessageRows from "./MessageRows";




const Messages = (props) => {
    const messages = [{}, {}, {}];
    const [loggedIn, setLoggedIn] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    const ADDRESS = process.env.REACT_APP_BACKEND;
    const socket = io(ADDRESS, {transports: ["websocket"]});

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
	const newMessageEventHandler = () => {
		socket.on("message", (reply) => {
			setChatHistory((chatHistory) => [...chatHistory, reply.fullMessage]);
			console.log(chatHistory, "🎍", reply.fullMessage);
		});
	}
	const loggedInEventHandler = () => {
		socket.on("loggedin", () => {
			newMessageEventHandler()
		});
	}
	const aNewUserEventHandler = () => {
		socket.on("newConnection", () => {
			//TODO implement counter ?
		});
	}
	useEffect(() => {
		fetchChatHistory();
		emitUserIsConnecting( props.user.id )
		loggedInEventHandler();
		aNewUserEventHandler();
		return () => {
			socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.selectedRoom._id]);

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
