import "./style.css";

import { useEffect, useState } from "react";

import { connect } from "react-redux";
import { io } from "socket.io-client";

const Messages = (props) => {
	const [chatHistory, setChatHistory] = useState([]);
	const [messageText, setMessageText] = useState("");

	const ADDRESS = process.env.REACT_APP_BACKEND;
	const socket = io(ADDRESS, { transports: ["websocket"] });

	const messageTextFunc = (e) => {
		setMessageText(e.target.value);
	};

	const sendMessage = (e) => {
		e.preventDefault();
		const fullMessage = {
			message: messageText,
			sender: props.user,
		};
		const roomId = props.selectedRoom._id;
		socket.emit("sendMessage", fullMessage, roomId);
		setChatHistory((chatHistory) => [...chatHistory, fullMessage]);
	};

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

// useEffect(() => {fetchChatHistory();},[])
	
	useEffect(() => {
		fetchChatHistory();
		socket.on("connect", () => {
			socket.emit("login", props.user.id);
		});
		socket.on("loggedin", () => {
			console.log("🎨 Successfully logged in!");
			socket.on("message", (reply) => {
				setChatHistory((chatHistory) => [...chatHistory, reply.fullMessage]);
				console.log(chatHistory, "🎍", reply.fullMessage);
			});
		});
		socket.on("newConnection", () => {
			console.log("new user logged in!");
		});
		return () => {
			socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.selectedRoom._id]);

	const MessageRow = ({ msg }) => {
		return (
			<div
				className={`d-flex justify-content-${msg.sender._id === props.user._id ? "start" : "end"}`}
				style={{ width: "100%", height: "max-content" }}>
				<p className={`message`} style={{ maxWidth: "25%", height: "max-content" }}>
					🎈 {msg.message}
				</p>
			</div>
		);
	};

	return (
		<>
			<div style={{ width: "100%", height: "70%vh" }}>
				{chatHistory && chatHistory.map((msg) => <MessageRow key={Math.random()} msg={msg} />)}
			</div>

			<form onSubmit={(e) => sendMessage(e)}>
				<input
					onChange={(e) => messageTextFunc(e)}
					name='input'
					type='form'
					placeholder='enter message'></input>
				<button type='submit'>send</button>
			</form>
		</>
	);
};

export default connect((s) => s)(Messages);
