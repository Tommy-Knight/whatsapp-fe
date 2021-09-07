import './style.css'
import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "../Sidebar/Component";
import UserPreview from "../UserPreview";
import Messages from "../Messages";

const Chats = null

const Home = () => {
    return (
        <>
            <Container fluid={true}>
                <Row>
                    <Col md={3}>
                        <aside>
                            <Sidebar/>
                        </aside>
                    </Col>
                    <Col md={9}>
                        <main>
                            <UserPreview/>
                            <Messages/>
                        </main>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home