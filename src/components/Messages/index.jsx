import "./style.css";

import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import {refresh} from "../../redux/actions/index"

const Messages = (props) => {
	const [chatHistory, setChatHistory] = useState([]);
	const [messageText, setMessageText] = useState("");

	const ADDRESS = process.env.REACT_APP_BACKEND;
	const socket = io(ADDRESS, { transports: ["websocket"] });
  const dispatch = useDispatch();

	const messageTextFunc = (e) => {
		setMessageText(e.target.value);
	};

	const sendMessage = (e) => {
		e.preventDefault();
		const fullMessage = {
			message: messageText,
			sender: props.user,
		};
		socket.emit("sendMessage", {fullMessage} );
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
				setChatHistory(chatHistory => [...chatHistory, ...data]);
			}
		}
	};


	useEffect(() => {
		fetchChatHistory();
		socket.on("connect", () => {
			socket.emit("login", props.user.id);
		});
		socket.on("loggedin", () => {
			console.log("🎨 Successfully logged in!");
			socket.on("message", (reply) => {
				dispatch(refresh)
				const oldHistory = chatHistory
				const newMessage = reply.fullMessage;
				const newHistory = oldHistory.concat(newMessage)
				setChatHistory((chatHistory) => [...chatHistory, ...newHistory]);
				console.log(newHistory, "🎍reply", reply.fullMessage);
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

	const MessageRow = ({msg}) => {
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

			<form  onSubmit={(e) => sendMessage(e)}>
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
