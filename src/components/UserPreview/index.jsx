import "./style.css";

import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import { connect } from "react-redux";

const UserPreview = (props) => {
	const [isSingleUser, setIsSingleUser] = useState(null);
	useEffect(() => {
		setIsSingleUser(true);
	}, []);

	return (
		<section id={"userPreview"}>
			<Row>
				<Col md={3}>
					<div className={"d-flex justify-content-center"}>
						{isSingleUser ? (
							<img id={"userChatPic"} src={props.user.avatar} style= {{width:"50px"}} alt={"userChatPic"} />
						) : (
							<img id={"groupChatPic"} src={"/"} alt={"groupChatPic"} />
						)}
					</div>
				</Col>
				<Col md={9}>
					{isSingleUser ? <h1 id={"userNickname"}> {props.user.name}</h1> : <h1 id={"groupName"}>GROUP</h1>}
				</Col>
			</Row>
		</section>
	);
};

export default connect((s) => s)(UserPreview);
