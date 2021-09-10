import "./style.css";

import { Col, Row } from "react-bootstrap";

import { connect } from "react-redux";

const UserPreview = (props) => {
	// const [isSingleUser, setIsSingleUser] = useState(null);
	// useEffect(() => {
	// if (setIsSingleUser(true)) setIsSingleUser(true);

	// }, []);
	return (
		<section id={"userPreview"}>
			{props.selectedRoom && <Row>
				<Col md={3}>
					<div className={"d-flex justify-content-center"}>
						<img id={"userChatPic"} src={props.selectedRoom ? props.selectedRoom.roomAvatar : props.user.avatar} alt={""} />
					</div>
				</Col>
				<Col md={9}>{props.selectedRoom && <h3 id={"userNickname"}>{props.selectedRoom.description}</h3>}</Col>
			</Row>}
		</section>
	);
};

export default connect((s) => s)(UserPreview);
