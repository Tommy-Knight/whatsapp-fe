import "./style.css";

import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import { connect } from "react-redux";

const UserPreview = (props) => {
	// const [isSingleUser, setIsSingleUser] = useState(null);
	// useEffect(() => {
	// if (setIsSingleUser(true)) setIsSingleUser(true);

	// }, []);
	return (
		<section id={"userPreview"}>
			<Row>
				<Col md={3}>
					<div className={"d-flex justify-content-center"}>
						<img id={"userChatPic"} src='https://via.placeholder.com/100' alt={"userChatPic"} />
					</div>
				</Col>
				<Col md={9}>{props.selectedRoom && <h1 id={"userNickname"}>{}</h1>}</Col>
			</Row>
		</section>
	);
};

export default connect((s) => s)(UserPreview);
