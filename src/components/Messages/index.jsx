import "./style.css";

import { useEffect, useState } from "react";

import { connect } from "react-redux";
import { io } from "socket.io-client";

const MessageRow = ({ position }) => {
	position = position === "start" || position === "end" ? position : "";

	return (
		<div
			className={`d-flex justify-content-${position}`}
			style={{ width: "100%", height: "max-content" }}>
			<p className={`message ${position}`} style={{ maxWidth: "25%", height: "max-content" }}>
				{"< message text >"}
			</p>
		</div>
	);
};

const Messages = (props) => {
	const [message, setMessage] = useState("");
	const [loggedin, setLoggedIn] = useState(false);

	const [chatHistory, setChatHistory] = useState([]);

	const [onlineUsers, setOnlineUsers] = useState([]);

	const ADDRESS = process.env.REACT_APP_BACKEND;
	const socket = io(ADDRESS, { transports: ["websocket"] });
	const messages = [{}];
	const setMessageFunc = (e) => {
		console.log(e.target.value);
		setMessage(e.target.value);
		sendMessage(e);
	};

	const sendMessage = (e) => {
		e.preventDefault();
		if (loggedin) {
			console.log("sending new message...");
			const newMessage = {
				text: e.target.value,
				sender: props.user,
				timestamp: Date.now(),
				id: socket.id,
			};
			socket.emit("sendmessage", newMessage);
			setChatHistory([...chatHistory, newMessage]);
			setMessage("");
		}
	};

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

		socket.on("loggedin", () => {
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

	return (
		<>
			<div style={{ width: "100%", height: "100%" }}>
				{messages
					.map((msg) => (
						<MessageRow
							key={Math.random()}
							position={msg.sender === props.user ? "end" : "start"}
						/>
					))
					.reverse()}
			</div>

			<form onSubmit={(e) => setMessageFunc(e)}>
				<input placeholder='enter message'></input>
				<button type='submit'>send</button>
			</form>
		</>
	);
};

export default connect((s) => s)(Messages);
